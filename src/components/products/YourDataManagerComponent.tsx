import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";

const YourDataManagerComponent: React.FC = () => {
  const [products, setProducts] = useState<Array<any> | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = localStorage.getItem("admin");
        const token = storage ? JSON.parse(storage).token : null;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/inventory`, {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${errorText}`
          );
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (productId: string) => {
    console.log(`delete: ${productId}`);
  };

  const handleEdit = (productId: string) => {
    console.log(`edit: ${productId}`);
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <ProductList
      products={products}
      onDelete={handleDelete}
      onEdit={handleEdit}
      setStateProducts={setProducts}
    />
  );
};

export default YourDataManagerComponent;
