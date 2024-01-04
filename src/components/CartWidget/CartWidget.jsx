import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { AiOutlineShoppingCart } from "react-icons/ai";

export const CartWidget = () => {
  const { totalQuantity } = useCart();

  return (
    <Link to="/cart">
      <div className="d-flex" >
        <AiOutlineShoppingCart color="black" size={25} />
      {/* <p className="mx-2">1</p> */}
        <span className="cart-count">({totalQuantity})</span>
      </div>
    </Link>
  );
};