import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { SearchFieldProps } from "../types";
import { MdSearch } from "react-icons/md";

const SearchField: React.FC<SearchFieldProps> = ({ onChange }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search products..."
      onChange={onChange}
      InputProps={{
        style: {
          height: "48px",
          padding: "0 14px",
        },
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
