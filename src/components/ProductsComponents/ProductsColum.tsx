import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";

interface ProductTableProps {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  setProducts,
}) => {
  const [deleteProductId, setDeleteProductId] = React.useState<string | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleEdit = (productId: string) => {
    navigate(`/erp/AddProduct/${productId}`);
  };

  const handleDelete = (id: string) => {
    setDeleteProductId(id);
    setOpen(true);
  };

  const handleIncreaseQuantity = (productId: string) => {
    console.log(`+: ${productId}`);
  };

  const handleDecreaseQuantity = (productId: string) => {
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
      <DeleteDialog
        setStateProducts={setProducts}
        products={products}
        open={open}
        setOpen={setOpen}
        id={deleteProductId as string}
      />
    </div>
  );
};

export default ProductTable;
