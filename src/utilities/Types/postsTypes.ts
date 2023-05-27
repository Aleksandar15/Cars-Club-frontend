export type PostType = {
  post_title: string;
  // post_image_buffer: Post_image_buffer | undefined;
  post_image_buffer: Post_image_buffer;
  post_description: string;
  post_contact_number: string;
  post_asking_price: string;
  post_asking_price_currency: Currency;
  post_id: string;
  user_id: string;
  post_created_at: string;
  post_created_by_user_name: string;
  post_created_by_user_email: string;
  post_created_by_user_role: string;
};

// export type Currency = "EUR" | "USD" | "Select currency" | "";
export type Currency = "EUR" | "USD" | "Select currency";

export type Post_image_buffer = {
  type: "Buffer";
  data: ArrayBuffer;
  // data: ArrayBufferLike;
  // // Under the hood of TypeScript:
  // // type ArrayBufferLike = ArrayBuffer | SharedArrayBuffer
};
