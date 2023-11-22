import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./Context/AuthContext";
import Products from "./components/Products";
import ProductDetailsPage from "./components/ProductDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetailsPage />,
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
