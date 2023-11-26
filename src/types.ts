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
export interface ModalDeleteProps {
    open: boolean;
    setOpen: (arg0: boolean) => void;
    id: string | undefined;
    setStateProducts?: React.Dispatch<React.SetStateAction<any[] | null>>;
    products?: Product[];
  }


export interface FormValues {
  userName: string;
  password: string;
  confirmPassword: string;
}