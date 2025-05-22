import axios from "axios";
import React, { useCallback, useContext, useState } from "react";

type IContext = {
  products: object[];
  getProducts: (url: string) => Promise<void>;
  productReviews: object[];
  getProductReviews: (url: string) => Promise<void>;
  changeState: () => boolean;
  productOrReview: boolean;
  addProductReview: (
    id: string,
    data: { name: string; category: string; price: number; description: string }
  ) => Promise<void>;
  productId: string;
  assignProductId: (id: string) => void;
  addProduct: (product: {
    name: string;
    category: string;
    price: number;
    description: string;
  }) => Promise<void>;
  deleteProductReview: (productId: string, reviewId: string) => Promise<void>;
  updateReview: (
    reviewId: string,
    data: { comment: string; rating: number },
    id: string
  ) => Promise<void>;
  searchProducts: (query:string)=> Promise<void>;

};

const MainAppContext = React.createContext<IContext>({} as IContext);
export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<object[]>([]);
  const [productReviews, setProductReviews] = useState<object[]>([]);
  const [productOrReview, setProductOrReview] = useState(true);
  const [productId, setProductId] = useState("");

  const backendurl = "https://product-review-rating-platform-server-tst0.onrender.com/api/products"
  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get(backendurl);
      const data = response.data;
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },[]);

  const searchProducts = useCallback(async (query:string) => {
    try {
      const response = await axios.get(`${backendurl}/search?q=${query}`);
      const data = response.data;
      console.log(data);
      
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },[]);

  const getProductReviews = useCallback(async (id: string) => {
    try {
      const response = await axios.get(`${backendurl}/${id}/reviews`);
      // console.log(response.data);
      setProductReviews(response.data);
    } catch (error) {
      console.error("Error fetching product reviews:", error);
    }
  },[]);

  const addProductReview = useCallback(async (
    id: string,
    data: { name: string; category: string; price: number; description: string }
  ) => {
    try {
      // console.log("data:", data);
      await axios.post(
        `${backendurl}/${id}/reviews`,
        data
      );
    } catch (error) {
      console.error("Error adding a product review:", error);
    }
  },[]);

  function changeState() {
    setProductOrReview(!productOrReview);
    return productOrReview;
  }

  function assignProductId(id: string) {
    setProductId("");
    setProductId(id);
  }

   const addProduct =useCallback(async (product: {
    name: string;
    category: string;
    price: number;
    description: string;
  })=> {
    try {
      await axios.post(`${backendurl}`, product);
    } catch (error) {
      console.log("Error adding product: ", error);
    }
  },[]);


  const deleteProductReview = useCallback(async(productId: string, reviewId: string)=> {
    try {
      const url = `${backendurl}/${reviewId}/reviews/${productId}`;
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
  },[]);

  const updateReview = useCallback(async(reviewId: string, data, id: string)=> {
    try {
      const response = await axios.put(
        `${backendurl}/${id}/reviews/${reviewId}`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },[]);
  return (
    <MainAppContext.Provider
      value={{
        products,
        getProducts,
        productReviews,
        getProductReviews,
        productOrReview,
        changeState,
        addProductReview,
        productId,
        assignProductId,
        addProduct,
        deleteProductReview,
        updateReview,
        searchProducts
      }}
    >
      {children}
    </MainAppContext.Provider>
  );
}

export const useAppContext = () => useContext(MainAppContext);
