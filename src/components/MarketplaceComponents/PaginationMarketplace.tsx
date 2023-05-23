// NOTE they must be hardcoded because
// they are "Catalog" posted by the website owners

import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import {
  getSortedPostsAsyncThunk,
  selectorSortedTotalPosts,
} from "../../redux/createAsyncThunk/getSortedPosts";
import {
  useDispatchAsyncThunk,
  // useDispatchGetSortedPost,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectorSearchSubmitForm } from "../../redux/slices/formSearchSubmitSlice";
import { selectorPostPerPage } from "../../redux/slices/postPerPageSlice";
// import catalogArray from "./catalogArray";

const PaginationMarketplace = () => {
  const dispatchAsyncThunk = useDispatchAsyncThunk();
  // const dispatchGetSortedPost = useDispatchGetSortedPost();
  const searchSubmitForm = useSelectorTyped(selectorSearchSubmitForm);
  console.log("searchSubmitForm PaginationMarketplace:", searchSubmitForm);

  // const [posts, setPosts] = useState([])
  // const [currentPage, setCurrentPage] = useState<number>(
  //   parseInt(sessionStorage.getItem("currentPage") || "1")
  // ); // React error BAD SetState
  // -> To Track trace of bad setState: GitHub bugs fixes:
  // https://reactjs.org/link/setstate-in-render
  //  .. I found it already it's my only useState xD
  // UPDATE2: NOPE, I'm tracing the error in DevTools
  // and it seems to be coming from my useDispatchAsyncThunk!
  // that's called in here at the TOP. iDK WHY?

  // Issues & Bug fixes
  // currentPage MUST be moved inside Redux State
  // so that 'CREATE A BUTTON' action will update
  // the set back up to 1 -> the 1st page.
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const postPerPage = 2;
  // const postPerPage = 1; // Just to make it easier for showcase
  // const postPerPage = 5;
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
  console.log(
    "total_postsToNumber ModalPost:",
    total_postsToNumber,
    "& typeof total_postsToNumber:",
    typeof total_postsToNumber
  );

  // const totalPages = Math.ceil(totalPostsLengthSession / postPerPage);
  const totalPages = Math.ceil(total_postsToNumber / postPerPage);
  console.log("totalPages PaginationMarketplace:", totalPages);

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
  const disableNextButton = currentPage === totalPages;
  const disableLastButton = currentPage === totalPages;
  // const handleNextPage = () => {
  const handleNextPage = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
  // const handlePreviousPage = () => {
  const handlePreviousPage = async () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
  // if (totalPages <= 3) {
  //   // Show all page numbers
  //   for (let index = 1; index <= totalPages; index++) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={index}
  //         active={index === currentPage}
  //         onClick={() => {
  //           setCurrentPage(index);
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         {index}
  //       </Pagination.Item>
  //     );
  //   }
  // } else {
  //   // Show limited page numbers with ellipsis
  //   const firstPage = Math.max(currentPage - 1, 1);
  //   const lastPage = Math.min(currentPage + 1, totalPages);

  //   for (let index = firstPage; index <= lastPage; index++) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={index}
  //         active={index === currentPage}
  //         onClick={() => {
  //           setCurrentPage(index);
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         {index}
  //       </Pagination.Item>
  //     );
  //   }
  //   // UI/UX add those '3 dots' from Bootstrap Pagination styling
  //   if (firstPage > 1) {
  //     // Add ellipsis before first page
  //     pageItems.unshift(
  //       <Pagination.Ellipsis key="ellipsis-start" disabled={true} />
  //     );
  //     pageItems.unshift(
  //       <Pagination.Item
  //         key={1}
  //         active={1 === currentPage}
  //         onClick={() => {
  //           setCurrentPage(1); // "firstPage"-Number clicks
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         1
  //       </Pagination.Item>
  //     );
  //   }
  //   if (lastPage < totalPages) {
  //     // Add ellipsis after last page
  //     pageItems.push(
  //       <Pagination.Ellipsis key="ellipsis-end" disabled={true} />
  //     );
  //     pageItems.push(
  //       <Pagination.Item
  //         key={totalPages}
  //         active={totalPages === currentPage}
  //         onClick={() => {
  //           setCurrentPage(totalPages); // "lastPage"-Number clicks
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         {totalPages}
  //       </Pagination.Item>
  //     );
  //   }
  // }

  // // // UPDATE 2nd SHORTCUTS for pageItems:
  // // Show all page numbers
  // for (let index = 1; index <= totalPages; index++) {
  //   pageItems.push(
  //     <Pagination.Item
  //       key={index}
  //       active={index === currentPage}
  //       onClick={() => {
  //         // Set the limit to the desired value (e.g., postPerPage)
  //         const limit = postPerPage;
  //         let offset = 0; // Initialize the offset to 0

  //         if (index > 1) {
  //           // Calculate the offset based on the current page
  //           offset = (index - 1) * postPerPage;
  //         }

  //         dispatchAsyncThunk(
  //           // getSortedPostsAsyncThunk({ limit, offset, carNameTitle: "" })
  //           getSortedPostsAsyncThunk({
  //             limit,
  //             offset,
  //             carNameTitle: searchSubmitForm.carNameTitle,
  //           })
  //         );
  //         setCurrentPage(index);
  //         window.scrollTo(0, 0); // Scroll to top
  //       }}
  //     >
  //       {index}
  //     </Pagination.Item>
  //   );
  // }
  // // UPDATE 2nd SHORTCUTS for pageItems^ENDS.

  // // UPDATE 3rd ^ Shortcuts BUGS: numbers go to infinitive
  // // I mean limitless: if I have postPerPage: for as long as
  // // there's Posts: the Vertical Scroll Bar appears for bad UX.
  // if (totalPages <= 1) {
  //   // Show single page without pagination
  //   pageItems.push(
  //     <Pagination.Item
  //       key={1}
  //       active={1 === currentPage}
  //       onClick={() => setCurrentPage(1)}
  //     >
  //       1
  //     </Pagination.Item>
  //   );
  // } else {
  //   const firstPage = Math.max(currentPage - 1, 1);
  //   const lastPage = Math.min(currentPage + 1, totalPages);

  //   if (firstPage > 1) {
  //     // Add ellipsis before first page
  //     pageItems.push(
  //       <Pagination.Ellipsis
  //         key="ellipsis-start"
  //         disabled={true}
  //         onClick={() => setCurrentPage(1)}
  //       />
  //     );
  //   }

  //   for (let index = firstPage; index <= lastPage; index++) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={index}
  //         active={index === currentPage}
  //         onClick={() => {
  //           setCurrentPage(index);
  //           // Add your dispatch function call here
  //           dispatchAsyncThunk(
  //             getSortedPostsAsyncThunk({
  //               limit: postPerPage,
  //               offset: (index - 1) * postPerPage,
  //               carNameTitle: searchSubmitForm.carNameTitle,
  //             })
  //           );
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         {index}
  //       </Pagination.Item>
  //     );
  //   }

  //   if (lastPage < totalPages) {
  //     // Add ellipsis after last page
  //     pageItems.push(
  //       <Pagination.Ellipsis
  //         key="ellipsis-end"
  //         disabled={true}
  //         onClick={() => {
  //           setCurrentPage(totalPages);
  //           // Add your dispatch function call here
  //           dispatchAsyncThunk(
  //             getSortedPostsAsyncThunk({
  //               limit: postPerPage,
  //               offset: (totalPages - 1) * postPerPage,
  //               carNameTitle: searchSubmitForm.carNameTitle,
  //             })
  //           );
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       />
  //     );
  //   }
  // }
  // // UPDATE 3rd ENDS^

  // // UPDATE 4: INCLUDE the 1st and LAST Numbers as well:
  // if (totalPages <= 1) {
  //   // Show single page without pagination
  //   pageItems.push(
  //     <Pagination.Item
  //       key={1}
  //       active={1 === currentPage}
  //       onClick={() => setCurrentPage(1)}
  //     >
  //       1
  //     </Pagination.Item>
  //   );
  // } else {
  //   const firstPage = Math.max(currentPage - 1, 1);
  //   const lastPage = Math.min(currentPage + 1, totalPages);

  //   if (firstPage > 1) {
  //     // Add ellipsis before first page
  //     pageItems.push(
  //       <Pagination.Ellipsis
  //         key="ellipsis-start"
  //         disabled={true}
  //         onClick={() => setCurrentPage(1)}
  //       />
  //     );
  //     pageItems.push(
  //       <Pagination.Item
  //         key={1}
  //         active={1 === currentPage}
  //         onClick={() => {
  //           setCurrentPage(1);
  //           // Add your dispatch function call here
  //           dispatchAsyncThunk(
  //             getSortedPostsAsyncThunk({
  //               limit: postPerPage,
  //               offset: 0,
  //               carNameTitle: searchSubmitForm.carNameTitle,
  //             })
  //           );
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         1
  //       </Pagination.Item>
  //     );
  //   }

  //   for (let index = firstPage; index <= lastPage; index++) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={index}
  //         active={index === currentPage}
  //         onClick={() => {
  //           setCurrentPage(index);
  //           // Add your dispatch function call here
  //           dispatchAsyncThunk(
  //             getSortedPostsAsyncThunk({
  //               limit: postPerPage,
  //               offset: (index - 1) * postPerPage,
  //               carNameTitle: searchSubmitForm.carNameTitle,
  //             })
  //           );
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         {index}
  //       </Pagination.Item>
  //     );
  //   }

  //   if (lastPage < totalPages) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={totalPages}
  //         active={totalPages === currentPage}
  //         onClick={() => {
  //           setCurrentPage(totalPages);
  //           // Add your dispatch function call here
  //           dispatchAsyncThunk(
  //             getSortedPostsAsyncThunk({
  //               limit: postPerPage,
  //               offset: (totalPages - 1) * postPerPage,
  //               carNameTitle: searchSubmitForm.carNameTitle,
  //             })
  //           );
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       >
  //         {totalPages}
  //       </Pagination.Item>
  //     );
  //     // Add ellipsis after last page
  //     pageItems.push(
  //       <Pagination.Ellipsis
  //         key="ellipsis-end"
  //         disabled={true}
  //         onClick={() => {
  //           setCurrentPage(totalPages);
  //           // Add your dispatch function call here
  //           dispatchAsyncThunk(
  //             getSortedPostsAsyncThunk({
  //               limit: postPerPage,
  //               offset: (totalPages - 1) * postPerPage,
  //               carNameTitle: searchSubmitForm.carNameTitle,
  //             })
  //           );
  //           window.scrollTo(0, 0); // Scroll to top
  //         }}
  //       />
  //     );
  //   }
  // }
  // // UPDATE 4: INCLUDE the 1st and LAST Numbers as well^ENDS

  // UPDATE 5: Fixing Elipsis UX:
  if (totalPages <= 1) {
    // Show single page without pagination
    pageItems.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => setCurrentPage(1)}
      >
        1
      </Pagination.Item>
    );
  } else {
    const firstPage = Math.max(currentPage - 1, 1);
    const lastPage = Math.min(currentPage + 1, totalPages);

    if (firstPage > 1) {
      pageItems.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => {
            setCurrentPage(1);
            // Add your dispatch function call here
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
      pageItems.push(
        <Pagination.Ellipsis
          key="ellipsis-start"
          disabled={true}
          onClick={() => {
            setCurrentPage(firstPage - 1);
            // Add your dispatch function call here
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
      pageItems.push(
        <Pagination.Item
          key={index}
          active={index === currentPage}
          onClick={() => {
            setCurrentPage(index);
            // Add your dispatch function call here
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
      pageItems.push(
        <Pagination.Ellipsis
          key="ellipsis-end"
          disabled={true}
          onClick={() => {
            setCurrentPage(lastPage + 1);
            // Add your dispatch function call here
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
      pageItems.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(totalPages);
            // Add your dispatch function call here
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
  // UPDATE 5: Fixing Elipsis UX^ENDS

  // const handleFirstPage = () => {
  const handleFirstPage = async () => {
    setCurrentPage(1);
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
  // const handleLastPage = () => {
  const handleLastPage = async () => {
    setCurrentPage(totalPages);
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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          size="lg"
          // size="sm"
          // default is Medium
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
