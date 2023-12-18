import { useState } from "react";
import { ModalDeleteProps } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const query = `
      mutation DeleteProduct {
      deleteProduct(id: "${id}") {
      _id
      name
      salePrice
      quantity
      description
      category
      discountPercentage
      image {
        large
        medium
        small
        alt
    }
    }
  }
`;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASE_URL}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: JSON.stringify({ query }),
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${response.data}`
          );
        }
        console.log(response.data);
        
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
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
        setError(error.message);
      });
  };
  return { error, open, deleteAndClose, handleClose, id };
};
