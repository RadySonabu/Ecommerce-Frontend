import { AxiosError } from "axios";

type ErrorMessage = {
  message: string;
};

type SuccessResponse<T> = {
  data: T;
  error: undefined;
  type: "success";
};

type NetworkErrorResponse = {
  data: undefined;
  error: ErrorMessage;
  type: "network";
};

type ClientErrorResponse = {
  data: undefined;
  error: ErrorResponseData;
  type: "error";
};

type ErrorResponseData = Record<string, string>;

export const apiHandler = async <T>(
  promise: Promise<T>
): Promise<SuccessResponse<T> | NetworkErrorResponse | ClientErrorResponse> => {
  return promise
    .then((data) => ({ data, error: undefined, type: "success" as const }))
    .catch((error: AxiosError) => {
      if (error.response) {
        // The client received an error ex. (5xx, 5xx)
        return {
          data: undefined,
          error: error.response?.data,
          type: "error",
        };
      }
      // The client didn't receive a response ex. Network Error
      // OR an error outside axios happens
      return {
        data: undefined,
        error: {
          // The code could be anything you want
          // Just make sure it is understood that code is
          // meant for network errors
          message: error.message,
        },
        type: "network",
      };
    });
};
