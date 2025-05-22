import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

export default function AddReview(props) {
  const { productId, addProductReview } = useAppContext();

  async function handleSubmit(values: {
    comment: string;
    author: string;
    rating: number;
  }) {
    try {
      const res = await addProductReview(productId, values);
      props.onModalShow();
      console.log(res)
      // navigate(`/view-product-reviews/${productId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Formik
      initialValues={{ comment: "", author: "", rating: 1 }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <div className="row">
          <div className="col-sm-12 mt-2">
            <Field
              id="author"
              name="author"
              placeholder="Author"
              className="form-control"
            />
          </div>
          <div className="col-sm-12 mt-2">
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
        </div>
      </Form>
    </Formik>
  );
}
