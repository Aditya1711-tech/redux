import { useDispatch } from "react-redux";
import "./productstyle.css";
import { addItem } from "../../redux/slices/cartSlice";

interface ProductProps {
  name: string;
  price: number;
}

function Product({ name, price }: ProductProps) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <p className="product-name">Name: {name}</p>
      <p className="product-price">Price: ${price}</p>
      <button
        className="add-to-cart-btn"
        onClick={() => dispatch(addItem({ name: name, price: price }))}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
