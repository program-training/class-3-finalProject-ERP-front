import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface ProductListProps {
  products: Array<Product>;
  onDelete: (productId: string) => void;
  onEdit: (productId: string) => void;
  setStateProducts: React.Dispatch<React.SetStateAction<any[] | null>>;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  setStateProducts,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {products.map((product) => (
        <ProductCard
          products={products}
          key={product._id}
          product={product}
          onEdit={onEdit}
          setProducts={setStateProducts}
        />
      ))}
    </div>
  );
};

export default ProductList;
