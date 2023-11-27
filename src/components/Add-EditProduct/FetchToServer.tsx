import { NavigateFunction } from "react-router-dom";
import { Product } from "../../types";


export const FetchToServer = (
    params: string | undefined,
    data: Product,
    setWaiting: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
  ) => {
    if (params) {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");
      setWaiting(true);
      setError("");
      const raw = JSON.stringify(data);
      const fetchEdit = async () => {
        try {
          const data = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/inventory/${params}`,
            {
              method: "PUT",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            }
          );
          setWaiting(false);
          if (!data.ok) {
            const errorText = await data.text();
            throw new Error(
              `HTTP error! Status: ${data.status}, Error: ${errorText}`
            );
          }
          const result = await data.json();
          navigate("/products");
          console.log(result);
        } catch (error: unknown) {
          if (error instanceof Error) {
            if (error.message === "Failed to fetch") {
              setError("network error");
            } else {
              console.log("error", error);
              setError(error.message);
            }
          }
          setWaiting(false);
        }
      };
  
      fetchEdit();
    } else {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify(data);
      const fetchEdit = async () => {
        const data = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/inventory/`,
          {
            method: "post",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          }
        );
        const dataJ = await data.json();
        console.log(dataJ);
        fetchEdit();
      };
    }
  };