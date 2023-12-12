import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types";
import axios from "axios";

const useProductsPageDataManager = () => {
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [page, setPage] = useState<number | null>(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
      if (page === null) return;
      const storage = localStorage.getItem("admin");
      const token = storage ? JSON.parse(storage).token : null;
      let data = JSON.stringify({
        query: `query OneProductPage { OneProductPage(page: ${page}) { _id name salePrice quantity description category discountPercentage image {large medium small alt} } }`,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BASE_URL}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response.status !== 200) {
            if (products) {
              setPage(null);
            }
            throw new Error(
              `HTTP error! Status: ${response.status}, Error: ${response.data}`
            );
          }
          const data = response.data.data.OneProductPage;
          setProducts(products ? [...products, ...data] : data);
          setLoadingNextPage(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleScroll = useCallback(() => {
    setShowScrollButton(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    products,
    setProducts,
    setPage,
    loadingNextPage,
    page,
    showScrollButton,
    scrollToTop,
  };
};

export default useProductsPageDataManager;