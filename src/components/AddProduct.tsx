import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form";
import { json, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type input = {
  name: string;
  description: string;
  category: string;
  salePrice: number;
  quantity: number;
  discountPercentage: number;
  image: {
    large: string;
    medium: string;
    small: string;
    alt: string;
  };
};


// type gilad = {
//   image: {
//     large: string;
//     medium: string;
//     small: string;
//     alt: string;
//   };
//   _id: string;
//   name: string;
//   salePrice: 14;
//   quantity: 63;
//   description: string;
//   category: string;
//   discountPercentage: number;
//   __v: number;
// };

export default function AddProduct() {
  const params = useParams();
  const [data2, setData2] = useState<input | null>();
  const [bool, setBool] = useState<boolean>(false);
  if (params.id) {
    useEffect(() => {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const fetchEdit = async () => {
        const data = await fetch(
          `http://localhost:3009/api/inventory/${params.id}`,
          {
            method: "get",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        const dataJ = await data.json();
        console.log(dataJ)
        setData2(dataJ)
      };
      fetchEdit()
    }, []);
  } else {
    useEffect(() => {
      setBool(true);
    }, []);
  }

  const [data1, setData] = useState<input | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<input>();

  const onSubmit: SubmitHandler<input> = (data) => {
    setData(data);
    if (params.id) {
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(data)
      const fetchEdit = async () => {
        const data = await fetch(
          `http://localhost:3009/api/inventory/${params.id}`,
          {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          }
        );
        const dataJ = await data.json();
        console.log(dataJ)
      };
      fetchEdit()
    }else{
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      const myHeaders = new Headers();
      myHeaders.append("authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(data)
      const fetchEdit = async () => {
        const data = await fetch(
          `http://localhost:3009/api/inventory/`,
          {
            method: "post",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          }
        );
        const dataJ = await data.json();
        console.log(dataJ)
      };
      fetchEdit()

    }
  };
  if (data2 || bool) {
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
                defaultValue={data2?.name}
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
                defaultValue={data2?.description}
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
                defaultValue={data2?.category}
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
                defaultValue={data2?.salePrice}
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
                defaultValue={data2?.quantity}
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
                defaultValue={data2?.discountPercentage}
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
                  defaultValue={data2?.image.large}
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
                  defaultValue={data2?.image.medium}
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
                  defaultValue={data2?.image.small}
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
                  defaultValue={data2?.image.alt}
                  {...register("image.alt")}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        <div>{data1?.name}</div>
        <div>{data2?.name}</div>
        <input type="submit" />
      </form>
    );
  }
}
