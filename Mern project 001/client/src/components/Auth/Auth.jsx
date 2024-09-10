import React from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useAuthContext } from "../../context/authContext";
import FormCard from "./inputCard";

import useStyle from "./style";

const Auth = () => {
  const styles = useStyle();
  const {
    isSignIn,
    setIsSignin,
    newUser,
    handleSubmit,
    handleChange,
    loginMessage,
  } = useAuthContext();

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={styles.paper} elevation={3}>
        <Avatar className={styles.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignIn ? "SignUp" : "Login"}</Typography>
        <Typography variant="p">{loginMessage}</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignIn && (
              <>
                <FormCard
                  name="fName"
                  label="First Name"
                  type="text"
                  value={newUser.fName}
                  autoFocus={true}
                  half
                  change={handleChange}
                />
                <FormCard
                  name="lName"
                  label="Last Name"
                  type="text"
                  value={newUser.lName}
                  half
                  change={handleChange}
                />
              </>
            )}
            <FormCard
              name="email"
              label="Email"
              type="email"
              value={newUser.email}
              change={handleChange}
            />
            <FormCard
              name="password"
              label="Password"
              type="password"
              value={newUser.password}
              change={handleChange}
            />
            {isSignIn && (
              <FormCard
                name="ConfirmPassword"
                label="Confirm Password"
                type="password"
                value={newUser.ConfirmPassword}
                change={handleChange}
              />
            )}

            <Grid item xm={12} sm={12}>
              <Button
                onClick={() => {
                  setIsSignin(!isSignIn);
                }}
              >
                {isSignIn
                  ? "already have account? Sign In"
                  : "Don't Have Account? Sign UP"}
              </Button>{" "}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={styles.submit}
              >
                {isSignIn ? "SignUp" : "Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
