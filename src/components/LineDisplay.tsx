import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const productColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "salePrice", headerName: "Sale Price", type: "number", width: 120 },
  { field: "quantity", headerName: "Quantity", type: "number", width: 120 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "category", headerName: "Category", width: 130 },
  {
    field: "discountPercentage",
    headerName: "Discount %",
    type: "number",
    width: 140,
  },
];

const productsData = [
  {
    _id: "655bc0a76f121115900aa897",
    name: "Mobile Phone",
    salePrice: 84,
    quantity: 21,
    description: "Description for Mobile Phone",
    category: "gadgets",
    discountPercentage: 10,
  },
  {
    _id: "655bc0a96f121115900aa899",
    name: "Computer Table",
    salePrice: 25,
    quantity: 40,
    description: "Description for Computer Table",
    category: "gadgets",
    discountPercentage: 15,
  },
  {
    _id: "655bc0a96f121115900aa89b",
    name: "Laptop",
    salePrice: 79,
    quantity: 27,
    description: "Description for Laptop",
    category: "gadgets",
    discountPercentage: 16,
  },
  {
    _id: "1",
    name: "Smartwatch",
    salePrice: 120,
    quantity: 15,
    description: "Description for Smartwatch",
    category: "gadgets",
    discountPercentage: 8,
  },
  {
    _id: "2",
    name: "Bluetooth Headphones",
    salePrice: 40,
    quantity: 30,
    description: "Description for Bluetooth Headphones",
    category: "gadgets",
    discountPercentage: 12,
  },
  {
    _id: "3",
    name: "Tablet",
    salePrice: 150,
    quantity: 20,
    description: "Description for Tablet",
    category: "gadgets",
    discountPercentage: 10,
  },
  {
    _id: "4",
    name: "Smart Speaker",
    salePrice: 60,
    quantity: 25,
    description: "Description for Smart Speaker",
    category: "electronics",
    discountPercentage: 5,
  },
  {
    _id: "5",
    name: "Wireless Mouse",
    salePrice: 15,
    quantity: 50,
    description: "Description for Wireless Mouse",
    category: "computer accessories",
    discountPercentage: 18,
  },
  {
    _id: "6",
    name: "Portable Charger",
    salePrice: 30,
    quantity: 35,
    description: "Description for Portable Charger",
    category: "gadgets",
    discountPercentage: 12,
  },
  {
    _id: "7",
    name: "Gaming Mousepad",
    salePrice: 20,
    quantity: 60,
    description: "Description for Gaming Mousepad",
    category: "computer accessories",
    discountPercentage: 10,
  },
  {
    _id: "8",
    name: "Fitness Tracker",
    salePrice: 45,
    quantity: 18,
    description: "Description for Fitness Tracker",
    category: "fitness",
    discountPercentage: 15,
  },
  {
    _id: "9",
    name: "Wireless Keyboard",
    salePrice: 35,
    quantity: 28,
    description: "Description for Wireless Keyboard",
    category: "computer accessories",
    discountPercentage: 12,
  },
  {
    _id: "10",
    name: "Virtual Reality Headset",
    salePrice: 120,
    quantity: 12,
    description: "Description for Virtual Reality Headset",
    category: "electronics",
    discountPercentage: 8,
  },
  {
    _id: "11",
    name: "Bluetooth Speaker",
    salePrice: 50,
    quantity: 23,
    description: "Description for Bluetooth Speaker",
    category: "electronics",
    discountPercentage: 10,
  },
  {
    _id: "12",
    name: "Smart Thermostat",
    salePrice: 75,
    quantity: 15,
    description: "Description for Smart Thermostat",
    category: "home automation",
    discountPercentage: 12,
  },
  {
    _id: "13",
    name: "Security Camera",
    salePrice: 90,
    quantity: 10,
    description: "Description for Security Camera",
    category: "home security",
    discountPercentage: 8,
  },
  {
    _id: "14",
    name: "Coffee Maker",
    salePrice: 40,
    quantity: 25,
    description: "Description for Coffee Maker",
    category: "home appliances",
    discountPercentage: 15,
  },
  {
    _id: "15",
    name: "Power Drill",
    salePrice: 55,
    quantity: 20,
    description: "Description for Power Drill",
    category: "tools",
    discountPercentage: 10,
  },
  {
    _id: "16",
    name: "Bluetooth Earbuds",
    salePrice: 30,
    quantity: 30,
    description: "Description for Bluetooth Earbuds",
    category: "gadgets",
    discountPercentage: 18,
  },
];

const DataTable: React.FC = () => {
  const rows = productsData.map((product, index) => ({
    id: index + 1,
    ...product,
  }));

  return (
    <div style={{ height: "700", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={productColumns}
        initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 100]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
