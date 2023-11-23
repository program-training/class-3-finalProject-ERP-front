import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withFormik, FormikProps } from "formik";
import * as yup from "yup";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<FormikProps<FormValues>> = (props) => {
  const navigate = useNavigate();

  const authContext = React.useContext(AuthContext);
  const setIsAuthenticated = authContext?.setIsAuthenticated;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: values.email,
      password: values.password,
    });
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_name: values.email,
      password: values.password,
    });

    fetch(`${import.meta.env.VITE_BASE_URL}/users/register`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `HTTP error! Status: ${res.status}, Error: ${errorText}`
          );
        }
        return res.text();
      })
      .then((resolve) => {
        const admin = {
          userName: data.get("email") as string,
          token: resolve,
        };
        localStorage.setItem("admin", JSON.stringify(admin)),
          setIsAuthenticated && setIsAuthenticated(admin);
        navigate("/products");
      })
      .catch((error) => console.log("error", error));
  };

  const { values, touched, errors, isSubmitting, handleChange, handleBlur } =
    props;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
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
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password"),
});

export default withFormik({
  mapPropsToValues: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),
  validationSchema,
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  },
})(SignUp);
