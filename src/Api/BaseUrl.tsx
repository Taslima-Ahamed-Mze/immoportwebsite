import axios, { AxiosRequestConfig } from "axios";

const customAxios = axios.create({
  baseURL: "http://api.immopport.cda.ve.manusien-ecolelamanu.fr/api/public/",
  timeout: 10000, //request aborted after 10s
  headers: {
    "Content-type": "application/json",
  }
});

// const errorHandler = (error: any) => {
//   return Promise.reject(error);
// };

// customAxios.interceptors.request.use(
//   (error) => errorHandler(error)
// );

// customAxios.interceptors.response.use(
//   (error) => errorHandler(error)
// );

export default customAxios 