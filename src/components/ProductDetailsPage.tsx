import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import { Box, Button, Container, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteDialog from "./products/ModalDeleteProduct";
import { useNavigate } from "react-router-dom";

const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = localStorage.getItem("admin");
        const token = storage ? JSON.parse(storage).token : null;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/inventory/${productId}`,
          {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${errorText}`
          );
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId?: string) => {
    navigate(`/product/${productId}`);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

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

export default ProductDetailsPage;