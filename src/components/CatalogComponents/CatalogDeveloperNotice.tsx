import { Button } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";

const CatalogDeveloperNotice = () => {
  const navigatePage = useMyNavigate();
  return (
    <>
      <h5
        // className="mb-3 pb-3 text-danger text-center"
        // className="mb-5 pb-5 text-danger text-center"
        // className="mb-5  text-danger text-center"
        className="  text-danger text-center"
      >
        Developer's notice: the CRUD operations happen at{" "}
        <Button
          className="p-1" // made smaller
          onClick={() => navigatePage("/marketplace")}
        >
          Marketplace
        </Button>
      </h5>
      <h6
        className="mb-5    mt-3 text-center"
        style={{ color: "#0dcaf0", fontSize: "18px" }}
      >
        (In here I have 1 post/page so you can easily access pagination.)
      </h6>
    </>
  );
};

export default CatalogDeveloperNotice;
