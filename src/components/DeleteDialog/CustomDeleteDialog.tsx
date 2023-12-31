import { useState } from "react";
import { ModalDeleteProps } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_BASE_URL } from "../../env/env";

export const useFetch = (props: ModalDeleteProps) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { open, setOpen, id, setStateProducts, products } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const deleteAndClose = () => {
    const storage = localStorage.getItem("admin");
    const token = storage ? JSON.parse(storage).token : null;
    const headers = {
      authorization: token,
      "Content-Type": "application/json",
    };

    axios
      .delete(`${VITE_BASE_URL}/inventory/${id}`, {
        headers: headers,
      })
      .then((response) => {
        if (response.status !== 204) {
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${response.data}`
          );
        }
        if (products !== undefined) {
          const currentObjects = [...products];
          const updatedObjects = currentObjects.filter((obj) => obj._id !== id);
          setStateProducts && setStateProducts(updatedObjects);
        }
        handleClose();
        navigate("/erp/products");
      })
      .catch((error) => {
        console.error("error", error);
        setError("network error");
      });
  };
  return { error, open, deleteAndClose, handleClose, id };
};
