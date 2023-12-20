import { useEffect, useState } from "react";
import { Product } from "../../types";
import axios from "axios";

const useAllProductsDataManager = () => {
  const [allProducts, setAllProducts] = useState<Array<Product> | null>(null);

  useEffect(() => {
    const storage = localStorage.getItem("admin");
    const token = storage ? JSON.parse(storage).token : null;
    const query = `
    query AllProducts {
      allProducts {
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
      maxBodyLength: 100000000,
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
        const data = response.data.data.allProducts;
        setAllProducts(data);
        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return {
    allProducts,
    setAllProducts,
  };
};

export default useAllProductsDataManager;
