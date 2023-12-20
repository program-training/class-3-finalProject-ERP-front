import { useState, useEffect } from "react";
import { ProductData } from "../../types";
import { useQuery } from '@apollo/client';
import { query, subscription } from "./client";


const useDataStatisticsAllProducts = () => {
  const [dataArray, setDataArray] = useState<ProductData[] | null | any>(null);
  const { data, subscribeToMore } = useQuery(query);
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: subscription,
      updateQuery: (_prev, { subscriptionData }) => {
        console.log(subscriptionData.data.graf);
        setDataArray(subscriptionData.data.graf)
        },
    });
    return () => unsubscribe();
  }, [subscribeToMore, data,dataArray]);

  useEffect(() => {
    console.log(data?.graf);
    setDataArray(data?.graf)
  }, [data]);

  return {
    dataArray
  };
};

export default useDataStatisticsAllProducts;
