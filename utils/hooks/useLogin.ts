import { useMutation } from "react-query";
import { axiosInstance } from "../axios";

interface InputData {
  username: string;
  password: string;
}
export const useLogin = () => {
  return useMutation((data: InputData) => axiosInstance.post("/user/auth/", data));
};
