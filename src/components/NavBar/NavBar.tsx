import { Navbar as NavBarByBS, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";

const NavBar = () => {
  const { isUserAuthorized } = useSelectorTyped((state) => state.verifyReducer);

  return (
    <NavBarByBS className="mb-5 bg-white shadow-sm">
      {/* Cars Club */}
      <Container>
        {/* NAV */}
        <Nav>
          {/* NAV2 */}
          {isUserAuthorized ? (
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
          ) : (
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
          )}
        </Nav>
        {/* Nav Outside */}
      </Container>
      {/* Container Outside */}
    </NavBarByBS>
  );
};

export default NavBar;
