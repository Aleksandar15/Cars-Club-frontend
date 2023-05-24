import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Col,
  Row,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  getSortedPostsAsyncThunk,
  selectorSortedPostsStatus,
} from "../../redux/createAsyncThunk/getSortedPosts";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  FormSearchCarsFields,
  onChangeFormSearchCarsAction,
  selectorFormSearchCarsFields,
} from "../../redux/slices/formSearchCarsSlice";
import { triggerFormSearchSubmitAction } from "../../redux/slices/formSearchSubmitSlice";
import { setCurrentPageAction } from "../../redux/slices/paginationMarketplaceCurrentPageSlice";
import {
  onChangePostPerPage,
  selectorPostPerPage,
} from "../../redux/slices/postPerPageSlice";
import ClearSVGicon from "../../utilities/icons-setup/clear-SVG-icon";
// import CreatePostSVG from "../../utilities/icons-setup/createPost-SVG";
import SearchSVGicon from "../../utilities/icons-setup/search-SVG-icon";
import CreatePostButton from "./CreatePostButton";

const FormSearchCars = () => {
  const dispatchTyped = useDispatchTyped();
  const searchCarsFieldsState = useSelectorTyped<FormSearchCarsFields>(
    selectorFormSearchCarsFields
  );
  const dispatchAsyncThunk = useDispatchAsyncThunk();
  // postPerPage state for future plans & usages to
  // let user decide amount of posts per page to be shown.
  const postPerPage = useSelectorTyped(selectorPostPerPage);

  const postsStatus = useSelectorTyped(selectorSortedPostsStatus);
  // `flag` to disable `onClick` subsequent `handleSearchFN` calls
  const flag = postsStatus !== "succeeded" ? true : false;

  const handleSearchFN = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.count("handleSearchFN click");

    dispatchAsyncThunk(
      getSortedPostsAsyncThunk({
        // Those doesn't need Redux State because onClick
        //  I'm resetting the Pagination to:
        // 1 Page Per 5 Posts Standard (default on refresh)
        // Offset 0 because I start at index 0 in PG database.
        limit: 5, // as per the standard `postPerPage`.
        offset: 0,
        carNameTitle: searchCarsFieldsState.carNameInputField.trim(),
      })
    );

    // Also trigger a Redux State change ONLY on (this)
    // 'handleSearchFN' button clicks which will will be
    // read & used inside 'PaginationMarketplace.tsx'
    dispatchTyped(
      triggerFormSearchSubmitAction({
        // Trim it from here so that I don't have to rely on not
        // forgetting to trim inside my `PaginationMarketplace`
        // where this `carNameTitle` state is received & used.
        carNameTitle: searchCarsFieldsState.carNameInputField.trim(),
      })
    );

    // Visual BUG inside `PaginationMarketplace`:
    // must reset `PaginationMarketplace` `currentPage` state to `1`
    dispatchTyped(setCurrentPageAction({ currentPage: 1 }));
  };

  // // const [searchInput, setSearchInput] = useState("");
  // const [searchInput, setSearchInput] = useState<searchFields>({
  //   carNameField: "",
  // });
  // const { carNameField } = searchInput;

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // console.log("name:", name, "value:", value);

    // setSearchInput((prevState) => {
    //   return { ...prevState, [name]: value };
    // });

    dispatchTyped(
      onChangeFormSearchCarsAction({
        ...searchCarsFieldsState,
        carNameInputField: value,
      })
    );
  };

  const clearInputField = () => {
    // setSearchInput((prevState) => {
    //   return { ...prevState, carNameField: "" };
    // });

    dispatchTyped(
      onChangeFormSearchCarsAction({
        ...searchCarsFieldsState,
        carNameInputField: "",
      })
    );
  };

  const handlePostPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    // setPostPerPage(selectedValue);
    // onChange(selectedValue);
  };

  return (
    <>
      <Form onSubmit={handleSearchFN} className="pb-4 mb-4 ">
        <Row
          md="2"
          lg="2"
          // xs="1" //same as xs="10"
          xs="10"
        >
          <Col className="mb-2">
            <div className="input-group">
              {/* <InputGroup.Text 
              id="carNameField" className="text-primary">
                SEARCH
              </InputGroup.Text> */}
              <InputGroup.Text id="carNameField" className="text-primary">
                SORT
                <Form.Select
                  id="postPerPage"
                  value={postPerPage}
                  onChange={handlePostPerPageChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </Form.Select>
              </InputGroup.Text>
              <FloatingLabel label="Search by car's name">
                <Form.Control
                  type="text"
                  placeholder="Search car by name"
                  name="carNameField"
                  id="carNameField"
                  aria-describedby="carNameField"
                  onChange={handleInput}
                  value={searchCarsFieldsState.carNameInputField}
                />
              </FloatingLabel>
              <Button
                variant="btn bg-light btn-outline-danger"
                onClick={clearInputField}
                type="button"
              >
                <ClearSVGicon />
              </Button>
              <Button
                variant="btn bg-light btn-outline-primary"
                type="submit"
                disabled={flag}
              >
                <SearchSVGicon />
              </Button>
            </div>
          </Col>
          <CreatePostButton />
        </Row>
      </Form>
    </>
  );
};

export default FormSearchCars;
