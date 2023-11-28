import { ChangeEvent} from "react";
import ProductList from "./ProductList";
import SearchFiled from "../SearchBox";
import { useNavigate } from "react-router-dom";
import { MessageError } from "../ErrorsManage/MessageError";
import useDataManager from "./useDataManager";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const DataManagerComponent = () => {
  const navigate = useNavigate();
  const {
    products,
    setProducts,
    filteredProducts,
    setSearchTerm,
    page,
  } = useDataManager();

  const handleDelete = (productId: string) => {
    console.log(`delete: ${productId}`);
  };

  const handleEdit = (productId: string) => {
    navigate(`/AddProduct/${productId}`);
  };



  if (!products) {
    return <MessageError />;
  }

  return (
    <>
      <SearchFiled
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        setStateProducts={setProducts}
      />
      {page !== null ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            height: "200px",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
    </>
  );
};
