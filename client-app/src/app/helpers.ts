import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string | undefined => {
  if ("status" in error) {
    return "error" in error ? error.error : JSON.stringify(error.data);
  }
  return error.message;
};

export default getErrorMessage;
