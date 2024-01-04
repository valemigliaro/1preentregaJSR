import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget"

export const NavBar = () => {
  return (
    <nav className="d-flex justify-content-around p-2">
      <h4>La Tiendita</h4>
      <div>
        <Link to="/">
          <button className="btn btn-outline-dark mx-2">Home</button>
        </Link>
        <Link to="/category/calzados">
          <button className="btn btn-outline-dark mx-2">Calzado</button>
        </Link>
        <Link to="/category/indumentaria">
          <button className="btn btn-outline-dark mx-2">Indumentaria</button>
        </Link>
      </div>
      {/* <Link to="/cart"> */}
        <CartWidget />
      {/* </Link> */}
    </nav>
  );
};