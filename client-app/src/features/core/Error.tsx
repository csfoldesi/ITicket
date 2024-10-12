import { Alert } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import getErrorMessage from "../../app/helpers";

interface Props {
  error: FetchBaseQueryError | SerializedError;
}

const Error = ({ error }: Props) => {
  return (
    <Alert variant="filled" severity="error">
      {getErrorMessage(error)}
    </Alert>
  );
};

export default Error;
