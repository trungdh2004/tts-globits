import React from "react";
import { TextField } from "@material-ui/core";

const GlobitsTextField = ({ name, variant, size, ...otherProps }) => {
  const configTextfield = {
    ...otherProps,
    fullWidth: true,
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
  };

  return <TextField {...configTextfield} />;
};

export default GlobitsTextField;
