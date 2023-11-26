import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { useEditOrAdd } from "../CustomHooks";
import { useFetch } from "../CustomHooks";

export default function AddProduct() {
  const params = useParams();

  const { isAdd, isEdit } = useEditOrAdd(params.id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Product>();
  

  const [messageError, setMessageError] = useState<string | null>();
  const onSubmit: SubmitHandler<Product> = (data) => {
  const [messageError] = useFetch(params.id, data);
  setMessageError(messageError)
  };
  if (isAdd || isEdit) {
    return (
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                marginTop: 7,
                display: "flex",
                flexDirection: "column",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ display: "flex" }}>
              <TextField
                label="name"
                id="1"
                sx={{ m: 1, width: "30ch" }}
                defaultValue={isEdit?.name}
                {...register("name")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                label="description"
                id="2"
                sx={{ m: 1, width: "30ch" }}
                defaultValue={isEdit?.description}
                {...register("description")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                label="category"
                id="3"
                sx={{ m: 1, width: "30ch" }}
                defaultValue={isEdit?.category}
                {...register("category")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                label="salePrice"
                id="4"
                sx={{ m: 1, width: "30ch" }}
                defaultValue={isEdit?.salePrice}
                {...register("salePrice")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                label="quantity"
                id="5"
                sx={{ m: 1, width: "30ch" }}
                defaultValue={isEdit?.quantity}
                {...register("quantity")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                label="discountPercentage"
                id="6"
                sx={{ m: 1, width: "30ch" }}
                defaultValue={isEdit?.discountPercentage}
                {...register("discountPercentage")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", marginTop: 3 }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  image large
                </InputLabel>
                <OutlinedInput
                  id="7"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  label="image large"
                  defaultValue={isEdit?.image.large}
                  {...register("image.large")}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  image medium
                </InputLabel>
                <OutlinedInput
                  id="8"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  label="image medium"
                  defaultValue={isEdit?.image.medium}
                  {...register("image.medium")}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  image small
                </InputLabel>
                <OutlinedInput
                  id="9"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  label="image small"
                  defaultValue={isEdit?.image.small}
                  {...register("image.small")}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  image alt
                </InputLabel>
                <OutlinedInput
                  id="10"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  label="image alt"
                  defaultValue={isEdit?.image.alt}
                  {...register("image.alt")}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        <div>{messageError}</div>
        <input type="submit" />
      </form>
    );
  }
}
