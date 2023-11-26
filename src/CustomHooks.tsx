import { useEffect, useState } from "react";
import { Product } from "./types";
export const useEditOrAdd = (params: string | undefined) => {
  const [isEdit, setIsProduct] = useState<Product | null>(null);
  const [isAdd, setBool] = useState<boolean>(false);
  if (params) {
    useEffect(() => {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const fetchEdit = async () => {
        const data = await fetch(
          `http://localhost:3009/api/inventory/${params}`,
          {
            method: "get",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        const dataJ = await data.json();
        console.log(dataJ);
        setIsProduct(dataJ);
      };
      fetchEdit();
    }, []);
  } else {
    useEffect(() => {
      setBool(true);
    }, []);
  }
  return { isAdd, isEdit };
};

export const useFetch = (params: string | undefined, data: Product) => {
  const [messageError, setMessageError] = useState<string | null>("gilad");
  if (params) {
    const storage = localStorage.getItem("admin");
    const token = storage ? JSON.parse(storage).token : null;
    const myHeaders = new Headers();
    myHeaders.append("authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);
    const fetchEdit = async () => {
      const data = await fetch(
        `http://localhost:3009/api/inventory/${params}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }
      );
      const dataJ = await data.json();
      console.log(dataJ)
      if (!data.ok) {
        setMessageError(dataJ);
        console.log(dataJ)
      }
    };
    fetchEdit();
  } else {
    const storage = localStorage.getItem("admin");
    const token = storage ? JSON.parse(storage).token : null;
    const myHeaders = new Headers();
    myHeaders.append("authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);
    const fetchEdit = async () => {
      const data = await fetch(`http://localhost:3009/api/inventory/`, {
        method: "post",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      });
      const dataJ = await data.json();
      console.log(dataJ)
      if (!data.ok) {
        setMessageError(dataJ);
        console.log(dataJ)
      }
      fetchEdit();
    };
  }
  return [messageError];
};
