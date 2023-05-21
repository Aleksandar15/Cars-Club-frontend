import { Currency } from "./modalPostTypes";

export interface FoundOnePost {
  post_id: string;
  post_title: string;
  post_description: string;
  post_contact_number: string;
  post_asking_price: string;
  user_id: string;
  // post_asking_price_currency: string;
  post_asking_price_currency: Currency;
  post_created_at: Date;
  post_created_by_user_name: string;
  post_created_by_user_email: string;
  post_created_by_user_role: string;
  // post_image_buffer is NOT retrieved for "Edit Post"
  // because if User wants to change photo
  // -> let the User upload new one in the ModalPost.
}

export type Posts_view_except_post_image = FoundOnePost[];
