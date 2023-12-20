import { useState, useEffect } from "react";
import { DataRegisteredStatistics } from "../../types";
import { useQuery } from "@apollo/client";
import { registerDAtaQuery, subscriptionToRegister } from "./client";

const useDataRegisteredStatistics = (_dateStart: string, _dateEnd: string) => {
  const [dataArray, setDataArray] = useState< DataRegisteredStatistics[] | null>(null);
  const { data, subscribeToMore } = useQuery(registerDAtaQuery);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: subscriptionToRegister,
        updateQuery: (_prev, { subscriptionData }) => {
        console.log(subscriptionData.data.registerData);
        setDataArray(subscriptionData.data.registerData)
        },
    });
    return () => unsubscribe();
  }, [subscribeToMore, data,dataArray]);

  useEffect(() => {
    console.log(data?.registerData);
    setDataArray(data?.registerData)
  }, [data]);

  return {
    dataArray
  };
};

export default useDataRegisteredStatistics;
