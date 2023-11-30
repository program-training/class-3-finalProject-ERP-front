import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface ProductTableProps {
  products: Product[] | null;
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [deleteProductId, setDeleteProductId] = React.useState<string | null>(
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const navigate = useNavigate();

  const handleEdit = (productId: string) => {
    navigate(`/AddProduct/${productId}`);
  };

  const handleDelete = (id: string) => {
    setDeleteProductId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Delete product with ID: ${deleteProductId}`);
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setDeleteProductId(null);
    setOpenDeleteDialog(false);
  };

  const handleIncreaseQuantity = (productId: string) => {
    // פונקציה להגדיל את הכמות
    console.log(`+: ${productId}`);
  };

  const handleDecreaseQuantity = (productId: string) => {
    // פונקציה להוריד את הכמות
    console.log(`-: ${productId}`);
  };

  const columns: GridColDef[] = [
    {
      field: "image.small",
      headerName: "Image",
      width: 100,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Link to={`/erp/product/${params.row.id}`}>
          <img
            src={params.row.image.small}
            alt="Product"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        </Link>
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={(event) => {
              event.stopPropagation();
              handleIncreaseQuantity(params.id as string);
            }}
          >
            <ArrowDropUpIcon />
          </IconButton>
          {params.row.quantity}
          <IconButton
            color="primary"
            onClick={(event) => {
              event.stopPropagation();
              handleDecreaseQuantity(params.id as string);
            }}
          >
            <ArrowDropDownIcon />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "salePrice",
      headerName: "Sale Price",
      type: "number",
      width: 80,
      align: "center",
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      disableColumnMenu: true,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={(event) => {
              event.stopPropagation();
              handleEdit(params.id as string);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(params.id as string);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!products) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          height: "200px",
          alignItems: "center",
        }}
      >
        <CircularProgress id="load" />
      </Box>
    );
  }

  const transformedProducts = products.map((product) => ({
    ...product,
    id: product._id,
  }));

  return (
    <div style={{ height: "82vh", width: "100%" }}>
      <DataGrid rows={transformedProducts} columns={columns} autoPageSize />
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductTable;
