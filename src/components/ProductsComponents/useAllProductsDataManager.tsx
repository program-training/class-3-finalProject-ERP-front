import { useEffect, useState } from "react";
import { Product } from "../../types";

const useAllProductsDataManager = () => {
  const [allProducts, setAllProducts] = useState<Array<Product> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = localStorage.getItem("admin");
        const token = storage ? JSON.parse(storage).token : null;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/inventory`,
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
        setAllProducts(allProducts ? [...allProducts, ...data] : data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    allProducts,
    setAllProducts,
  };
};

export default useAllProductsDataManager;
