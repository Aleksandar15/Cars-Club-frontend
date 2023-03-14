import { useState } from "react";
import { Navbar as NavBarByBS, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <NavBarByBS className="mb-5 bg-white shadow-sm">
      {/* Cars Club */}
      <Container>
        {/* NAV */}
        <Nav>
          {/* NAV2 */}
          {isAuthenticated ? (
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
