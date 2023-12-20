import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../types";
import { useEditOrAdd } from "./CustomHooks";
import { FetchToServer } from "./FetchToServer";
import { LinearProgress, Typography } from "@mui/material";
import { useState } from "react";

export default function AddProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const { isAdd, isEdit } = useEditOrAdd(params.id);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit: SubmitHandler<Product> = (data) => {    
    FetchToServer(params.id, data, setWaiting, setError, navigate);
  };

  if (isAdd || isEdit) {
    return (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <br />
        <br />
        <br />
        <Typography variant="h3" color={"#1976d2"}>
          {isAdd ? "ADD PRODUCT" : "EDIT PRODUCT"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                id="name"
                fullWidth
                defaultValue={isEdit?.name}
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                id="description"
                fullWidth
                defaultValue={isEdit?.description}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                id="category"
                fullWidth
                defaultValue={isEdit?.category}
                {...register("category", { required: "Category is required" })}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sale Price"
                id="salePrice"
                fullWidth
                defaultValue={isEdit?.salePrice}
                {...register("salePrice", {
                  required: "Sale Price is required",
                  pattern: { value: /^[0-9]*$/, message: "Must be a number" },
                })}
                error={!!errors.salePrice}
                helperText={errors.salePrice?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                id="quantity"
                fullWidth
                defaultValue={isEdit?.quantity}
                {...register("quantity", {
                  required: "Quantity is required",
                  pattern: { value: /^[0-9]*$/, message: "Must be a number" },
                })}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount Percentage"
                id="discountPercentage"
                fullWidth
                defaultValue={isEdit?.discountPercentage}
                {...register("discountPercentage", {
                  required: "Discount Percentage is required",
                  pattern: { value: /^[0-9]*$/, message: "Must be a number" },
                })}
                error={!!errors.discountPercentage}
                helperText={errors.discountPercentage?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="image - large"
                id="imageLarge"
                defaultValue={isEdit?.image.large}
                {...register("image.large", {
                  required: "image - large is required",
                })}
                error={!!errors.image?.large}
                helperText={errors.image?.large?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="image - medium"
                id="imageMedium"
                defaultValue={isEdit?.image.medium}
                {...register("image.medium", {
                  required: "image - medium is required",
                })}
                error={!!errors.image?.medium}
                helperText={errors.image?.medium?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="image - small"
                id="imageSmall"
                defaultValue={isEdit?.image.small}
                {...register("image.small", {
                  required: "image - small is required",
                })}
                error={!!errors.image?.small}
                helperText={errors.image?.small?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="image - alt"
                id="imageAlt"
                defaultValue={isEdit?.image.alt}
                {...register("image.alt", {
                  required: "image - alt is required",
                })}
                error={!!errors.image?.alt}
                helperText={errors.image?.alt?.message}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, width: "50%" }}
        >
          Submit
        </Button>
        {error
          ? error && <p>{error}</p>
          : waiting && (
              <Box sx={{ width: "50%" }}>
                <LinearProgress />
              </Box>
            )}
      </form>
    );
  }
}
