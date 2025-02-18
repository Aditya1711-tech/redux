import { useSelector } from "react-redux"
import "./cartstyle.css"
import { CartState } from "../../redux/slices/cartSlice"

export interface ItemsState {
  cart: CartState
} 

function Cart() {
  const items:CartState = useSelector((state: ItemsState) => state.cart)
  const totalAmmount = items.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className="cart">Total items {items.length} (${totalAmmount})</div>
  )
}

export default Cart