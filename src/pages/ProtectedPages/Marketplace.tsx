import FormSearchCars from "../../components/MarketplaceComponents/FormSearchCars";
import CreatePost from "../../components/MarketplaceComponents/CreatePost";

const Marketplace = () => {
  return (
    <>
      <h3 className="mb-4 pb-4 text-primary text-center">
        Welcome to Marketplace - Here you can find offers or post your own.
      </h3>
      <FormSearchCars />
    </>
  );
};

export default Marketplace;
