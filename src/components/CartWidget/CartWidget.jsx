import { AiOutlineShoppingCart } from "react-icons/ai";

export const CartWidget = () => {
  return (
    <div className="d-flex" >
        <AiOutlineShoppingCart color="black" size={25} />
        <p className="mx-2">5</p>
    </div>
  )
}