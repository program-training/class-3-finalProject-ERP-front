import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <h2>Product Details</h2>
      <p>Product ID: {productId}</p>
    </div>
  );
};

export default ProductDetailsPage;
