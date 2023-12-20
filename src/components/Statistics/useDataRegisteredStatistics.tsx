import { useState, useEffect } from "react";
import { DataRegisteredStatistics } from "../../types";
import { useQuery } from "@apollo/client";
import { registerDAtaQuery, subscriptionToRegister } from "./client";

const useDataRegisteredStatistics = (_dateStart: string, _dateEnd: string) => {
  const [dataArray, setDataArray] = useState< DataRegisteredStatistics[] | null>(null);
  const { data, subscribeToMore } = useQuery(registerDAtaQuery);
    // setDataArray(data)
    // const aa = data.graf
  useEffect(() => {
    setDataArray(data?.registerData)
    const unsubscribe = subscribeToMore({
      document: subscriptionToRegister,
      updateQuery: (_prev, { subscriptionData }) => {
        console.log(subscriptionData.data.subscriptionData);
        setDataArray(subscriptionData.data.subscriptionData)
      }
    });
    return () => unsubscribe();
  }, [subscribeToMore, dataArray, data]);


  return {
    dataArray,
  };
};

export default useDataRegisteredStatistics;
