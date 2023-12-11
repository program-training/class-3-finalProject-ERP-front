import Button from "@mui/material/Button";
import { MdAutoGraph } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const StatisticsAllProductsButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ height: "48px" }}
      variant="outlined"
      color="secondary"
      startIcon={<MdAutoGraph />}
      onClick={() => {
        navigate("/erp/statistics");
      }}
    >
      statistics
    </Button>
  );
};

export default StatisticsAllProductsButton;
