import axios, { AxiosError } from "axios";

export const registerUser = async (
  userName: string,
  password: string,
  setWaiting: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsAuthenticated?: (admin: { userName: string; token: string }) => void,
  navigate?: (path: string) => void
) => {
  setWaiting(true);
  setError("");

  const myHeaders = {
    "Content-Type": "application/json",
  };

  const data = {
    user_name: userName,
    password: password,
  };

  axios
    .post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, data, {
      headers: myHeaders,
    })
    .then((response) => {
      setWaiting(false);

      if (!response.data.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}, Error: ${response.data}`
        );
      }

      const admin = {
        userName,
        token: response.data.token,
      };

      localStorage.setItem("admin", JSON.stringify(admin));
      setIsAuthenticated && setIsAuthenticated(admin);
      navigate?.("/erp/products");
    })
    .catch((error: AxiosError) => {
      if (axios.isAxiosError(error)) {
        if (error.message === "Failed to fetch") {
          setError("network error");
        }
        if (error.message === "Request failed with status code 500") {
          setError("user is Already exists");
        } else {
          console.log("error", error);
          setError(error.message);
        }
      }
      setWaiting(false);
    });
};
