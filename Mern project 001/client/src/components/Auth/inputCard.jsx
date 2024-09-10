import React from "react";
import { Grid, TextField } from "@mui/material";

const FormCard = ({ name, label, type, value, change, autoFocus, half }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        autoFocus={autoFocus}
        type={type}
        required
        fullWidth
        value={value}
        onChange={change}
      />
    </Grid>
  );
};

export default FormCard;
