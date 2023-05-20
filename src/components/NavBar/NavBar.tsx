import { Navbar as NavBarByBS, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectorOpenModalPost } from "../../redux/slices/openModalPostSlice";
import { selectorOpenModalText } from "../../redux/slices/openModalTextSlice";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import NavBarDropDown from "./NavBarDropDown";
import NavDropDownPublic from "./NavDropDownPublic";

const NavBar = () => {
  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);
  // Fixing a bug where sticky="top" persists and overrides my custom modal,
  // instead, based on the ModalText state toggle the "sticky" accordingly
  const { isModalOpen } = useSelectorTyped(selectorOpenModalText);
  const { isModalPostOpen } = useSelectorTyped(selectorOpenModalPost);

  return (
    <NavBarByBS
      sticky={isModalOpen ? undefined : isModalPostOpen ? undefined : "top"}
      className="mb-5 bg-white shadow-sm"
    >
      {/* Cars Club */}
      <Container className={`navBarContainer`}>
        {/* NAV */}
        <Nav className={`navCustomClass`}>
          {/* NAV2 */}
          {isUserAuthorized === true ? (
            <>
              <Nav.Link to="/" as={NavLink} className="fs-5">
                Home
              </Nav.Link>
              <Nav.Link to="/catalog" as={NavLink} className="fs-5">
                Catalog
              </Nav.Link>
              <Nav.Link to="/marketplace" as={NavLink} className="fs-5">
                Marketplace
              </Nav.Link>
            </>
          ) : isUserAuthorized === false ? (
            <>
              <Nav.Link to="/" as={NavLink} className="fs-5">
                Home
              </Nav.Link>
              <Nav.Link to="/login" as={NavLink} className="fs-5">
                Login
              </Nav.Link>
              <Nav.Link to="/register" as={NavLink} className="fs-5">
                Register
              </Nav.Link>
            </>
          ) : (
            <Nav.Link to="/" as={NavLink} className="fs-5">
              Home
            </Nav.Link>
          )}
        </Nav>
        {/* NAV OUTSIDE */}
        {/* TITLE */}
        <NavBarByBS.Brand className={`text-info fs-4 fw-bold navBarBrandTitle`}>
          CARS CLUB
        </NavBarByBS.Brand>
        {isUserAuthorized ? <NavBarDropDown /> : <NavDropDownPublic />}
      </Container>
      {/* Container Outside */}
    </NavBarByBS>
  );
};

export default NavBar;
