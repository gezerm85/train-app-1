import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state || {};

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const amount = passedData.price ? `${passedData.price} TL` : "280.00 TL";

  const handlePayment = (e) => {
    e.preventDefault();

    const paymentData = {
      cardName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      amount,
      journey: passedData, // Sefer bilgilerini de logluyoruz
    };

    console.log("Ödeme verisi:", paymentData);
   // alert("Payment successful!");

   // navigate("/user");
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <div className="payment-box">
          <h2>Credit Card Payment</h2>
          <form onSubmit={handlePayment}>
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />

            <label>Card Number</label>
            <input
              type="text"
              placeholder="1111 2222 3333 4444"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />

            <label>Expiration Date (Month/Year)</label>
            <div className="expiry-row">
              <select
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                required
              >
                <option value="">Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                required
              >
                <option value="">Year</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            <label>CVV</label>
            <input
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />

            <label>Amount to Pay</label>
            <input type="text" value={amount} readOnly />

            <button type="submit" className="pay-button">
              Make Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
