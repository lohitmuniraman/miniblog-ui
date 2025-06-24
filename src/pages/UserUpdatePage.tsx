import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUser, updateUser } from "@services/authService";
import { User } from "@type/auth";
import { useToast } from "@contexts/ToastContext";

const UserUpdatePage: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [suspendUser, setSuspendUser] = useState(false);

  const [userData, setUserData] = useState<User>({} as User);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { openToast, handleSetMessage } = useToast();

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((user) => {
          if (user) {
            setName(user.name);
            setUsername(user.username);
            setEmail(user.email);
            setUserData(user);
            setResetPassword(user.resetPassword || false);
            setSuspendUser(user.isSuspended || false);
          } else {
            navigate("/app/user-management");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          navigate("/app/user-management");
        });
    }
  }, []);

  const callUpdateUser = async () => {
    updateUser({
      userId: userId ?? "",
      name,
      username,
      email,
      isAdmin: userData.isAdmin,
      resetPassword,
      isSuspended: suspendUser
    })
      .then((response) => {
        handleSetMessage(response.message || "User updated successfully.");
        openToast();
        navigate("/app/user-management", { replace: true });
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };

  return (
    <Box>
      <div className="d-flex justify-content-between">
        <Typography variant="h4" component="h1">
          User Update Page
        </Typography>
        <div className="d-flex align-items-center">
          <IconButton
            aria-label="create-post-cancel"
            size="medium"
            sx={{ color: "#2b282b" }}
            onClick={() => navigate("/app/user-management")}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </div>
      <hr />

      <Box component="form">
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          disabled
        />
        <TextField
          label="Name"
          type="text"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Username"
          type="text"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={resetPassword}
              onChange={() => setResetPassword(!resetPassword)}
            />
          }
          label="Reset password"
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={suspendUser}
              onChange={() => setSuspendUser(!suspendUser)}
            />
          }
          label="Suspend User"
          labelPlacement="end"
        />
        <Button
          type="button"
          onClick={callUpdateUser}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UserUpdatePage;
