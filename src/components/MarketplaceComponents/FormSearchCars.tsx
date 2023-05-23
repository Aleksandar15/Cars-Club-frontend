import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Col,
  Row,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import { getSortedPosts } from "../../redux/createAsyncThunk/getSortedPosts";
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

  const handleSearchFN = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.count("handleSearchFN click");

    // New logic: I must have to send a different state of the
    // finalized searchCarsFieldsState.carNameInputField STATE
    // to the Post.tsx for sending GET Sort methods
    // as to avoid useEffect's dependency WARNINGS by the fact
    // that I'll be sending it as PARAMS to the soon to be made
    // SORT GETallPosts Controller
    // ^-> AGAIN:
    // That'd be a workaround:
    // a 'triggerSearchBarReFetch' REDUX STATE can be the
    // "searchCarsFieldsState.carNameInputField" REDUX STATE
    // so that if it never changed: it won't re-trigger a Fetch
    // call.
    // *A flag would trigger re-fetch because my plan was to
    // switch !flag the opposite boolean on handleSearchFN clicks.
    // I feel like I've wasted a Redux Slice in here unless I
    // plan to split my FormSearchCars even more
    // The NEW PLAN ACTION:
    // handleSearchFN will dispatch a Redux Action to change
    // fields by name from "" (empty strings) to let's say
    // MERCEDES -> thus I wouldn't need a flag -> because a
    // flag is even worse solution: it will re-fetch EVEN IF
    // the same input is written WHILE a REDUX STATE CHANGE
    // if it's the same then the handleSearchFN clicks won't
    // re-call the useEffect inside Post.tsx & Thus no re-fetch

    dispatchAsyncThunk(
      getSortedPosts({
        // Those doesn't need Redux State
        // because I'm starting from
        // 1 Page Per 5 Posts Standard
        // Offset 0 because I start at index 0 in PG.
        limit: 5, // as per the standard `postPerPage`.
        offset: 0,
        carNameTitle: searchCarsFieldsState.carNameInputField.trim(),
      })
    );

    // Also trigger a Redux State change ONLY on
    // 'handleSearchFN' (this) button clicks
    // which will show up the state update inside
    // 'PaginationMarketplace.tsx'
    // dispatchTyped(
    //   triggerFormSearchSubmitAction({
    //     carNameTitle: searchCarsFieldsState.carNameInputField,
    //   })
    // );
  };

  // // const [searchInput, setSearchInput] = useState("");
  // const [searchInput, setSearchInput] = useState<searchFields>({
  //   carNameField: "",
  // });
  // const { carNameField } = searchInput;

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    console.log("name:", name, "value:", value);

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
              <InputGroup.Text id="carNameField" className="text-primary">
                SEARCH
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
              <Button variant="btn bg-light btn-outline-primary" type="submit">
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
