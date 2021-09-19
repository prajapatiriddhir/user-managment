import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../../store/action";

const initialValues = {
  username: "",
  email: "",
  name: "",
  address: "",
  website: "",
  company: "",
  phone: "",
};

export function UserCreateDialog({ ...props }) {
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    onSubmit: (data) => {
      dispatch(
        addUserAction({
          ...data,
          id: String(Math.round(Math.random() * 100000000)),
        })
      );
      resetForm(initialValues);
      props.onClose();
    },
  });
  return (
    <Dialog {...props} fullWidth>
      <DialogTitle style={{ fontWeight: "bold" }}>Add new user</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={values.username}
            name="username"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Email"
            value={values.email}
            name="email"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Name"
            value={values.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Address"
            value={values.address}
            name="address"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Website"
            value={values.website}
            name="website"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Phone"
            value={values.phone}
            name="phone"
            type="number"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Company"
            value={values.company}
            name="company"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              disableRipple
              type="submit"
            >
              Add
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
