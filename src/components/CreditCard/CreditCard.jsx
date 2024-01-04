import React from 'react';

const CreditCard = ({ cardNumber, name, expiryDate, cvc }) => {
  return (
    <div className="credit-card">
      <div className="card-number">{cardNumber}</div>
      <div className="card-holder">{name}</div>
      <div className="card-expiry">{expiryDate}</div>
      <div className="card-cvc">{cvc}</div>
    </div>
  );
};

export default CreditCard;