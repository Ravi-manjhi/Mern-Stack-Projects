import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { logOutReducer } from "../../reducer/authReducer";
import Style from "./style";

function NavBar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const style = Style();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logOutReducer());
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch, location, user?.token]);

  const logout = () => {
    dispatch(logOutReducer());
    navigate("/auth");
    setUser(null);
  };

  return (
    <AppBar className={style.appBar} position="static" color="inherit">
      <div className={style.brandContainer}>
        <Typography
          className={style.heading}
          component={Link}
          to="/"
          variant="h2"
          align="center"
        >
          Instavers
        </Typography>
        <img
          className={style.image}
          src={require("../../Images/logo.png")}
          alt="Instaverse"
          width="100%"
        />
      </div>
      <Toolbar className={style.Toolbar}>
        {user ? (
          <div className={style.profile}>
            <Avatar
              className={style.purple}
              alt={user.result.name}
              src={user.result.img}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={style.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={style.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to="/Auth"
              variant="contained"
              className={style.login}
              color="primary"
            >
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
