import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:3000";

export const axiosDefaultReq = axios.create({ baseURL: BASE_URL });

export const axiosCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
// NOTE first argument of .post (or .get, etc.) method is 'path',
// second argument is 'body'/'data' so if third argument ('headers')
// is needed, then: pass {} to 2nd argument for empty-body requests.

export const axiosReqJSON = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosAcceptJSON = async (
  method: string,
  path: string,
  data: unknown
) => {
  try {
    const response = await axios({
      method,
      data,
      url: `${BASE_URL}${path}`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return response?.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Fix: TSC error 'Object (.response) is possibly 'undefined''
      return err?.response?.data;
    } else {
      console.log("Unexpected Axios error:", err);
      return "An unexpected error happened";
    }
  }
};
