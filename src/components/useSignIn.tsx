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
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "query": `mutation SignUp { logIn(user_name: \"${userName}\", password: \"${password}\") }`
      });
      console.log(import.meta.env.VITE_BASE_URL);
      
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}`,
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
      const resolve = await res.json();
      if (resolve.errors) {
        console.log(resolve);
        
        throw new Error(resolve.errors[0].message);
      }
      const admin = { userName, token: resolve.data.logIn };
      console.log(admin);
      localStorage.setItem("admin", JSON.stringify(admin));
      setIsAuthenticated && setIsAuthenticated(admin);
      navigate("/erp/products");
    } catch (error) {
      console.log(error);
      
      if (
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
