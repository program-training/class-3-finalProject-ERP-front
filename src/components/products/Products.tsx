import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchField from "../SearchField";
import useDataManager from "./useDataManager";
import { ChangeEvent, useState } from "react";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
import { MessageError } from "../ErrorsManage/MessageError";
import AddProductButton from "../AddProductButton";

export default function LabTabs() {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const { products, setProducts } = useDataManager();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEdit = (productId: string) => {
    navigate(`/AddProduct/${productId}`);
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
      </TabPanel>
      <TabPanel value="2">Item Two</TabPanel>
    </TabContext>
  );
}
