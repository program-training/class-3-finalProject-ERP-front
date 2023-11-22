import React from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Array<{
    _id: string;
    name: string;
    salePrice: number;
    quantity: number;
    description: string;
    category: string;
    discountPercentage: number;
    image: {
      url: string;
      alt: string;
    };
  }>;
  onDelete: (productId: string) => void;
  onEdit: (productId: string) => void;

}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onEdit}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap"}}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ProductList;
