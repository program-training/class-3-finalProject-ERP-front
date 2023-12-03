import { useEffect, useState } from "react";
import { Product } from "../../types";
import axios from "axios";

export const useProductDetails = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const headers = {
        Authorization: token,
      };
      
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/inventory/${productId}`, {
          headers,
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(
              `HTTP error! Status: ${response.status}, Error: ${response.data}`
            );
          }
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [productId]);

  return { product, error, loading };
};
