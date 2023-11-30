import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios, { AxiosError } from "axios";
import { handleAxiosError } from "../../configoration/handleAxiosError";

export const useSignIn = () => {
  const [error, setError] = useState<string | undefined>("");
  const [waiting, setWaiting] = useState(false);

  const authContext = useContext(AuthContext);
  const setIsAuthenticated = authContext?.setIsAuthenticated;
  const navigate = useNavigate();

  const signIn = async (
    userName: string | undefined,
    password: string | undefined
  ) => {
    setWaiting(true);
    setError("");

    const user = { user_name: userName, password: password };
    const headers = {
      "Content-Type": "application/json",
    };
    const data = JSON.stringify(user);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/api/users/logIn`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${response.data}`
          );
        }
        const resolve = response.data;
        const admin = { userName, token: resolve };
        localStorage.setItem("admin", JSON.stringify(admin));
        setIsAuthenticated && setIsAuthenticated(admin);
        navigate("/erp/products");
      })
      .catch((error) => {
        const err = error as AxiosError;
        setError(handleAxiosError(err));
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return { error, waiting, signIn };
};
