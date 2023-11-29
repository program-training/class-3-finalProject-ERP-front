import { useEffect, useState } from "react";
import { Product } from "../../types";

const useProductsPageDataManager = () => {
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [page, setPage] = useState<number | null>(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (page === null) return;
      try {
        const storage = localStorage.getItem("admin");
        const token = storage ? JSON.parse(storage).token : null;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/inventory/products/${page}`,
          {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          }
        );
        if (!response.ok) {
          if (products) {
            setPage(null);
          }
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Error: ${errorText}`
          );
        }

        const data = await response.json();
        setProducts(products ? [...products, ...data] : data);
        setLoadingNextPage(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingNextPage) {
        setLoadingNextPage(true);
        setPage((pag) => (pag !== null ? pag + 1 : null));
      }
    });
    const element = document.getElementById("load") as HTMLElement;
    if (!element) return;
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [products]);
  
  return {
    products,
    setProducts,
    setPage,
    loadingNextPage,
    page,
  };
};

export default useProductsPageDataManager;
