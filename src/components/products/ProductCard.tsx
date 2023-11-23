import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteDialog from "./ModalDeleteProduct";
import MessageDelete from "./MessageDelete";

interface ProductCardProps {
  onDelete: (productId: string) => void;
  onEdit: (productId: string) => void;
  setProducts: React.Dispatch<React.SetStateAction<any[] | null>>
  products:Array<{
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

  product: {
    _id: string;
    name: string;
    salePrice: number;
    quantity: number;
    description: string;
    category: string;
    discountPercentage: number;
    image: {
      large: string;
      medium: string;
      small: string;
      alt: string;
    };
  };
  
}

const ProductCard: React.FC<ProductCardProps> = ({
  
  product,
  onEdit,
  setProducts,
  products
}) => {
  const {
    _id,
    name,
    salePrice,
    quantity,
    description,
    category,
    discountPercentage,
    image,
  } = product;
    const [open, setOpen] = React.useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Card sx={{ width: "225px", margin: "20px" }}>
        <Link to={`/product/${_id}`}>
          <img src={image.medium} alt={image.alt} style={{ maxWidth: "100%" }} />
        </Link>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography color="text.secondary">{`Price: ${salePrice} | Quantity: ${quantity}`}</Typography>
          <Typography color="text.secondary">{`Category: ${category}`}</Typography>
          <Typography color="text.secondary">{`Discount: ${discountPercentage}%`}</Typography>
          <hr />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: "100px" }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => onEdit(_id)}>Edit</Button>
          <Button onClick={() => setOpen(true)}>Delete</Button>
          <DeleteDialog setStateProducts={setProducts} products={products} open={open} setOpen={setOpen} id={_id} openMessage={setOpenMessage}/>
          <MessageDelete open={openMessage} setOpen={setOpenMessage}/>
        </CardActions>
      </Card>
      <br />
    </Box>
  );
};

export default ProductCard;
