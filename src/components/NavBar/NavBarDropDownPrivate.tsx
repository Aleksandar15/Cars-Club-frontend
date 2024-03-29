import { Dropdown, DropdownButton } from "react-bootstrap";
import useLogouts from "../../hooks/logouts/useLogouts";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectVerifyUser } from "../../redux/slices/verifySlice";

const NavBarDropDownPrivate = () => {
  const navigatePage = useMyNavigate();
  const clickHomePage = () => navigatePage("/");
  const clickCatalog = () => navigatePage("/catalog");
  const clickMarketplace = () => navigatePage("/marketplace");
  const { clickLogout, clickLogoutAll } = useLogouts();
  const { user_name, user_email } = useSelectorTyped(selectVerifyUser);

  // Update to include Home if isMobile is true, because I hid the Nav.Links to save space
  const isMobile = window.innerWidth <= 767;

  return (
    <>
      <DropdownButton
        align="end"
        // title={<span className="navbar-toggler-icon "></span>}
        title="My Menu"
        id="dropdwon-menu-align-end"
        // className="ms-auto me-0"
        className="ms-auto me-5 mt-1"
      >
        <p className="m-0">
          My username: <span className="fw-bold">{user_name}</span>
        </p>
        <p className="m-0">
          My e-mail: <span className="fw-bold">{user_email}</span>
        </p>
        {/* <p className="m-0">{"Test"}</p> */}
        <Dropdown.Divider />
        {isMobile && (
          <Dropdown.Item
            eventKey="1"
            onClick={clickHomePage}
            className="text-white bg-success mb-1  text-center"
            style={{ borderRadius: "10px" }}
          >
            Home
          </Dropdown.Item>
        )}
        <Dropdown.Item
          eventKey="2"
          onClick={clickCatalog}
          className="text-white bg-info mb-1  text-center"
          style={{ borderRadius: "10px" }}
        >
          Catalog
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="3"
          onClick={clickMarketplace}
          className="text-white bg-info text-center"
          style={{ borderRadius: "10px" }}
        >
          Marketplace
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          eventKey="4"
          onClick={clickLogout}
          className="text-light bg-danger text-center"
          style={{ borderRadius: "10px" }}
        >
          Logout
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="5"
          onClick={clickLogoutAll}
          className="text-light bg-danger text-center mt-1"
          style={{ borderRadius: "10px" }}
        >
          Logout all devices
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default NavBarDropDownPrivate;
