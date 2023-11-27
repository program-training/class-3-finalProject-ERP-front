// YourDataManagerComponent.js
import React, { ChangeEvent, useState } from "react";
import ProductList from "./ProductList";
import SearchFiled from "../SearchBox";
import { useNavigate } from "react-router-dom";
import { MessageError } from "../ErrorsManage/MessageError";
import useDataManager from "./useDataManager";

const YourDataManagerComponent: React.FC = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useDataManager();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleDelete = (productId: string) => {
    console.log(`delete: ${productId}`);
  };

  const handleEdit = (productId: string) => {
    navigate(`/AddProduct/${productId}`);
  };

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!products) {
    return <MessageError />;
  }

  return (
    <>
      <SearchFiled
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        setStateProducts={setProducts}
      />
    </>
  );
};

export default YourDataManagerComponent;
