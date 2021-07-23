import { useMutation } from "react-query";
import { axiosInstance } from "../axios";

interface RegisterDataValues {
  email: string;
  first_name: string;
  last_name: string;
  gcash_number: string;
  address: string;
  password: string;
}

export const useRegister = () => {
  return useMutation((data: RegisterDataValues) => axiosInstance.post("/user/register/", data));
};
