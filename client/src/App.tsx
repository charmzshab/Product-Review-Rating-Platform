import { Route, Routes } from "react-router";
import FooterComponent from "./components/FooterComponent";
import MainNavbar from "./components/MainNavbar";
import LandingPage from "./pages/LandingPage";
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/view-product-reviews/:id" element={<ReviewsPage />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
