import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface ProductListProps {
  products: Product[];
  onEdit: (productId: string) => void;
  setStateProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
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
