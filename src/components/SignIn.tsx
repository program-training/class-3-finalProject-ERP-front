import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../Context/AuthContext";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";

const defaultTheme = createTheme();

export default function SignIn() {
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);

  const authContext = React.useContext(AuthContext);
  const setIsAuthenticated = authContext?.setIsAuthenticated;
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setWaiting(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      user_name: data.get("userName"),
      password: data.get("password"),
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    fetch(`${import.meta.env.VITE_BASE_URL}/users/logIn`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then(async (res) => {
        setWaiting(false);
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
          userName: data.get("userName") as string,
          token: resolve,
        };
        localStorage.setItem("admin", JSON.stringify(admin)),
          setIsAuthenticated && setIsAuthenticated(admin);
        navigate("/products");
      })
      .catch((error) => {
        if (
          error.message === "HTTP error! Status: 500, Error: user is not found"
        ) {
          setError("user is not found");
        } else if (
          error.message ===
          "HTTP error! Status: 500, Error: The password is incorrect!"
        ) {
          setError("The password is incorrect!");
        } else if (error.message === "Failed to fetch") {
          setError("Network error");
        } else {
          setError(error.message);
        }
      });
  };

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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <p>{error}</p>}
          </Box>
          {waiting && <img id="await" src="../public/await.gif"></img>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
