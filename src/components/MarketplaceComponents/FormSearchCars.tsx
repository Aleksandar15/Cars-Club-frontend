import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Col,
  Row,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import ClearSVGicon from "../../utilities/icons-setup/clear-SVG-icon";
import CreatePostSVG from "../../utilities/icons-setup/createPost-SVG";
import SearchSVGicon from "../../utilities/icons-setup/search-SVG-icon";
import CreatePostButton from "./CreatePostButton";

const FormSearchCars = () => {
  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("click");
  };

  interface searchFields {
    carNameField: string;
  }

  // const [searchInput, setSearchInput] = useState("");
  const [searchInput, setSearchInput] = useState<searchFields>({
    carNameField: "",
  });
  const { carNameField } = searchInput;

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    console.log("name:", name, "value:", value);

    setSearchInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const clearInputField = () => {
    setSearchInput((prevState) => {
      return { ...prevState, carNameField: "" };
    });
  };

  return (
    <>
      <Form onSubmit={handleSearch} className="pb-4 mb-4 ">
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
                  value={searchInput.carNameField}
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
