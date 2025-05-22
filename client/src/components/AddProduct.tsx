import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

export default function AddProduct(props) {
  const { addProduct } = useAppContext();

  async function handleSubmit(values: {
    name: string;
    description: string;
    price: number;
    category: string;
  }) {
    await addProduct(values);
    props.onModalShow();
  }
  return (
    <Formik
      initialValues={{ name: "", description: "", price: 0, category: "" }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <div className="row">
          <div className="col-sm-12 mt-2">
            <Field
              name="name"
              placeholder="Product Name"
              className="form-control"
            />
          </div>

          <div className="col-sm-12 mt-2">
            <Field
              name="category"
              placeholder="Product category"
              className="form-control"
            />
          </div>

          <div className="col-sm-12 mt-2">
            <Field
              name="price"
              placeholder="Product Price"
              className="form-control"
            />
          </div>

          <div className="col-sm-12 mt-2">
            <Field
              name="description"
              placeholder="Description"
              className="form-control"
              as="textarea"
              rows="6"
            />
          </div>
          <div className="col-lg-4 mt-3">
            <Button type="submit" className="btn  ">
              Submit Product
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
