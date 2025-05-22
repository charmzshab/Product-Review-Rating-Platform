import { useEffect } from "react";
import { Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SearchFilterComponent from "../components/SearchFilterComponent";
import { useAppContext } from "../context/AppContext";
import type { IProduct } from "../types/Product";
export default function LandingPage() {
  const { products, getProducts } = useAppContext();

  async function getProductsData() {
    try {
      await getProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getProductsData();
  }, []);


  return (
    <Container className="mt-3">
      <SearchFilterComponent />
      {products.map((product: IProduct, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </Container>
  );
}
