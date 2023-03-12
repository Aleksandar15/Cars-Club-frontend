import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
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
      <Form onSubmit={handleSearch}>
        <FormGroup>
          <FormLabel htmlFor="carNameField">SEARCH:</FormLabel>
          <div className="input-group">
            <FormControl
              type="text"
              placeholder="Search car name"
              name="carNameField"
              id="carNameField"
              onChange={handleInput}
              // value={searchInput}
              value={searchInput.carNameField}
            />
            <Button variant="btn bg-light btn-outline-primary" type="submit">
              <SearchSVGicon />
            </Button>
          </div>
        </FormGroup>
      </Form>
    </>
  );
};

export default Marketplace;
