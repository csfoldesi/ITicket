import React from "react";
import { Button } from "@mui/material";

const useDialogOpenButton = (buttonTitle: string, startIcon?: React.ReactNode) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const OpenButton = () => (
    <Button variant="contained" onClick={openDialog} startIcon={startIcon} sx={{ marginRight: "1em" }}>
      {buttonTitle}
    </Button>
  );

  return { isOpen, openDialog, closeDialog, OpenButton };
};

export default useDialogOpenButton;
