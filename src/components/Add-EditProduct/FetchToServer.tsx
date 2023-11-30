import { NavigateFunction } from "react-router-dom";
import { Product } from "../../types";
import axios from "axios";

export const FetchToServer = (
  params: string | undefined,
  data: Product,
  setWaiting: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  const storage = localStorage.getItem("admin");
  const token = storage ? JSON.parse(storage).token : null;
  setWaiting(true);
  setError("");
  const headers = {
    authorization: token,
    "Content-Type": "application/json",
  };
    axios({
      method: params ? "PUT" : "post",
      url: `${import.meta.env.VITE_BASE_URL}/api/inventory/${
        params !== undefined ? params : ""
      }`,
      headers: headers,
      data: JSON.stringify(data),
    })
      .then((response) => {
        setWaiting(false);
        if (response.status != 200) {
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${response.data}`
          );
        }
        navigate("/products");
      })
    .catch((error) => {
      console.log(error);
        setError(`HTTP error! Status: ${error.response?.status}, Error: ${error.response?.data}`);
       if (error.message === "Network Error") {
        setError("Network error");
      } else {
        console.error("error", error);
        setError(error.message);
      }
    });
  };

