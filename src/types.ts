export interface Product{
    category: string;
    description: string;
    discountPercentage: number;
    image: {
      alt: string;
      large: string;
      medium: string;
      small: string;
    };
    name: string;
    quantity: number;
    salePrice: number;
    _id: string;
  }