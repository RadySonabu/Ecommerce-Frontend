import React from "react";

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return <p className="text-sm text-red-500">{message}</p>;
};

export default ErrorMessage;
