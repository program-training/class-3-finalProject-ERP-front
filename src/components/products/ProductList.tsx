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
  setStateProducts: React.Dispatch<React.SetStateAction<any[] | null>>


}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, setStateProducts}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap"}}>
      {products.map((product) => (
        <ProductCard products={products} key={product._id} product={product} onEdit={onEdit} setProducts={setStateProducts}/>
      ))}
    </div>
  );
};

export default ProductList;
