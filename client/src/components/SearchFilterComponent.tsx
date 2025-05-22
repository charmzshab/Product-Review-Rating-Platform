import { Field, Form, Formik } from "formik";
import { Button, InputGroup } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

export default function SearchFilterComponent() {
  const { searchProducts } = useAppContext();
  async function handleSearch(values) {
    try {
      await searchProducts(values.query);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="row">
      <div className="col-lg-12">
        <h5>Search</h5>
        <Formik
          initialValues={{ query: "" }}
          onSubmit={(values) => handleSearch(values)}
        >
          <Form>
            <InputGroup>
              <Field
                name="query"
                placeholder="Search Query"
                className="form-control"
              />
              <Button variant="info" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
