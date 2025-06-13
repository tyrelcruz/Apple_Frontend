import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/UserService";
import "../../styles/UsersPage.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    address: "",
    type: "editor",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const userType = localStorage.getItem("type");
    if (userType !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData.data);
    } catch (err) {
      setError("Failed to load users");
    }
  };

  const handleAddUser = () => {
    setOpen(true);
    setEditing(false);
    setCurrentUser({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      contactNumber: "",
      email: "",
      username: "",
      password: "",
      address: "",
      type: "editor",
    });
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setCurrentUser(userToEdit);
    setOpen(true);
    setEditing(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateUser(currentUser.id, currentUser);
      } else {
        await createUser(currentUser);
      }
      loadUsers();
      setOpen(false);
    } catch (err) {
      setError("Error saving user");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(deleteUserId);
      setDeleteDialogOpen(false);
      setDeleteUserId(null);
      loadUsers();
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <div
      className="users-container"
      style={{
        fontFamily: "SF Pro Display, Helvetica Neue, Arial, sans-serif",
        minHeight: "100vh",
        padding: 24,
        position: "relative",
      }}
    >
      <TableContainer
        component={Paper}
        className="users-table-container"
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(44,62,80,0.08)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              style={{
                background: "linear-gradient(90deg, #f5f6fa 0%, #e9ecef 100%)",
              }}
            >
              <TableCell style={{ fontWeight: 600, color: "#222" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: 600, color: "#222" }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: 600, color: "#222" }}>
                Role
              </TableCell>
              <TableCell style={{ fontWeight: 600, color: "#222" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                hover
                style={{ transition: "background 0.2s", cursor: "pointer" }}
              >
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setCurrentUser({ ...user, password: "" });
                      setEditing(true);
                      setOpen(true);
                    }}
                    sx={{ minWidth: 0, px: 1, fontSize: 13, mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => {
                      setDeleteUserId(user._id);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{ minWidth: 0, px: 1, fontSize: 13 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Floating Add User Button */}
      <Button
        onClick={handleAddUser}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          background: "linear-gradient(90deg, #4cd964 0%, #5ac8fa 100%)",
          color: "#fff",
          borderRadius: "50%",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(44,62,80,0.18)",
          width: 56,
          height: 56,
          minWidth: 0,
          zIndex: 1000,
          fontSize: 28,
          padding: 0,
        }}
        aria-label="Add User"
      >
        +
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "90vw",
            maxWidth: 360,
            p: 2,
            bgcolor: "#f9f9f9",
            borderRadius: 5,
            boxShadow: 24,
            mx: "auto",
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#222",
              letterSpacing: 1,
              fontSize: 20,
            }}
          >
            {editing ? "Edit User" : "Add User"}
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 1, fontSize: 14 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSaveUser} style={{ width: "100%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={currentUser.firstName}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      firstName: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={currentUser.lastName}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, lastName: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Age"
                  value={currentUser.age}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, age: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  value={currentUser.gender}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, gender: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Number"
                  value={currentUser.contactNumber}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      contactNumber: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  value={currentUser.username}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, username: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  type="password"
                  value={currentUser.password}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, password: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  value={currentUser.address}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, address: e.target.value })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  InputProps={{ style: { borderRadius: 6, fontSize: 14 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    value={currentUser.type}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, type: e.target.value })
                    }
                    sx={{ borderRadius: 2, background: "#fff", fontSize: 14 }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="editor">Editor</MenuItem>
                    <MenuItem value="viewer">Viewer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    mt: 1,
                    background:
                      "linear-gradient(90deg, #4cd964 0%, #5ac8fa 100%)",
                    color: "#fff",
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
                    textTransform: "none",
                    fontSize: 15,
                    py: 1.2,
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #5ac8fa 0%, #4cd964 100%)",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
