import { Pagination } from "react-bootstrap";
import {
  getSortedPostsAsyncThunk,
  selectorSortedTotalPosts,
} from "../../redux/createAsyncThunk/getSortedPosts";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  // useDispatchGetSortedPost,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectorSearchSubmitForm } from "../../redux/slices/formSearchSubmitSlice";
import {
  selectorCurrentPage,
  setCurrentPageAction,
} from "../../redux/slices/paginationMarketplaceCurrentPageSlice";
import { selectorPostPerPage } from "../../redux/slices/postPerPageSlice";
// import catalogArray from "./catalogArray";

const PaginationMarketplace = () => {
  const dispatchAsyncThunk = useDispatchAsyncThunk();
  // const dispatchGetSortedPost = useDispatchGetSortedPost();
  const searchSubmitForm = useSelectorTyped(selectorSearchSubmitForm);
  // console.log("searchSubmitForm PaginationMarketplace:", searchSubmitForm);

  // const [currentPage, setCurrentPage] = useState<number>(
  //   parseInt(sessionStorage.getItem("currentPage") || "1")
  // ); // Not using anymore

  // Issues & Bug fixes
  // currentPage MUST be moved inside Redux State
  // so that 'CREATE A BUTTON' action will update
  // the set back up to 1 -> the 1st page.
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const currentPage = useSelectorTyped(selectorCurrentPage);
  const dispatchTyped = useDispatchTyped();

  // const postPerPage = 5;
  // const postPerPage = 1; // Just to make it easier for showcase
  const postPerPage = useSelectorTyped(selectorPostPerPage);

  // // Updates
  // let totalPostsLengthSession = parseInt(
  //   sessionStorage.getItem("total_posts") || "0"
  // );
  // // // console.log("totalPostsLength SESSION::", totalPostsLengthSession);

  const total_postsString: string | number = useSelectorTyped<string | number>(
    selectorSortedTotalPosts
  ) as string; // if it's `as string | number` then parseInt TSC errors.
  const total_postsToNumber = parseInt(total_postsString, 10);
  // console.log(
  //   "total_postsToNumber ModalPost:",
  //   total_postsToNumber,
  //   "& typeof total_postsToNumber:",
  //   typeof total_postsToNumber
  // );

  // const totalPages = Math.ceil(totalPostsLengthSession / postPerPage);
  const totalPages = Math.ceil(total_postsToNumber / postPerPage);
  // const totalPages = 1; //tests
  // console.log("totalPages PaginationMarketplace:", totalPages);

  // const [totalPostsLengthSTATE, setTotalPostsLengthSTATE] = useState<number>(0);
  // // console.log("totalPostsLengthSTATE:", totalPostsLengthSTATE);

  // // //
  // // useEffect(() => {
  // //   setTotalPostsLengthSTATE(totalPostsLengthSession);
  // // }, [totalPostsLengthSession]);
  // // //

  // const totalPages = 20; // fake for Tests
  const disableFirstButton = currentPage === 1;
  const disablePreviousButton = currentPage === 1;
  // const disableNextButton = currentPage === totalPages;
  // const disableLastButton = currentPage === totalPages;
  // UPDATE: for when refreshing: initial total_posts is 0
  // but my Next & Last buttons aren't disabled: meaning I
  // need to disable them when initial state total_posts=0
  const disableNextButton =
    currentPage === totalPages || total_postsToNumber === 0;
  const disableLastButton =
    currentPage === totalPages || total_postsToNumber === 0;

  const handleNextPage = () => {
    // // Can be both ASYNC or Sync function
    // const handleNextPage = async () => {
    // setCurrentPage((prevPage) => prevPage + 1);
    dispatchTyped(setCurrentPageAction({ currentPage: currentPage + 1 }));
    window.scrollTo(0, 0); // Scroll to top
    // dispatchGetSortedPost(
    //   getSortedPostsAsyncThunk({
    //     limit: postPerPage,
    //     offset: currentPage * postPerPage,
    //     carNameTitle: "",
    //   })
    // );
    // ^^ NOTE USING ABOVE because `dispatchGetSortedPost`:
    // Still errors so I have to use my previous typed Hook

    dispatchAsyncThunk(
      getSortedPostsAsyncThunk({
        limit: postPerPage,
        offset: currentPage * postPerPage,
        // carNameTitle: "",
        carNameTitle: searchSubmitForm.carNameTitle,
      })
    );
  };
  const handlePreviousPage = () => {
    // const handlePreviousPage = async () => {
    // setCurrentPage((prevPage) => prevPage - 1);
    dispatchTyped(setCurrentPageAction({ currentPage: currentPage - 1 }));
    window.scrollTo(0, 0); // Scroll to top
    dispatchAsyncThunk(
      getSortedPostsAsyncThunk({
        limit: postPerPage,
        offset: (currentPage - 2) * postPerPage,
        // carNameTitle: "",
        carNameTitle: searchSubmitForm.carNameTitle,
      })
    );
  };

  const pageItems = [];
  // UPDATE 5: Fixing Ellipsis UX:
  if (totalPages <= 1) {
    // Show single page without pagination
    pageItems.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => {
          // setCurrentPage(1);
          dispatchTyped(setCurrentPageAction({ currentPage: 1 }));
          window.scrollTo(0, 0); // Scroll to top
        }}
      >
        1
      </Pagination.Item>
    );
  } else {
    const firstPage = Math.max(currentPage - 1, 1);
    const lastPage = Math.min(currentPage + 1, totalPages);

    if (firstPage > 1) {
      // This component is .pushed to show `1` button
      // once the User is at Page '3' or higher, that
      // logic to only show 3 numbers in total is at the
      // 'firstPage' and 'lastPage'
      // -> How this works is: 1,2,3 OR 2,3,4 OR 9,10,11
      pageItems.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => {
            // setCurrentPage(1);
            dispatchTyped(setCurrentPageAction({ currentPage: 1 }));
            // Add more dispatch function call here
            dispatchAsyncThunk(
              getSortedPostsAsyncThunk({
                limit: postPerPage,
                offset: 0,
                carNameTitle: searchSubmitForm.carNameTitle,
              })
            );
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          1
        </Pagination.Item>
      );

      // Ellipsis always have `disabled=true` because they're only for UI/UX.
      pageItems.push(
        <Pagination.Ellipsis
          key="ellipsis-start"
          disabled={true}
          onClick={() => {
            // setCurrentPage(firstPage - 1);
            dispatchTyped(setCurrentPageAction({ currentPage: firstPage - 1 }));
            // Add more dispatch function call here
            dispatchAsyncThunk(
              getSortedPostsAsyncThunk({
                limit: postPerPage,
                offset: (firstPage - 2) * postPerPage,
                carNameTitle: searchSubmitForm.carNameTitle,
              })
            );
            window.scrollTo(0, 0); // Scroll to top
          }}
        />
      );
    }

    for (let index = firstPage; index <= lastPage; index++) {
      // A loop starting from `firstPage` until `lastPage`
      // at each iteration add `Pagination.Item` Component
      pageItems.push(
        <Pagination.Item
          key={index}
          active={index === currentPage}
          onClick={() => {
            // setCurrentPage(index);
            dispatchTyped(setCurrentPageAction({ currentPage: index }));
            // Add more dispatch function call here
            dispatchAsyncThunk(
              getSortedPostsAsyncThunk({
                limit: postPerPage,
                offset: (index - 1) * postPerPage,
                carNameTitle: searchSubmitForm.carNameTitle,
              })
            );
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          {index}
        </Pagination.Item>
      );
    }

    if (lastPage < totalPages) {
      // Ellipsis always have `disabled=true` because they're only for UI/UX.
      pageItems.push(
        <Pagination.Ellipsis
          key="ellipsis-end"
          disabled={true}
          onClick={() => {
            // setCurrentPage(lastPage + 1);
            dispatchTyped(setCurrentPageAction({ currentPage: lastPage + 1 }));
            // Add more dispatch function call here
            dispatchAsyncThunk(
              getSortedPostsAsyncThunk({
                limit: postPerPage,
                offset: lastPage * postPerPage,
                carNameTitle: searchSubmitForm.carNameTitle,
              })
            );
            window.scrollTo(0, 0); // Scroll to top
          }}
        />
      );

      // Push a component that represents the last # of Page available
      pageItems.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => {
            // setCurrentPage(totalPages);
            dispatchTyped(setCurrentPageAction({ currentPage: totalPages }));
            // Add more dispatch function call here
            dispatchAsyncThunk(
              getSortedPostsAsyncThunk({
                limit: postPerPage,
                offset: (totalPages - 1) * postPerPage,
                carNameTitle: searchSubmitForm.carNameTitle,
              })
            );
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
  }
  // UPDATE 5 ENDS^: Fixing Ellipsis UX^

  const handleFirstPage = () => {
    // const handleFirstPage = async () => {
    // setCurrentPage(1);
    dispatchTyped(setCurrentPageAction({ currentPage: 1 }));
    window.scrollTo(0, 0); // Scroll to top
    dispatchAsyncThunk(
      // getSortedPostsAsyncThunk({ limit: postPerPage, offset: 0, carNameTitle: "" })
      getSortedPostsAsyncThunk({
        limit: postPerPage,
        offset: 0,
        carNameTitle: searchSubmitForm.carNameTitle,
      })
    );
  };
  const handleLastPage = () => {
    // const handleLastPage = async () => {
    // setCurrentPage(totalPages);
    dispatchTyped(setCurrentPageAction({ currentPage: totalPages }));
    window.scrollTo(0, 0); // Scroll to top
    dispatchAsyncThunk(
      getSortedPostsAsyncThunk({
        limit: postPerPage,
        offset: (totalPages - 1) * postPerPage,
        // carNameTitle: "",
        carNameTitle: searchSubmitForm.carNameTitle,
      })
    );
  };

  const isMobile = window.innerWidth <= 767;
  // console.log("window.innerWidth:", window.innerWidth);
  // NOTE:
  // this won't update when manually shrinking the website
  // but I'm fine with it since Mobile Screen can't widen.
  // -> The only thing I have to test is on my real iPhone
  // if I flip the screen and refresh: would the size be
  // 'lg' or default(undefined)? -> actually that's NOT an
  // issue -> the flipped screen has enough space for 'lg'.

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          // size="lg"
          // size="sm"
          // // default or omitting `size` props looks like
          // // 'Medium' visual-wise BUT `undefined` code-wise
          // size={isMobile ? "" : "lg"}
          // // ^ TypeScript issues, suggests:
          // // "PaginationProps.size?: "lg" | "sm" | undefined"
          size={isMobile ? undefined : "lg"}
        >
          <Pagination.First
            onClick={handleFirstPage}
            disabled={disableFirstButton}
          />
          <Pagination.Prev
            onClick={handlePreviousPage}
            disabled={disablePreviousButton}
          />
          {pageItems}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={disableNextButton}
          />
          <Pagination.Last
            onClick={handleLastPage}
            disabled={disableLastButton}
          />
        </Pagination>
      </div>
    </>
  );
};

export default PaginationMarketplace;
