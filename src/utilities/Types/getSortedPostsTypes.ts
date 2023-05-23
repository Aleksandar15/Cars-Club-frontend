import { Currency, Post_image_buffer } from "./postsTypes";

// Define the data types for your API response
export interface PostSorted {
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

// Define the state type for getSortedPosts slice
export interface GetSortedPostsState {
  posts: PostSorted[];
  // loading: boolean;
  // loading: "idle" | "loading" | "succeeded" | "failed";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  // UPDATE:
  total_posts: string | number;
}

// Define the payload type for getSortedPosts async thunk
// arguments
export interface GetSortedPostsPayload {
  limit: number;
  offset: number;
  carNameTitle: string;
}

export type Total_posts = string | number;

export interface ReceivedDataSortedPosts {
  posts: PostSorted[];
  total_posts: Total_posts;
}

export interface EditSortedPost {
  isModalPostOpen: boolean;
  // text?: string;
  title: string;
  image: string | File;
  description: string;
  contactNumber: string;
  askingPrice: string;
  currency: Currency;
}
