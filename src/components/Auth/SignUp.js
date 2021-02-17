import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Linkk from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "../../store/actions/authAction";
import { Route, Link, useHistory } from "react-router-dom";
import SignIn from "../Auth/SignIn";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Embedded Lab UCC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: "100%",
    marginTop: "50px",
  },
}));

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [signIn, setSignIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.refresh());
  }, []);
  const signInHandler = () => {
    setSignIn((signState) => !signState);
  };
  const submitFormHandler = async (e) => {
    try {
      e.preventDefault();
      if (username === "" || email === "" || password === "") {
        setError("all fields are required");
      }
      let dispatchSignUp = await dispatch(
        authAction.signUp(username, email, password)
      );

      setUsername("");
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("A user already exist with this particular email");
      setSuccess("");
      console.log(e);
      console.log(error);
    }
  };

  const submitSignInHandler = async (e) => {
    try {
      e.preventDefault();
      let dispatchSignUp = await dispatch(authAction.signIn(email, password));
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Wrong combination of password and email");
      setSuccess("");
      console.log(error);
    }
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {!signIn ? "Sign Up" : "Sign In"}
        </Typography>

        {error ? (
          <Alert variant="outlined" severity="info" className={classes.root}>
            {error}
          </Alert>
        ) : (
          ""
        )}

        {success ? (
          <Alert variant="outlined" severity="success" className={classes.root}>
            {success}
          </Alert>
        ) : (
          ""
        )}

        <form className={classes.form} noValidate>
          {!signIn ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  // autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
            </Grid>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={!signIn ? submitFormHandler : submitSignInHandler}
          >
            {!signIn ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Linkk variant="body2" component={Link} to="/sign-in">
                Already have an account?
              </Linkk>
              <Button onClick={signInHandler}>
                {" "}
                {!signIn ? "Sign In" : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Route path="/sign-in" component={() => <SignIn />} />
    </Container>
  );
}
