import FormSearchCars from "../../components/MarketplaceComponents/FormSearchCars";
import MarketplaceHeader from "../../components/MarketplaceComponents/MarketplaceHeader";
import Post from "../../components/MarketplaceComponents/Post";
import ModalPost from "../../components/Modals/ModalPost";

const Marketplace = () => {
  return (
    <>
      <ModalPost />
      <MarketplaceHeader />
      <FormSearchCars />
      <Post />
    </>
  );
};

export default Marketplace;
