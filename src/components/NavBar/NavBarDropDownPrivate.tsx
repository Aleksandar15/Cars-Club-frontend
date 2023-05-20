import { Dropdown, DropdownButton } from "react-bootstrap";
import useLogouts from "../../hooks/logouts/useLogouts";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";

const NavBarDropDownPrivate = () => {
  const navigatePage = useMyNavigate();
  const clickCatalog = () => navigatePage("/catalog");
  const clickMarketplace = () => navigatePage("/marketplace");
  const { clickLogout, clickLogoutAll } = useLogouts();

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
        <Dropdown.Item
          eventKey="4"
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
