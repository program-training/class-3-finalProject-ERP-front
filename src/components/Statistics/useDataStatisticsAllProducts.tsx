import axios from "axios";
import { useState, useEffect } from "react";
import { ProductData } from "../../types";
import { useQuery, gql } from '@apollo/client';
import { query, subscription } from "./client";


const useDataStatisticsAllProducts = () => {
  const [dataArray, setDataArray] = useState<ProductData[] | null>(null);
  const { data, subscribeToMore } = useQuery(query);
    // setDataArray(data)
    // const aa = data.graf
  useEffect(() => {
    setDataArray(data?.graf)
    const unsubscribe = subscribeToMore({
      document: subscription,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        setDataArray(data.graf)
        if (!subscriptionData.data) return prev;
        const newQuantity = subscriptionData.data.graf.quantity;
        return {
          graf: {
            ...prev.graf,
            quantity: newQuantity,
          },
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, data]);

  // useEffect(() => {
  //   const storage = localStorage.getItem("admin");
  //   const token = storage ? JSON.parse(storage).token : null;
  //   let data = JSON.stringify({
  //     query: `query Graf {
  //           graf {
  //             product_name
  //             quantity
  //             time {
  //               time
  //               quantity  
  //             }
  //           }
  //         }`,
  //   });
  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: `${import.meta.env.VITE_BASE_URL}`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //     data: data,
  //   };
  //   axios
  //     .request(config)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         throw new Error(
  //           `HTTP error! Status: ${response.status}, Error: ${response.data}`
  //         );
  //       }
  //       const data = response;
  //       // console.log(data.data.data.graf);
        
  //       setDataArray(data.data.data.graf)
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return {
    dataArray,data
  };
};

export default useDataStatisticsAllProducts;
