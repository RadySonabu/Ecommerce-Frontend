import ErrorMessage from "@/compomemts/Form/ErrorMessage";
import Link from "@/compomemts/Link";
import { apiHandler } from "@/utils/apiHandler";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import Input from "../components/Form/Input";
import { useLogin } from "../utils/hooks/useLogin";

interface FormValues {
  username: string;
  password: string;
}
const LoginPage = () => {
  const { handleSubmit, register } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const login = useLogin();

  const onSubmit = async ({ password, username }: FormValues) => {
    setIsSubmitting(true);
    const res = await apiHandler(login.mutateAsync({ password, username }));
    if (res.type === "error") {
      setErrorMessage(res.error.detail);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="flex justify-center pt-20">
      <div className="px-8 py-6 border shadow-sm w-[360px] max-w-[90vw] space-y-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <h1 className="mb-8 text-2xl font-bold">Login</h1>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <div className="flex flex-col space-y-3">
            <Input label="Username" type="email" {...register("username", { required: true })} />
            <Input label="Password" type="password" {...register("password", { required: true })} />
          </div>

          <button
            type="submit"
            className="relative flex justify-center py-2 mt-8 font-medium text-white bg-green-400 rounded-sm"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <FiLoader size="1rem" className="absolute inset-0 w-4 m-auto animate-spin" />
            )}
            <span className={`${isSubmitting && "invisible"}`}>Log in</span>
          </button>
        </form>
        <p className="text-sm">
          Don&apos;t have an account? <Link href="/register" label="Register" />
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
