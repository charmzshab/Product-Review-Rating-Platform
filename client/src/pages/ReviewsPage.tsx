import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useParams } from "react-router";
import ModalComponent from "../components/ModalComponent";
import { useAppContext } from "../context/AppContext";
import type { IReview } from "../types/Review";

export default function ReviewsPage() {
  const [showModal, setShowModal] = useState(false);
  const [reviewComment, setReviewComment] = useState<IReview | null>(null);
  const { id } = useParams();
  const {
    productReviews,
    getProductReviews,
    changeState,
    assignProductId,
    deleteProductReview,
    updateReview,
  } = useAppContext();

  async function getReviews() {
    if (id !== undefined) {
      assignProductId(id);
      await getProductReviews(
        id
      );
    }
  }

  useEffect(() => {
    getReviews();
    changeState();
  }, []);

  async function handleEditComment(values: IReview) {
    try {
      setReviewComment(values);
      setShowModal(!showModal);
      console.log(values._id);
      await updateReview(values._id, values, id);
    } catch (error) {
      console.log(error);
    }
  }

  const handlerDelete = (revid,id)=>{
    deleteProductReview(revid,id);
    getProductReviews(id);
  }
  return (
    <Container>
      {productReviews.map((review: IReview, index) => (
        <Card key={index} className="mt-2">
          <Card.Header className="d-flex justify-content-between">
            <p>{review.author}</p>
            <div>
              <button className="btn" onClick={() => handleEditComment(review)}>
                Edit
              </button>
              &nbsp;
              <button
                className="btn btn-danger"
                onClick={() => handlerDelete(review._id, id)}
              >
                Delete
              </button>
            </div>
          </Card.Header>
          <Card.Body>{review.comment}</Card.Body>
          <Card.Footer>
            <div className="d-flex">
              <p>Rating: {review.rating}</p>
            </div>
          </Card.Footer>
        </Card>
      ))}
      <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(!showModal)}
        modalTitle={"Edit Review"}
      >
        <Formik
          initialValues={{
            comment: reviewComment?.comment || "",
            rating: reviewComment?.rating || 1,
          }}
          onSubmit={(values) => {
            if (reviewComment) {
              handleEditComment({ ...reviewComment, ...values });
            }
          }}
        >
          <Form>
            <div className="col-sm-12 mt-2">
              <label>Rating</label>
              <Field as="select" name="rating" className="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Field>
            </div>
            <div className="col-sm-12 mt-2">
              <Field
                id="comment"
                name="comment"
                placeholder="Comment"
                className="form-control"
                as="textarea"
                rows="6"
              />
            </div>
            <div className="col-lg-4 mt-3">
              <Button type="submit" className="btn  ">
                Submit Review
              </Button>
            </div>
          </Form>
        </Formik>
      </ModalComponent>
    </Container>
  );
}
