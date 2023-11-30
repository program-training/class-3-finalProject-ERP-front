import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchField from "../SearchField";
import { ChangeEvent, useState } from "react";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
import { MessageError } from "../ErrorsManage/MessageError";
import AddProductButton from "../AddProductButton";
import CircularProgress from "@mui/material/CircularProgress";
import DataTable from "./ProductsColum";
import useProductsPageDataManager from "./useDataManager";
import useAllProductsDataManager from "./useAllProductsDataManager";
import { Product } from "../../types";
import { Fab } from "@mui/material";
import { RxDoubleArrowUp } from "react-icons/rx";

export const Products = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const { allProducts, setAllProducts } = useAllProductsDataManager();
  const { products, setProducts, page, showScrollButton, scrollToTop } = useProductsPageDataManager();
  const [searchTerm, setSearchTerm] = useState<string>("");


  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const filteredProducts = products
    ? products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEdit = (productId: string) => {
    navigate(`/erp/AddProduct/${productId}`);
  };

  const renderErrorMessage = () => (!products ? <MessageError /> : null);

  return (
    <TabContext value={value}>
      {renderErrorMessage()}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <SearchField
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
          <AddProductButton />
        </Box>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="card" value="1" />
          <Tab label="rows" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          setStateProducts={setProducts}
        />
        <Fab
          style={{ display: showScrollButton ? "block" : "none" }}
          onClick={scrollToTop}
          id="buttonTop"
          color="primary"
          aria-label="add"
        >
          <RxDoubleArrowUp />
        </Fab>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            height: "200px",
            alignItems: "center",
          }}
        >
          {page !== null && products ? <CircularProgress id="load" /> : null}
        </Box>
      </TabPanel>
      <TabPanel value="2">
        <DataTable products={allProducts} setProducts= {setAllProducts} />
      </TabPanel>
    </TabContext>
  );
};
