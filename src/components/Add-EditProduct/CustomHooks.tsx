import { useEffect, useState } from "react";
import { Product } from "../../types";
export const useEditOrAdd = (params: string | undefined) => {
  const [isEdit, setIsEdit] = useState<Product | null>(null);
  const [isAdd, setAdd] = useState<boolean>(false);

  useEffect(() => {
    if (params) {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const fetchEdit = async () => {
        const data = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/inventory/${params}`,
          {
            method: "get",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        const dataJ = await data.json();
        setIsEdit(dataJ);
      };
      fetchEdit();
    } else {
      setAdd(true);
    }
  }, []);
  return { isAdd, isEdit };
};