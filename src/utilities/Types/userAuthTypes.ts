export interface ErrorUserAuth {
  isSuccessful: boolean;
  message: string;
}
export interface SuccessUserAuth extends ErrorUserAuth {
  user_role: string;
  user_name?: string;
  user_email?: string;
  user_id?: string;
}

export interface LogoutSuccess {
  isSuccessful: boolean;
  message: string;
}
