import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useContext } from "react";

import RegisterDialog from "../dialog/RegisterDialog";
import LoginDialog from "../dialog/LoginDialog";
import ShareVideoDialog from "../dialog/ShareVideoDialog";
import { AuthContext } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, onLogout, onLogin } = useContext(AuthContext);

  useEffect(() => {
    onLogin();
  }, []);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/">
          <img
            width="100%"
            height="64px"
            style={{ marginBottom: "-4px" }}
            src={`${process.env.PUBLIC_URL}/logo.jpg`}
            alt="featured images"
          />
        </Link>
        <Typography variant="h6" style={{ flexGrow: 1, marginLeft: "1rem" }}>
          YtSharedify
        </Typography>
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: "1rem" }}>
              Welcome {user.username}!
            </Typography>
            <ShareVideoDialog />
            <Button color="secondary" variant="outlined" onClick={onLogout}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <LoginDialog />
            <RegisterDialog />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
