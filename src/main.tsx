import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginAndRegistration from "./components/LoginAndRegistration";
import Header from "./components/Header";
import SignUp from "./components/SignUp/SignUpWithFormik";
import { AuthProvider } from "./Context/AuthContext";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import "./main.css";
import AddProduct from "./components/AddProduct";
import LabTabs from "./components/products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <LoginAndRegistration />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/products",
        element: <LabTabs />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "/AddProduct",
        element: <AddProduct />,
      },
      {
        path: "/AddProduct/:id",
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
