import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { grey } from "@material-ui/core/colors";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import {
  TextField,
  makeStyles,
  Button,
  createMuiTheme,
  MuiThemeProvider,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";

import "../../sass/admin.scss";
import { useFirebase } from "../../firebase/FirebaseContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33bfff",
      main: "#1877f2",
      dark: "#007bb2",
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& .MuiFormLabel-root": {
      fontWeight: "500",
      opacity: "0.7",
    },
    "& .MuiInputBase-root": {
      borderRadius: "10px",

      "& .MuiOutlinedInput-notchedOutline": {
        border: (props) =>
          props.errors.email || props.errors.password || props.authError
            ? "1px solid red"
            : "1px solid #dddfe2",
      },
    },
  },
  textField_root: {
    width: (props) => (props.mathwindow ? "230px" : "330px"),
  },
  text: {
    fontWeight: "600",
    textTransform: "none",
    borderRadius: "10px",
    fontSize: "20px",
  },
  loader_root: { width: "30px", height: "30px" },
});

const SignIn = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email format")
      .required("This field is required"),
    password: yup.string().required("This field is required"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const firebase = useFirebase();

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState();

  const smallWindows = useMediaQuery("(max-width: 770px)");
  const classes = useStyles({
    mathWindow: smallWindows,
    errors: errors,
    authError: authError,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await firebase.login(data.email, data.password);
    if (!res.success) {
      setLoading(false);
      setAuthError({ message: res.message });
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className="admin-container">
        <form onSubmit={handleSubmit(onSubmit)} className="admin__form">
          <div className="form-group">
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              inputRef={register}
              onChange={() =>
                authError && authError !== "" ? setAuthError({}) : ""
              }
              className={classes.root}
              error={errors.username || authError ? true : false}
              helperText={errors.username?.message || authError?.message}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <TextField
              className={`${classes.root} ${classes.textField_root}`}
              inputRef={register}
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              onChange={() =>
                authError && authError !== "" ? setAuthError({}) : ""
              }
              error={errors.password || authError ? true : false}
              helperText={errors.password?.message || authError?.message}
              autoComplete="new-password"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={`${classes.root} ${classes.text}`}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                style={{
                  color: grey[50],
                  width: "30px",
                  height: "30px",
                  padding: "5px 5px",
                }}
                className={`${classes.loader_root}`}
              />
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </div>
    </MuiThemeProvider>
  );
};

export default SignIn;
