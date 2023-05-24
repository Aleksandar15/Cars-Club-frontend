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
    // Calling this so that even PaginationMarketplace is aware
    // otherwise if User changes Pages: Pagination will be using the
    // Redux's Default State of 5 & I don't want that
    dispatchTyped(onChangePostPerPage({ postPerPage: selectedValue }));
    dispatchAsyncThunk(
      getSortedPostsAsyncThunk({
        limit: selectedValue,
        offset: 0,
        carNameTitle: searchCarsFieldsState.carNameInputField,
      })
    );
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
              <InputGroup.Text
                id="carNameField"
                // className="text-primary" // Has no Effect anymore;
                className="ps-1 pe-1" //Works for OPTION
                style={{
                  display: "grid",
                  // Math Max Calculations based on DevTools .Control
                  maxHeight: "58px",
                  maxWidth: "58px", // Default. Guards for Mobile
                }}
              >
                {/* SORT */}
                {/* <div className="custom-select-wrapper"> */}
                <Form.Label
                  htmlFor="postPerPage"
                  style={{
                    // fontSize: "15px",
                    fontSize: "12px",
                    maxHeight: "15px",
                    marginTop: "-5px",
                    userSelect: "none", // Just The Text
                    maxWidth: "48px", // Default. Mobile Guards.
                  }}
                  // className="text-primary me-0 ms-0"
                  // className="text-primary p-0 mb-0 fw-bold"
                  // now with the marginTop: "-5px": mb-1:
                  className="text-primary p-0 mb-1 fw-bold"
                >
                  {/* SORT */}
                  SORT BY:
                </Form.Label>
                <Form.Select
                  id="postPerPage"
                  value={postPerPage}
                  onChange={handlePostPerPageChange}
                  // style={{ fontSize: "12px" }}
                  className={"pe-2 "}
                  style={{
                    maxHeight: "33px",
                    fontSize: "14px",
                    color: "green",
                    fontWeight: "bold",
                    // fontWeight requires maxWidth:
                    maxWidth: "48px",
                    paddingTop: "5px",

                    // -> backgroundPosition has only X & Y
                    // backgroundPosition: "50px 0px", // arrow
                    // or this:-> both hides the arrow
                    // backgroundPosition: "0px 30px", // arrow
                    // because the Arrow gets in the way of
                    // 2 digits numbers 10/15; however I can
                    // style it in corner:
                    // Left Top Corner:
                    // backgroundPosition: "0px 0px", // Left-Top
                    // // Bottom-Right
                    // backgroundPosition: "30px 20px", // Bot-R
                    // Mid-Right meaning: at-the-level-of-numbers
                    backgroundPosition: "30px 10px", // Mid-R
                    // Top-Right Corner -> safety even for `100`
                    // backgroundPosition: "30px 00px", // Top-R

                    // textIndent: "-5px", // Hides it from UI
                    // behind Selector; instead:
                    // paddingLeft: "0px", // To the Most-Left
                    // paddingLeft: "5px",
                    paddingLeft: "10px",

                    backgroundColor: "#cfd4f9",
                    // 1% differences: ^ blueish VS purpleish:
                    // backgroundColor: "#d2d6f4",

                    border: "none",
                    // outline: "none", // No effect on border
                    // Below has effect, but just causes too
                    // much unnecessary attention to 'SELECT':
                    // outline: "double", // also works better
                    // then `border:double`->since it's outline
                  }}
                >
                  <option
                    disabled
                    // value="SORT" // unselectable no VALUE needed.
                    style={{ fontSize: "13px", fontWeight: "bold" }}
                  >
                    {/* Sort */}
                    {/* # of Posts */}
                    Posts
                  </option>
                  <option value={1} className="fw-bold">
                    1
                  </option>
                  <option value={2} className="fw-bold">
                    2
                  </option>
                  <option value={5} className="fw-bold">
                    5
                  </option>
                  <option value={10} className="fw-bold">
                    10
                  </option>
                  <option value={15} className="fw-bold">
                    15
                  </option>
                </Form.Select>
                <Form.Label />
                {/* </div> */}
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
