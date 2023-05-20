import CatalogDeveloperNotice from "../../components/CatalogComponents/CatalogDeveloperNotice";
import CatalogPosts from "../../components/CatalogComponents/CatalogPosts";

const Catalog = () => {
  return (
    <>
      <h3 className="mb-3 pb-3 text-success text-center">
        Have a look at the cars specifiations & details
      </h3>
      <CatalogDeveloperNotice />
      <CatalogPosts />
    </>
  );
};

export default Catalog;
