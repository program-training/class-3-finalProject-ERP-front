import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const AddProductButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => {
        console.log("add product");
      }}
    >
      Add Product
    </Button>
  );
};

export default AddProductButton;