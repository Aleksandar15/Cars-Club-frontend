import { Dropdown, DropdownButton } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";

const NavDropDownPublic = () => {
  const navigatePage = useMyNavigate();

  return (
    <>
      <DropdownButton
        align="end"
        // title={<span className="navbar-toggler-icon "></span>}
        title="My Menu"
        id="dropdwon-menu-align-end"
        className="ms-auto me-5 mt-1"
      >
        <Dropdown.Item
          eventKey="1"
          onClick={() => navigatePage("/login")}
          className="text-white bg-info mb-1  text-center"
          style={{ borderRadius: "10px" }}
        >
          LOGIN
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => navigatePage("/register")}
          className="text-white bg-info text-center"
          style={{ borderRadius: "10px" }}
        >
          REGISTER
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default NavDropDownPublic;
