import "./App.css";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import TaskDetails from "./components/Task/TaskDetails";
import { products } from "./dummyproducts";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1 className="header-title">Redux Toolkit Demo</h1>
      </header>
      <Cart />
      {/* <div className="product-list">
        {products.map((product, index) => (
          <Product key={index} name={product.name} price={product.price} />
        ))}
      </div> */}
      <TaskDetails />
    </div>
  );
}

export default App;