import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../contexts/AuthContext";
import authService from "../../services/authService";

const LoginDialog: React.FC = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { onLogin } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleClose = () => {
    setOpenLoginDialog(false);
    setErrors([]);
  };

  const handleLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      authService.loginWithJwt(data.token);
      onLogin();
      handleClose();
      toast.success("User logged in successfully!");
    } else {
      setErrors(data.messages);
    }
  };

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={openLoginDialog} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
          <TextField
            style={{ backgroundColor: "white", marginBottom: "0.5rem" }}
            label="Email"
            type="email"
            variant="filled"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ backgroundColor: "white" }}
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginDialog;
