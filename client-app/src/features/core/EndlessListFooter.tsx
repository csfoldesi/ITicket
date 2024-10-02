import { Box, CircularProgress } from "@mui/material";

interface Prop {
  hasMorePages: boolean | undefined;
}

const EndlessListFooter = ({ hasMorePages }: Prop) => {
  return (
    <>
      {hasMorePages && (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", padding: "10px" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default EndlessListFooter;
