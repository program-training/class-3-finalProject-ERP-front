import React from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useProductDetails } from "./CustomProductDetailsPage";
import { MessageError } from "../ErrorsManage/MessageError";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { product, loading, error } = useProductDetails(productId);
  const [openDeleteDialog, setOpenDeleteDialog] =
    React.useState<boolean>(false);

  const handleEdit = (productId?: string) => {
    navigate(`/erp/product/${productId}`);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  if (loading) {
    return <MessageError />;
  }

  if (error && error instanceof Error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <Toolbar>
        <Box sx={{ width: "50%" }}>
          <img
            src={product?.image.large}
            alt={product?.image.alt}
            style={{ maxWidth: "100%" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h1" component="div">
            {product?.name}
          </Typography>
          <Typography color="text.secondary">{`Price: ${product?.salePrice} | Quantity: ${product?.quantity}`}</Typography>
          <Typography color="text.secondary">{`Category: ${product?.category}`}</Typography>
          <Typography color="text.secondary">{`Discount: ${product?.discountPercentage}%`}</Typography>
          <hr />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: "100px" }}
          >
            {product?.description}
          </Typography>
          <Container>
            <Button onClick={() => handleEdit(product?._id)}>Edit</Button>
            <Button onClick={() => handleDelete()}>Delete</Button>
          </Container>
        </Box>
      </Toolbar>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        id={productId}
      />
    </div>
  );
};
