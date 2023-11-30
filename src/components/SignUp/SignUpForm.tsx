import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  
  TextField,   
  Button,    
  Container,   
  IconButton,    
  InputAdornment,
  LinearProgress,
  Box
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "./apiCalls.ts";
import { User } from "../../types.ts";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../Context/AuthContext.tsx";

const schema = yup.object().shape({
  username: yup.string().required("Required field"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required field"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required field")   
});


export default function SignUpForm() {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const [waiting, setWaiting] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const setIsAuthenticated = authContext?.setIsAuthenticated;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {  
    register,
    handleSubmit, 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
   
const onSubmit = (user:User) => {
  const { username, password } = user;
  registerUser(
    username,
    password,
    setWaiting,
    setError,
    setIsAuthenticated,
    navigate
  );
};

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
      
        <TextField
          {...register("username")}
          label="Username"
          fullWidth    
          margin="normal"
          error={!!errors.username}
          helperText={errors?.username?.message} 
        />

<TextField
      {...register("password")}
      label="Password"    
      type={showPassword ? 'text' : 'password'}
      fullWidth    
      margin="normal"
      error={!!errors.password} 
      helperText={errors?.password?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
          fullWidth  
          margin="normal" 
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}  
        />

        <Button
          variant="contained"
          color="primary"
          type="submit" 
          sx={{ width: '100%', mt: 2 }} 

        >
          Sign up
        </Button>
      </form>
      {error
            ? error && <p>{error}</p>
            : waiting && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
              )}
    </Container>
  );
}