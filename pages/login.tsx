import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Input from "../components/Form/Input";
import { useLogin } from "../utils/hooks/useLogin";

interface FormValues {
  username: string;
  password: string;
}
const LoginPage = () => {
  const { handleSubmit, register } = useForm<FormValues>();
  const login = useLogin();
  const onSubmit = async ({ password, username }: FormValues) => {
    const { data } = await login.mutateAsync({ password, username });
  };
  return (
    <div className="flex justify-center pt-20">
      <div className="px-8 py-6 border shadow-sm w-[360px] max-w-[90vw]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <h1 className="mb-8 text-2xl font-bold">Login</h1>
          <div className="flex flex-col space-y-3">
            <Input label="Username" type="email" {...register("username", { required: true })} />
            <Input label="Password" type="password" {...register("password", { required: true })} />
          </div>
          <button className="py-2 mt-8 font-medium text-white bg-green-400 rounded-sm">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
