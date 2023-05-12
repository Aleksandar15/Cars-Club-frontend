export interface ErrorUserAuth {
  isSuccessful: boolean;
  message: string;
}
export interface SuccessUserAuth extends ErrorUserAuth {
  user_role: string;
}
