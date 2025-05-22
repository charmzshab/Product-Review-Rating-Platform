import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppContext } from "../context/AppContext";
import AddProduct from "./AddProduct";
import AddReview from "./AddReview";
import ModalComponent from "./ModalComponent";

function MainNavbar() {
  const { productOrReview, getProductReviews,productId,getProducts } = useAppContext();
  const [showModal, setShowModal] = useState(false);
console.log(productOrReview);

  const handlerModal = () =>{
    setShowModal(false);
    if(productOrReview){getProducts();}
    else{getProductReviews(productId)}
  }
  
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Final Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="" onClick={() => setShowModal(!showModal)}>
                {productOrReview ? "Add Product" : "Add Review"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(!showModal)}
        modalTitle={productOrReview ? "Add Product" : "Add Review"}
      >
        {productOrReview ? <AddProduct onModalShow={handlerModal} /> : <AddReview onModalShow={handlerModal} />}
      </ModalComponent>
    </>
  );
}

export default MainNavbar;
