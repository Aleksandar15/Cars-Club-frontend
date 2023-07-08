import { Dropdown, DropdownButton } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectVerifyUser } from "../../redux/slices/verifySlice";

const NavDropDownPublic = () => {
  const navigatePage = useMyNavigate();

  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);

  // Update to include Home if isMobile is true, because I hid the Nav.Links to save space
  const isMobile = window.innerWidth <= 767;

  return (
    <>
      <DropdownButton
        align="end"
        // title={<span className="navbar-toggler-icon "></span>}
        title="My Menu"
        id="dropdwon-menu-align-end"
        className="ms-auto me-5 mt-1"
        disabled={isUserAuthorized === undefined ? true : false}
      >
        <Dropdown.Item
          eventKey="1"
          onClick={() => navigatePage("/")}
          className="text-white bg-success mb-1  text-center"
          style={{ borderRadius: "10px" }}
        >
          HOME
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => navigatePage("/login")}
          className="text-white bg-info mb-1  text-center"
          style={{ borderRadius: "10px" }}
        >
          LOGIN
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="3"
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
