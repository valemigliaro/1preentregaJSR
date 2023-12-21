import React, { useState, useContext, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import "firebase/firestore";
import { firebaseConfig } from "../../config/firebaseConfig"


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Order = () => {
 
  const { totalCartItems } = useContext(CartContext);

  
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [showCreditCard] = useState(true);

 
  const addressRef = useRef(null);
  const postalCodeRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const formattedTotal = totalCartItems.toFixed(2);

  
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(value);
  };

  
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    } else {
      value = value.replace(/(\d{2})/, "$1/");
    }
    setExpiryDate(value);
  };


  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(value);
  };

 
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

  
  const handlePostalCodeChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    postalCodeRef.current.value = value;
  };

  
  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 11);
    phoneNumberRef.current.value = value;
  };

 
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  
  const handleConfirmEmailChange = (e) => {
    const value = e.target.value;
    setConfirmEmail(value);
  };


  const validateFields = () => {
    const requiredFields = [
      name,
      cardNumber,
      expiryDate,
      cvc,
      selectedOption1,
      selectedOption2,
      selectedOption3,
      addressRef.current.value,
      postalCodeRef.current.value,
      phoneNumberRef.current.value,
      email,
      confirmEmail,
    ];

    const isValid = requiredFields.every((field) => field.trim() !== "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid) {
      Swal.fire({
        icon: "error",
        title: "Error de Email",
        text: "Por favor, ingrese un correo electrónico válido.",
      });
      return false;
    }

    
    if (isValid && email !== confirmEmail) {
      Swal.fire({
        icon: "error",
        title: "Error de Email",
        text: "Los correos electrónicos no coinciden. Por favor, verifica.",
      });
      return false;
    }

    return isValid;
  };

  
  const deleteOrderFromFirestore = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      console.log("Eliminando orden con ID:", orderId);
      await deleteDoc(orderRef);
      console.log("Orden eliminada con éxito");
      Swal.fire({
        icon: "success",
        title: "Orden eliminada",
        text: "La orden ha sido eliminada.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar la orden",
        text: "Ocurrió un error al intentar eliminar la orden. Por favor, comunicate con el soporte. pawpaw@soporte.com.",
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
    try {
     
      const ordersCollectionRef = collection(db, "orders");
      const orderData = {
        name,
        cardNumber,
        expiryDate,
        cvc,
        selectedOption1,
        selectedOption2,
        selectedOption3,
        address: addressRef.current.value,
        postalCode: postalCodeRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        email,
        notes,
        total: formattedTotal,
      };

      
      const docRef = await addDoc(ordersCollectionRef, orderData);
      
      console.log("Orden creada con ID:", docRef.id);

      const orderConfirmationMessage = `
        ¡Gracias por tu compra! <br>
        Tu número de orden es: ${docRef.id}.<br>
        Total de la Compra: $${formattedTotal}<br>
        Nombre: ${name}<br>
        Email: ${email}<br>
        Dirección de Envío: ${addressRef.current.value}<br>
        Código Postal: ${postalCodeRef.current.value}<br>
        Número de Teléfono: ${phoneNumberRef.current.value}<br>
        Notas: ${notes}<br>
        Una persona del correo se contactará contigo para acordar una fecha y horario acorde.
      `;
  
      Swal.fire({
        icon: "success",
        title: "Compra confirmada",
        html: orderConfirmationMessage,
        customClass: {
          content: 'text-left',
        },

        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Rechazar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log("Compra aceptada");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Compra rechazada");
          deleteOrderFromFirestore(docRef.id); 
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al procesar la orden",
        text: "Ocurrió un error al intentar procesar la orden. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

return (
  <div className="order-container">
    <animated.div style={cardAnimation} className="credit-card-container">
      {showCreditCard && <CreditCard cardNumber={cardNumber} name={name} expiryDate={expiryDate} cvc={cvc} />}
    </animated.div>

    <div className="form-container">
      <h2>Confirmar Compra</h2>
      <p>Total de la Compra: ${formattedTotal}</p>
      <h4>Medio de Pago</h4>
      <label>
        Nombre Completo:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Número de Tarjeta:
        <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
      </label>
      <br />
      <label>
        Fecha de Vencimiento:
        <input type="text" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" />
      </label>
      <br />
      <label>
        Código de Seguridad:
        <input type="text" value={cvc} onChange={handleCvcChange} />
      </label>
      <br />
      <label>
        Banco/Entidad Financiera:
        <select value={selectedOption1} onChange={(e) => setSelectedOption1(e.target.value)}>
          <option value="">Selecciona una opción</option>
          <option value="opcion1">Banco Ciudad</option>
          <option value="opcion2">Banco Provincia</option>
          <option value="opcion3">Banco Nación</option>
          <option value="opcion4">Banco Macro</option>
          <option value="opcion5">Tarjeta Naranja/NaranjaX</option>
        </select>
      </label>
      <br />
      <label>
        Tipo de Tarjeta:
        <select value={selectedOption2} onChange={(e) => setSelectedOption2(e.target.value)}>
          <option value="">Selecciona una opción</option>
          <option value="opcionA">Crédito</option>
          <option value="opcionB">Debito</option>
        </select>
      </label>
      <br />
      <label>
        Cuotas:
        <select value={selectedOption3} onChange={(e) => setSelectedOption3(e.target.value)}>
          <option value="">Selecciona una opción</option>
          {selectedOption2 === "opcionA" ? (
            <>
              <option value="opcionX">1 Cuota</option>
              <option value="opcionY">3 Cuotas</option>
              <option value="opcionW">6 Cuotas</option>
              {selectedOption1 === "opcion5" && <option value="opcionN">Plan Z</option>}
            </>
          ) : selectedOption2 === "opcionB" ? (
            <option value="opcionX">1 Cuota</option>
          ) : null}
        </select>
      </label>
      <br />
      <h4>Datos de Envío</h4>
      <label>
        Dirección de Envío:
        <input type="text" ref={addressRef} />
      </label>
      <br />
      <label>
        Código Postal:
        <input type="text" ref={postalCodeRef} onChange={handlePostalCodeChange} />
      </label>
      <br />
      <label>
        Número de Teléfono:
        <input type="text" ref={phoneNumberRef} onChange={handlePhoneNumberChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Confirmar Email:
        <input type="email" value={confirmEmail} onChange={handleConfirmEmailChange} />
      </label>
      <br />
      <h4>Aclaraciones</h4>
      <label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
      </label>
      <br />
      <p>Total de la Compra: ${formattedTotal}</p>
      <br />
      <button onClick={handleSubmit}>Confirmar Compra</button>
    </div>
  </div>
);
};

export default Order;