import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { Add } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import { selectUsers } from "../../store/selector";
import { updateUserAction } from "../../store/action";
import { UserCreateDialog } from "../../components/users";

async function fetchUser() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (err) {
    return [];
  }
}

function sortUsers(users, sort) {
  if (!sort) {
    return users;
  }
  if (sort === "name") {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }
  return users.sort((a, b) => b.name.localeCompare(a.name));
}

export function HomePage() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sort, setSort] = useState("");
  const users = useSelector(selectUsers);
  const sortedUsers = useMemo(() => sortUsers(users, sort), [sort, users]);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(updateUserAction(await fetchUser()));
    })();
  }, []);

  const openCreateModal = () => {
    setOpen(true);
  };

  const handleSort = (key) => {
    setSort(key);
    handleMenuClose();
  };

  return (
    <Container>
      <Box display="flex" flex={1} flexDirection="column" paddingY={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          <Typography fontWeight="bold" variant="h5">
            User Management
          </Typography>
          <Box>
            <Button
              onClick={openCreateModal}
              variant="contained"
              color="primary"
              disableElevation
              disableRipple
              style={{ marginRight: 8 }}
              onClick={handleClick}
            >
              Sort
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleSort("name")}>A-Z (name)</MenuItem>
              <MenuItem onClick={() => handleSort("-name")}>
                Z-A (name)
              </MenuItem>
            </Menu>
            <Button
              startIcon={<Add />}
              onClick={openCreateModal}
              variant="contained"
              color="primary"
              disableElevation
              disableRipple
            >
              Create
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {sortedUsers.map((user) => (
            <Grid item xs={12} md={3} key={user.id}>
              <Box padding={2} border="1px solid gray" borderRadius={1}>
                <Typography fontWeight="bold" variant="body1">
                  {user.name}
                </Typography>
                <Typography>{user.email}</Typography>
                <Typography>{user.phone}</Typography>
                <Typography>{user.website}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <UserCreateDialog open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
