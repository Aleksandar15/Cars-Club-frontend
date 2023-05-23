import { Currency, Post_image_buffer } from "./postsTypes";

export interface EdittedPost {
  post_title: string;
  post_image_buffer: Post_image_buffer | undefined;
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
}

export interface ReceivedDataEditedPosts {
  isSuccessful: boolean;
  message: string;
  edittedPost: EdittedPost;
}

export function isEdittedPostTypeCheckerFN(obj: any): obj is EdittedPost {
  return (
    typeof obj === "object" &&
    obj !== null &&
    obj !== undefined &&
    "post_title" in obj &&
    "post_image_buffer" in obj &&
    "post_description" in obj &&
    "post_contact_number" in obj &&
    "post_asking_price" in obj &&
    "post_asking_price_currency" in obj &&
    "post_id" in obj &&
    "user_id" in obj &&
    "post_created_at" in obj &&
    "post_created_by_user_name" in obj &&
    "post_created_by_user_email" in obj &&
    "post_created_by_user_role" in obj
  );
}
