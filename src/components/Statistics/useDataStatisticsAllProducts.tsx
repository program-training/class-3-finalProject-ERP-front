import axios from "axios";
import { useState, useEffect } from "react";
import { ProductData } from "../../types";

const useDataStatisticsAllProducts = () => {
  const [data, setData] = useState<ProductData[] | null>(null);

  useEffect(() => {
    const storage = localStorage.getItem("admin");
    const token = storage ? JSON.parse(storage).token : null;
    let data = JSON.stringify({
      query: `query Graf {
            graf {
              product_name
              quantity
              time {
                time
                quantity  
              }
            }
          }`,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASE_URL}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${response.data}`
          );
        }
        const data = response;
        
        setData(data.data.data.graf)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return {
    data,
  };
};

export default useDataStatisticsAllProducts;
