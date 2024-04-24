import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const GlobitsSelectInput = ({
  nameValue,
  keyValue,
  options,
  size,
  variant,
  handleChange,
  ...otherProps
}) => {
  const configSelectInput = {
    ...otherProps,
    select: true,
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
    fullWidth: true,
    onChange: handleChange,
  };

  return (
    <TextField {...configSelectInput}>
      {options.map((item, pos) => {
        return (
          <MenuItem key={pos} value={item[keyValue]}>
            {item[nameValue]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default GlobitsSelectInput;
