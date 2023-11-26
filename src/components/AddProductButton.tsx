import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


const AddProductButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => {
      navigate("/AddProduct")
      }}
    >
      Add Product
    </Button>
  );
};

export default AddProductButton;