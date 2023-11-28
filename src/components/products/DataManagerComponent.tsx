import { ChangeEvent, useState, useEffect } from "react";
import ProductList from "./ProductList";
import SearchFiled from "../SearchBox";
import { useNavigate } from "react-router-dom";
import { MessageError } from "../ErrorsManage/MessageError";
import useDataManager from "./useDataManager";

export const DataManagerComponent = () => {
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

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isAtBottom) {
        console.log("Reached the bottom of the page");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

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
