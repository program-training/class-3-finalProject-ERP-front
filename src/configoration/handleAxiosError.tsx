import axios, { AxiosError } from "axios";



export const handleAxiosError = (error: (AxiosError | Error)) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        if (error.response.data === "user is not found") {
          return ("user is not found");
        } else if (error.response.data === "The password is incorrect!") {
          return ("The password is incorrect!");
        }
      } else {
        return ("Network error");
      }
    } else {
      return (error.message );
    }
  
  };