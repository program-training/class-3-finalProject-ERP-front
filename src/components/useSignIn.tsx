import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const useSignInForm = () => {
  const [error, setError] = useState("");
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
    try {
      const user = { user_name: userName, password:password };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(user);

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/logIn`,
        {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `HTTP error! Status: ${res.status}, Error: ${errorText}`
        );
      }

      const resolve = await res.text();
      const admin = { userName, token: resolve };
      localStorage.setItem("admin", JSON.stringify(admin));
      setIsAuthenticated && setIsAuthenticated(admin);
      navigate("/erp/products");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "HTTP error! Status: 400, Error: user is not found"
      ) {
        setError("user is not found");
      } else if (
        error instanceof Error &&
        error.message ===
          "HTTP error! Status: 400, Error: The password is incorrect!"
      ) {
        setError("The password is incorrect!");
      } else if (
        error instanceof Error &&
        error.message === "Failed to fetch"
      ) {
        setError("Network error");
      } else if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setWaiting(false);
    }
  };

  return { error, waiting, signIn };
};
