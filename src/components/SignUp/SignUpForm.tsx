import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../../types";
import { FormikProps } from "formik";
import { registerUser } from "./apiCalls.ts";
const defaultTheme = createTheme();


export const SignUp: React.FC<FormikProps<FormValues>> = (props) => {
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
    const [waiting, setWaiting] = React.useState(false);
    const authContext = React.useContext(AuthContext);
    const setIsAuthenticated = authContext?.setIsAuthenticated;
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { userName, password } = values;
      registerUser(
        userName,
        password,
        setWaiting,
        setError,
        setIsAuthenticated,
        navigate
      );
    };
    
    const { values, touched, errors, handleChange, handleBlur, isSubmitting } =
      props;
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="userName"
                    label="userName"
                    type="userName"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.userName ? errors.userName : ""}
                    error={touched.userName && Boolean(errors.userName)}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    helperText={
                      touched.confirmPassword ? errors.confirmPassword : ""
                    }
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || Object.keys(errors).length > 2}
              >
                Log in
              </Button>
            </Box>
            <div>
              {error
                ? error && <p>{error}</p>
                : waiting && <img id="await" src="../public/await.gif"></img>}
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    );
  };