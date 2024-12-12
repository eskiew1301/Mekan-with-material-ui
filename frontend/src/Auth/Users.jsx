import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import UserActions from "./UserActions";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleView = (id) => {
    console.log("View user detail:", id);
    // Implement navigation or detail view logic here
  };

  const handleEdit = (id) => {
    console.log("Edit user:", id);
    // Implement edit user logic here (e.g., navigate to an edit form)
  };

  const handleDelete = async (id) => {
    console.log("Delete user:", id);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}users`
        );
        console.log("Fetched users:", response.data);

        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error("Response data is not an array", response.data);
          setError("Invalid data format received from server.");
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "Full Name",
      width: 150,
      editable: false,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "password",
      headerName: "Password",
      type: "password",
      width: 200,
      editable: false,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      renderCell: (params) => (
        <UserActions
          params={params}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button
        LinkComponent={Link}
        to="/users/signup"
        variant="contained"
        sx={{margin:2}}
      >
        Add User
      </Button>
      <DataGrid
        rows={users.map((user, index) => ({
          id: user._id || index, // Fallback to index if ID is not present
          userName: user.name,
          email: user.email,
          password: user.password,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Users;
