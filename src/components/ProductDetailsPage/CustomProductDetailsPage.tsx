import { useEffect, useState } from "react";
import { Product } from "../../types";

export const useProductDetails = (productId:string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = localStorage.getItem("admin");
        const token = storage ? JSON.parse(storage).token : null;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/inventory/${productId}`,
          {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${errorText}`
          );
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return { product, error, loading };
};