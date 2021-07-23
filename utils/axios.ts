import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://wknpjk3sg8.execute-api.us-west-2.amazonaws.com/dev/api",
});
