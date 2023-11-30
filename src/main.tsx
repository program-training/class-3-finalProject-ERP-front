import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginAndRegistration from "./components/LoginAndRegistration";
import Header from "./components/Header";
import SignUpForm from "./components/SignUp/SignUpForm";
import { AuthProvider } from "./Context/AuthContext";
import { ProductDetailsPage } from "./components/ProductDetailsPage/ProductDetailsPage";
import "./main.css";
import AddProduct from "./components/Add-EditProduct/Add-EditProduct";
import { Products } from "./components/ProductsComponents/ProductsManager";
import { Navi } from "./components/Navi";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navi />,
  },
  {

    path: "/erp",
    element: <Header />,
    children: [
      {
        path: "/erp",
        element: <LoginAndRegistration />,
      },
      {
        path: "/erp/signUp",
        element: <SignUpForm />,
      },
      {
        path: "/erp/products",
        element: <Products />,
      },
      {
        path: "/erp/product/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/erp/AddProduct",
        element: <AddProduct />,
      },
      {
        path: "/erp/AddProduct/:id",
        element: <AddProduct />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
