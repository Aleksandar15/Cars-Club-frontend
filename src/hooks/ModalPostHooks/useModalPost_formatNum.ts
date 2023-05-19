import { Currency } from "../../utilities/Types/modalPostTypes";

const useModalPost_formatNum = (currency?: Currency) => {
  const formatNumber = (
    value: string,
    currencyArg = currency as Currency // Defaults to currency Hook arg.
  ): string => {
    if (currencyArg === "EUR") {
      // // Format the number with commas for Europe AND add € at the end
      // return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "€";

      // // For UX preference I decided not to use "€" at the end.
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      // Format the number with dots for the USA AND add $ at the beginning
      // return "$" + value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  };

  const deformatNumber = (formattedValue: string): string => {
    // Remove commas or dots from the formatted value
    const deformattedValue = formattedValue.replace(/[,|.]/g, "");
    return deformattedValue;
  };

  return { formatNumber, deformatNumber };
};

export default useModalPost_formatNum;
