import { Button } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";

const CatalogDeveloperNotice = () => {
  const navigatePage = useMyNavigate();
  return (
    <h5
      // className="mb-3 pb-3 text-danger text-center"
      className="mb5 pb-5 text-danger text-center"
    >
      Developer's notice: the CRUD operations happen at{" "}
      <Button
        className="p-1" // made smaller
        onClick={() => navigatePage("/marketplace")}
      >
        Marketplace
      </Button>
    </h5>
  );
};

export default CatalogDeveloperNotice;
