import FormSearchCars from "../../components/MarketplaceComponents/FormSearchCars";
import MarketplaceHeader from "../../components/MarketplaceComponents/MarketplaceHeader";
import Post from "../../components/MarketplaceComponents/Post";
import ModalPost from "../../components/Modals/ModalPost";
import ModalPostSuccessText from "../../components/Modals/ModalPostSuccessText";
import ModalText from "../../components/Modals/ModalText";

const Marketplace = () => {
  return (
    <>
      <ModalPostSuccessText />
      <ModalPost />
      <MarketplaceHeader />
      <FormSearchCars />
      <Post />
    </>
  );
};

export default Marketplace;
