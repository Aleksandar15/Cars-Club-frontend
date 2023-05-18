import axios, { AxiosError } from "axios";

console.log("import.metea.env:", import.meta.env);
// DEFAULT VALUES by Vite (CRA React requires: npm i dotenv):
// {BASE_URL: '/', MODE: 'development', DEV: true, PROD: false, SSR: false}
// NOTE: MODE changes by Vite's checkings

let BASE_URL: string = "";
if (import.meta.env?.DEV) BASE_URL = "http://localhost:3000" as string;
else if (import.meta.env?.PROD) BASE_URL = "https://cars-club.netlify.app/api";

export const axiosDefaultReq = axios.create({ baseURL: BASE_URL as string });

export const axiosCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
// NOTE first argument of .post (or .get, etc.) method is 'path',
// second argument is 'body'/'data' so if third argument ('headers')
// is needed, then: pass {} to 2nd argument for empty-body requests.

export const axiosCredentialsNonInterceptors = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

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
