import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import SearchSVGicon from "../../utilities/icons/search-SVG-icon";

const Marketplace = () => {
  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("click");
  };

  interface searchFields {
    carNameField: string;
    yearMadeField: number;
  }

  // const [searchInput, setSearchInput] = useState("");
  const [searchInput, setSearchInput] = useState<searchFields>({
    carNameField: "",
    yearMadeField: 2023,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    console.log("name:", name, "value:", value);

    setSearchInput((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <h3 className="mb-3 pb-3 text-primary">
        Welcome to Marketplace - Here you can find offers or post your own.
      </h3>
      <Form onSubmit={handleSearch}>
        <Col md="5">
          <div className="input-group">
            <InputGroup.Text id="carNameField" className="text-primary ">
              SEARCH
            </InputGroup.Text>
            <FloatingLabel label="Search by car's brand">
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
      </Form>
    </>
  );
};

export default Marketplace;
