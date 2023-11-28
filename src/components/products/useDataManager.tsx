import { useEffect, useState } from "react";
import { Product } from "../../types";

const useDataManager = () => {
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [page, setPage] = useState<number | null>(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (page === null) return;
      setLoadingNextPage(true);
      try {
        const storage = localStorage.getItem("admin");
        const token = storage ? JSON.parse(storage).token : null;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/inventory/${page}`,
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

  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (isAtBottom && !loadingNextPage) {
      setPage((page) => (page !== null ? page + 1 : null));
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return {
    products,
    setProducts,
    setPage,
    loadingNextPage,
    filteredProducts,
    setSearchTerm,
    page,
  };
};

export default useDataManager;
