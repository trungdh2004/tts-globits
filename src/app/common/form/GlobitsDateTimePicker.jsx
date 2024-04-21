import React from "react";
import { TextField } from "@material-ui/core";

const GlobitsDateTimePicker = ({
  name,
  size,
  format,
  variant,
  onChange,
  ...otherProps
}) => {
  const configDateTimePicker = {
    ...otherProps,
    type: "date",
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
    format: format ? format : "dd/MM/yyyy",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    onChange,
  };

  return <TextField {...configDateTimePicker} />;
};

export default GlobitsDateTimePicker;
