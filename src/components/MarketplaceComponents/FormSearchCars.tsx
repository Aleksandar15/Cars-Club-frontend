import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Col,
  Row,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import SearchSVGicon from "../../utilities/icons/search-SVG-icon";
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

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    console.log("name:", name, "value:", value);

    setSearchInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row
        md="2"
        lg="2"
        // xs="1" //same as xs="10"
        xs="10"
      >
        <Col>
          <div className="input-group">
            <InputGroup.Text id="carNameField" className="text-primary ">
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
            <Button variant="btn bg-light btn-outline-primary" type="submit">
              <SearchSVGicon />
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default FormSearchCars;
