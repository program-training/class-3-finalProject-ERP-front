import axios from "axios";
import { useState, useEffect } from "react";
import { ProductData } from "../../types";

const useDataStatisticsProductById = (productId: string | undefined) => {
  const [data, setData] = useState<ProductData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = localStorage.getItem("admin");
        const token = storage ? JSON.parse(storage).token : null;
        const headers = {
          Authorization: token,
        };

        const response = await axios.get<ProductData[]>(
          `${import.meta.env.VITE_BASE_URL}/inventory/dataGraf/${productId}`,
          {
            headers,
          }
        );
        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    data,
  };
};

export default useDataStatisticsProductById;
