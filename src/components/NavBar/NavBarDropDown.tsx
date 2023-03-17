import { Dropdown, DropdownButton } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";
import { useDispatchTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { unauthorized } from "../../redux/slices/verifySlice";

const NavBarDropDown = () => {
  const navigatePage = useMyNavigate();
  const dispatch = useDispatchTyped();
  const clickCatalog = () => navigatePage("/catalog");
  const clickMarketplace = () => navigatePage("/marketplace");
  const clickLogout = () => {
    dispatch(unauthorized({ userStatus: { isUserAuthorized: false } }));
    //if data received by backend is a 'successful logout':
    navigatePage("/");
  };

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
        <Dropdown.Item
          eventKey="1"
          onClick={clickCatalog}
          className="text-white bg-info mb-1  text-center"
          style={{ borderRadius: "10px" }}
        >
          Catalog
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={clickMarketplace}
          className="text-white bg-info text-center"
          style={{ borderRadius: "10px" }}
        >
          Marketplace
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          eventKey="3"
          onClick={clickLogout}
          className="text-light bg-danger text-center"
          style={{ borderRadius: "10px" }}
        >
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default NavBarDropDown;
