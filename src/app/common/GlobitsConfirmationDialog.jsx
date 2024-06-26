import React from "react";
import { Dialog, Button, DialogActions } from "@material-ui/core";

export default function GlobitsConfirmationDialog(props) {
  const { open, onConfirmDialogClose, text, title, agree, cancel, onYesClick } =
    props;
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div className="pt-24 px-20 pb-8">
        <h4 className="capitalize">{title}</h4>
        <p>{text}</p>
        <DialogActions>
          <div className="flex flex-space-between flex-middle">
            <Button
              variant="contained"
              className="mr-12 btn btn-secondary"
              onClick={onConfirmDialogClose}
            >
              {cancel}
            </Button>
            <Button
              className="btn btn-primary"
              variant="contained"
              color="secondary"
              onClick={onYesClick}
            >
              {agree}
            </Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
}
