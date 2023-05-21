export type PostState = {
  title: string;
  image: string;
  description: string;
  // FormData issue: value can only be: string | Blob
  // contactNumber: number | null;
  // askingPrice: number | null;
  contactNumber: string;
  askingPrice: string;
  currency: Currency;
}; // No longer in use for my ModalPost_checkEmptyValueFN
// -> i've modified my ModalPost.tsx for reusability
// which Types comes from openModalPostSlice.ts; and
// the argument Type for ModalPost_checkEmptyValueFN MUST
// come from openModalPostSlice.ts`s InitialState.

export type Currency = "EUR" | "USD" | "Select currency";
