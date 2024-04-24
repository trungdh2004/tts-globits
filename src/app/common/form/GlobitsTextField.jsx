import React from "react";
import { TextField } from "@material-ui/core";

const GlobitsTextField = ({ name, variant, size, onChange, ...otherProps }) => {
  const configTextfield = {
    onChange,
    fullWidth: true,
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
    ...otherProps,
  };

  return <TextField {...configTextfield} />;
};

export default GlobitsTextField;
