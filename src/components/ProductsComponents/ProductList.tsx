import React from "react";
import ProductCard from "./ProductCard";
import { ProductListProps } from "../../types";

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  setStateProducts,
}) => {
  return (
        <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
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
