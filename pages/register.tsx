import ErrorMessage from "@/compomemts/Form/ErrorMessage";
import Input from "@/compomemts/Form/Input";
import Link from "@/compomemts/Link";
import { apiHandler } from "@/utils/apiHandler";
import { useRegister } from "@/utils/hooks/useRegister";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  gcash_number: string;
  address: string;
  password: string;
}
const RegisterPage = () => {
  const { handleSubmit, register } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const reg = useRegister();
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const res = await apiHandler(reg.mutateAsync(data));

    if (res.type === "error") {
      if (res.error.detail) {
        setErrorMessage(res.error.detail);
      } else {
        setErrorMessage("An Error has occured");
      }
    }

    setIsSubmitting(false);

	if(res.type === 'success'){
		router.push('/login')
	}
  };
  return (
    <div className="flex justify-center pt-20">
      <div className="px-8 py-6 border shadow-sm  max-w-[90vw] space-y-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <h1 className="mb-8 text-2xl font-bold">Register</h1>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-1">
              <Input
                label="First name"
                type="text"
                {...register("first_name", { required: true })}
              />
              <Input label="Last name" type="text" {...register("last_name", { required: true })} />
            </div>
            <Input label="Email" type="email" {...register("email", { required: true })} />
            <Input label="Password" type="password" {...register("password", { required: true })} />
            <Input label="Address" type="text" {...register("address", { required: true })} />
            <Input
              label="Gcash No."
              type="text"
              {...register("gcash_number", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="relative flex justify-center py-2 mt-8 font-medium text-white bg-green-400 rounded-sm"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <FiLoader size="1rem" className="absolute inset-0 w-4 m-auto animate-spin" />
            )}
            <span className={`${isSubmitting && "invisible"}`}>Register</span>
          </button>
        </form>
        <p className="text-sm">
          Already have an account? <Link href="/login" label="Login" />
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
