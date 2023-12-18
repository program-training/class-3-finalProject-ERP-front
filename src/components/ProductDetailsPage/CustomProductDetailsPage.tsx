import { useEffect, useState } from "react";
import { Product } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";

export const useProductDetails = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = localStorage.getItem("admin");
    const token = storage ? JSON.parse(storage).token : null;
    const query = `
    query {
      getProductById(id: "${productId}") {
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
    }`;
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
        setProduct(response.data.data.getProductById);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productId]);

  return { product, error, loading };
};
