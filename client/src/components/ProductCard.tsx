import moment from "moment";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import type { IProduct } from "../types/Product";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card className="mt-3 mb-1">
      <Card.Body>
        <h4>
          <Link to={`/view-product-reviews/${product._id}`}>
            {product.name}
          </Link>
        </h4>
        <p>{product.description}</p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <div className="d-flex ">
          <span className="text-muted">Price: ${product.price}</span>
          &nbsp; &nbsp;
          <span className="text-muted">Rating: {product.averageRating}</span>
          &nbsp; &nbsp;
          <span className="text-muted">Category: {product.category}</span>
        </div>
        <div>
          <span>{moment(product.dateAdded).format("yyyy/MM/DD")}</span>
        </div>
      </Card.Footer>
    </Card>
  );
}
