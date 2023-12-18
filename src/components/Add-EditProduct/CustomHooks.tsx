import { useEffect, useState } from "react";
import { Product } from "../../types";
import axios from "axios";
export const useEditOrAdd = (params: string | undefined) => {
  const [isEdit, setIsEdit] = useState<Product | null>(null);
  const [isAdd, setAdd] = useState<boolean>(false);

  useEffect(() => {
    if (params) {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");
      const query = `
      query {
        getProductById(id: "${params}") {
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
            }}}`;
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
          if (response.data.errors) {
            throw new Error(response.data.errors[0].message);
          }
          console.log(response);
          
          setIsEdit(response.data.data.getProductById);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setAdd(true);
    }
  }, []);
  return { isAdd, isEdit };
};