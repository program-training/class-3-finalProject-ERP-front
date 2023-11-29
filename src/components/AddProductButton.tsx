import Button from "@mui/material/Button";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddProductButton = () => {
  const navigate = useNavigate();
  return (
    <Button
    sx={{height: "48px"}}
      variant="outlined"
      color="error"
      startIcon={<MdAdd />}
      onClick={() => {
        navigate("/AddProduct");
      }}
    >
      Add Product
    </Button>
  );
};

export default AddProductButton;
