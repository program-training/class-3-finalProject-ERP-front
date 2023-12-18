import { NavigateFunction } from "react-router-dom";
import { Product } from "../../types";
import axios from "axios";

export const FetchToServer = (
  params: string | undefined,
  data: Product,
  setWaiting: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  const storage = localStorage.getItem("admin");
  const token = storage ? JSON.parse(storage).token : null;
  setWaiting(true);
  setError("");
  console.log(data, params);
  const editProductMutation = `
  mutation  ${params ? "EditProduct":"NewProduct"} {
    ${params ? "editProduct":"newProduct"}(
      productInput: {
        ${params ? "id:params" : ""}
        name: "${data.name}"
        salePrice: ${data.salePrice}
        quantity: ${data.quantity}
        description: "${data.description}"
        category: "${data.category}"
        discountPercentage: ${data.discountPercentage}
        image: {
          large: "${data.image.large}"
          medium: "${data.image.medium}"
          small: "${data.image.small}"
          alt: "${data.image.alt}"
        }
         }
    ) {
      _id
      name
      salePrice
      quantity
      description
      category
      discountPercentage
      image {
        large
        medium
        small
        alt
      }
    }
  }
`;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },

    data: JSON.stringify({ query: editProductMutation }),
  };
  axios
    .request(config)
    .then((response) => {
      setWaiting(false);
      if (response.status !== 200) {
        throw new Error(
          `HTTP error! Status: ${response.status}, Error: ${response.data}`
        );
      }
      console.log(response.data);
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      navigate("/erp/products");
    })
    .catch((error) => {
      console.log(error);
      setError(
        `HTTP error! Status: ${error.response?.status}, Error: ${error.response?.data}`
      );
      if (error.message === "Network Error") {
        setError("Network error");
      } else {
        console.error("error", error);
        setError(error.message);
      }
    });

  // axios({
  //   method: params ? "PUT" : "POST",
  //   url: `${import.meta.env.VITE_BASE_URL}/inventory/${
  //     params !== undefined ? params : ""
  //   }`,
  //   data: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     setWaiting(false);
  //     if (response.status != 200 && response.status != 201) {
  //       throw new Error(
  //         `HTTP error! Status: ${response.status}, Error: ${response.data}`
  //       );
  //     }
  //     navigate("/erp/products");
  //   })
  // .catch((error) => {
  //   console.log(error);
  //     setError(`HTTP error! Status: ${error.response?.status}, Error: ${error.response?.data}`);
  //    if (error.message === "Network Error") {
  //     setError("Network error");
  //   } else {
  //     console.error("error", error);
  //     setError(error.message);
  //   }
  // });
};
