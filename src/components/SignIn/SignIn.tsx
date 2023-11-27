import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import {useSignIn} from "./UseSignIn"

const defaultTheme = createTheme();

export default function SignIn() {
  const { error, waiting, signIn } = useSignIn();

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("userName")?.toString()
    const password = data.get("password")?.toString()
    signIn(userName, password);
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
          </Box>
          <div>
            {error ? (
              <p>{error}</p>
            ) : (
              waiting && <img id="await" src="../../public/await.gif" alt="Loading" />
            )}
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
