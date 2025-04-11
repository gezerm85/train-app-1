// src/components/TicketForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TicketForm.css";

const TicketForm = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("oneWay");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [activeTab, setActiveTab] = useState("buyTicket");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to) {
      alert("Please fill in the 'From' and 'To' fields!");
      return;
    }
    // Search Journey -> /journey-list
    navigate("/journey-list");
  };

  const renderTicketForm = () => (
    <form onSubmit={handleSubmit} className="ticket-form">
<div className="location-inputs">
  {/* 🏙️ 'From' Şehir Seçimi */}
  <select
    value={from}
    onChange={(e) => setFrom(e.target.value)}
    required
  >
    <option value="" disabled>
      Select Departure City
    </option>
    <option value="Istanbul">Istanbul</option>
    <option value="Ankara">Ankara</option>
    <option value="Konya">Konya</option>
    <option value="Eskisehir">Eskisehir</option>
  </select>

  <span className="swap-icon">⇆</span>

  {/* 🏙️ 'To' Şehir Seçimi */}
  <select
    value={to}
    onChange={(e) => setTo(e.target.value)}
    required
  >
    <option value="" disabled>
      Select Arrival City
    </option>
    <option value="Istanbul">Istanbul</option>
    <option value="Ankara">Ankara</option>
    <option value="Konya">Konya</option>
    <option value="Eskisehir">Eskisehir</option>
  </select>
</div>


      <div className="date-section">
        <label>Departure Date</label>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
        {tripType === "roundTrip" && (
          <div className="return-date">
            <label>Add Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="passenger-section">
        <label>Passengers</label>
        <select
          value={passengerCount}
          onChange={(e) => setPassengerCount(e.target.value)}
        >
          <option value="1">1 Passenger</option>
          <option value="2">2 Passengers</option>
          <option value="3">3 Passengers</option>
          <option value="4">4 Passengers</option>
        </select>
      </div>

      <button type="submit" className="search-button">
        Search Journey
      </button>
    </form>
  );

  const renderMockTicket = () => (
    <div className="mock-ticket">
      <h3>My Tickets</h3>
      <div className="ticket-info">
        <p>
          <strong>From:</strong> Istanbul
        </p>
        <p>
          <strong>To:</strong> Ankara
        </p>
        <p>
          <strong>Departure Date:</strong> 2025-03-15
        </p>
        <p>
          <strong>Passengers:</strong> 1
        </p>
      </div>
    </div>
  );

  return (
    <div className="ticket-form-container">
      <div className="ticket-form-tabs">
        <span
          className={`ticket-form-tab ${
            activeTab === "buyTicket" ? "active-tab" : ""
          }`}
          onClick={() => setActiveTab("buyTicket")}
        >
          Buy Ticket
        </span>
        <span
          className={`ticket-form-tab ${
            activeTab === "myTickets" ? "active-tab" : ""
          }`}
          onClick={() => setActiveTab("myTickets")}
        >
          My Tickets
        </span>
      </div>

      {activeTab === "buyTicket" ? renderTicketForm() : renderMockTicket()}
    </div>
  );
};

export default TicketForm;
