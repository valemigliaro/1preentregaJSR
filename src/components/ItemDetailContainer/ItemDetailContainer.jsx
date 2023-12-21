import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { db } from '../../config/firebaseConfig';
import { getDoc, doc } from "firebase/firestore";



export const ItemDetailContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemRef = doc(db, 'products', id);
        const docSnap = await getDoc(itemRef);
        
        
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error en el Producto",
            text: "El producto que intenta buscar no existe",
          }).then((result) => {
            
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      } catch (error) {
        console.error('Error');
      }
    };

    
    fetchData();
  }, [id, navigate]);

  return (
    <>
      <div className="contair">
        {item && <ItemDetail {...item} />}
      </div>
    </>
  );
};