// src/components/Payment.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment successfully received!");
    // Örneğin, ödemeden sonra kullanıcıyı /user sayfasına yönlendiriyoruz
    navigate("/user");
  };

  return (
    <div className="payment-container">
      {/* Ortak header App.jsx'de tanımlı, bu yüzden burada Header kaldırıldı */}

      {/* Centered content */}
      <div className="payment-content">
        <div className="payment-box">
          <h2>Credit Card Payment</h2>
          <form onSubmit={handlePayment}>
            <label>Cardholder Name</label>
            <input type="text" placeholder="Full Name" required />

            <label>Card Number</label>
            <input type="text" placeholder="1111 2222 3333 4444" required />

            <label>Expiration Date (Month/Year)</label>
            <div className="expiry-row">
              <select required>
                <option value="">Month</option>
                <option value="1">01</option>
                <option value="2">02</option>
                {/* ... */}
                <option value="12">12</option>
              </select>
              <select required>
                <option value="">Year</option>
                <option value="25">2025</option>
                <option value="26">2026</option>
                {/* ... */}
              </select>
            </div>

            <label>CVV</label>
            <input type="text" placeholder="123" required />

            <label>Amount to Pay</label>
            <input type="text" value="280.00 TL" readOnly />

            <button type="submit" className="pay-button">Make Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
