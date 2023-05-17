export type PostState = {
  title: string;
  image: string;
  description: string;
  // FormData issue: value can only be: string | Blob
  // contactNumber: number | null;
  // askingPrice: number | null;
  contactNumber: string;
  askingPrice: string;
};

export type Currency = "EUR" | "USD" | "Select currency";
