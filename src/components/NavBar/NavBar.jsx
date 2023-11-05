import { CartWidget } from "../CartWidget/CartWidget"

export const NavBar = () => {
  return (
    <nav className="d-flex justify-content-around p-4">
        <img src="/img/Lokah.jpg" alt="" style={{width: "150px"}}/>
        <div>
        <button className="btn btn-success mx-2">Nosotros</button>
        <button className="btn btn-success mx-2">Servicios</button>
        <button className="btn btn-success mx-2">Experiencia</button>
      </div>
      <CartWidget />
    </nav>
  )
}