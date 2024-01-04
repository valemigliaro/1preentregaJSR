import { ItemCount } from "../ItemCount/ItemCount";
import './ItemDetail'

export const ItemDetail = ({ description, img, price, stock,name }) => {
   
    const onAdd = (items) => { 
        alert(`Se agregaron ${items} al carrito`)
     }

  return (
    <div className="border m-2">
      <div className="card ">
        <div className="card-body ">
          <h5 className="card-title">{name}</h5>
          <img src={img} alt="" />
          <p className="card-text"> {description} </p>
          <p>Precio: {price} </p>
          <ItemCount stock={stock} onAdd={onAdd} />
      
        </div>
      </div>
    </div>
  );
};