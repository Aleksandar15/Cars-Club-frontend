import { Navbar as NavBarByBS, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectorOpenModalDeletePost } from "../../redux/slices/modalDeletePostSlice";
import { selectorOpenModalPostSuccessText } from "../../redux/slices/modalPostSuccessTextSlice";
import { selectorOpenModalPost } from "../../redux/slices/openModalPostSlice";
import { selectorOpenModalText } from "../../redux/slices/openModalTextSlice";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import NavBarDropDownPrivate from "./NavBarDropDownPrivate";
import NavDropDownPublic from "./NavDropDownPublic";

const NavBar = () => {
  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);
  // Fixing a bug where sticky="top" persists and overrides my custom modal,
  // instead, based on the ModalText state toggle the "sticky" accordingly
  const { isModalOpen } = useSelectorTyped(selectorOpenModalText);
  const { isModalPostOpen } = useSelectorTyped(selectorOpenModalPost);
  const { isModalPostSuccessTextOpen } = useSelectorTyped(
    selectorOpenModalPostSuccessText
  );
  const { isModalDeletePostOpen } = useSelectorTyped(
    selectorOpenModalDeletePost
  );

  // Logic behind `sticky`: must have "top" or UNDEFINED value, so if any of
  // the Modals are open (their state is TRUE) then set 'sticky' to UNDEFINED

  // Fix for mobile screen where NavBar would take up a lot of space
  // is to hide the Nav.Link, but include Home inside the DropDown
  const isMobile = window.innerWidth <= 767;

  return (
    <NavBarByBS
      sticky={
        isModalOpen
          ? undefined
          : isModalPostOpen
          ? undefined
          : isModalPostSuccessTextOpen
          ? undefined
          : isModalDeletePostOpen
          ? undefined
          : "top"
      }
      className="mb-5 bg-white shadow-sm"
    >
      {/* Cars Club */}
      <Container className={`navBarContainer`}>
        {/* NAV */}
        <Nav
        // className={`navCustomClass`}
        >
          {/* NAV2 */}
          {!isMobile ? (
            // If it's NOT Mobile screen, then display Nav.Links
            isUserAuthorized === true ? (
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
            )
          ) : (
            // Return nothing when isMobile is true.
            <></>
          )}
        </Nav>
        {/* NAV OUTSIDE */}
        {/* TITLE */}
        <NavBarByBS.Brand
          className={`text-info fs-4 fw-bold navBarBrandTitle`}
          // className={`text-info fs-4 fw-bold `}

          // Below even mt-1 & mb-1 are too much for Mobile screens
          // className={`text-info fs-4 fw-bold navBarBrandTitle mt-1 mb-1`}
        >
          CARS CLUB
        </NavBarByBS.Brand>
        {isUserAuthorized ? <NavBarDropDownPrivate /> : <NavDropDownPublic />}
      </Container>
      {/* Container Outside */}
    </NavBarByBS>
  );
};

export default NavBar;
