// src/components/JourneyDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JourneyDetail.css";

const JourneyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample journeys with seat status
  const journeys = [
    {
      id: 1,
      from: "İstanbul",
      to: "Ankara",
      price: 200,
      duration: "4 Hours",
      departure: "08:00",
      arrival: "12:00",
      emptySeats: 50,
      seats: Array.from({ length: 50 }, (_, i) => ({
        number: i + 1,
        isAvailable: i % 4 !== 0, // Example: Every 4th seat is occupied
      })),
    },
    {
      id: 2,
      from: "Ankara",
      to: "Konya",
      price: 150,
      duration: "2.5 Hours",
      departure: "13:30",
      arrival: "16:00",
      emptySeats: 50,
      seats: Array.from({ length: 50 }, (_, i) => ({
        number: i + 1,
        isAvailable: i % 3 !== 0, // Example: Every 3rd seat is occupied
      })),
    },
    {
      id: 3,
      from: "Adana",
      to: "Hüyük",
      price: 280,
      duration: "4 Hours 4 Minutes",
      departure: "16:30",
      arrival: "20:34",
      emptySeats: 50,
      seats: Array.from({ length: 50 }, (_, i) => ({
        number: i + 1,
        isAvailable: i % 5 !== 0, // Example: Every 5th seat is occupied
      })),
    },
  ];

  const journey = journeys.find((j) => j.id === Number(id));
  if (!journey) {
    return (
      <div className="journey-detail-container">
        <div className="detail-content">
          <h2>Journey Not Found</h2>
          <button onClick={() => navigate("/journey-list")}>Back</button>
        </div>
      </div>
    );
  }

  // 50 seats -> reversed (right to left)
  const seatNumbers = Array.from({ length: 50 }, (_, i) => i + 1).reverse();

  // Split seats into rows of 4 -> [s1,s2,s3,s4]
  const chunkSize = 4;
  const seatRows = [];
  for (let i = 0; i < seatNumbers.length; i += chunkSize) {
    seatRows.push(seatNumbers.slice(i, i + chunkSize));
  }

  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seat) => {
    const seatInfo = journey.seats.find((s) => s.number === seat);
    if (seatInfo && seatInfo.isAvailable) {
      setSelectedSeat(seat);
    }
  };

  const handleBuyTicket = () => {
    if (!selectedSeat) {
      alert("Please select a seat!");
      return;
    }
    navigate("/payment", {
      state: {
        journeyId: journey.id,
        selectedSeat,
        price: journey.price,
        from: journey.from,
        to: journey.to,
      }
    });
    
  };

  return (
    <div className="journey-detail-container">
      {/* Ortak header App.jsx'de tanımlı, bu yüzden burada Header kullanılmıyor */}
      <div className="detail-content">
        {/* Left side: Journey information */}
        <div className="detail-info">
          <h2>
            {journey.from} → {journey.to}
          </h2>
          <p>
            Time: {journey.departure} - {journey.arrival}
          </p>
          <p>Duration: {journey.duration}</p>
          <p>Price: {journey.price} TL</p>
          <p>Available Seats: 33</p>
        </div>

        {/* Right side: Seat map */}
        <div className="seat-map">
          <h3>Seat Map (2+2, 50 Seats, Right to Left)</h3>
          <div className="seat-rows-container">
            {seatRows.map((rowSeats, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {/* Left pair */}
                <div className="seat-group">
                  {rowSeats[0] && (
                    <div
                      className={`seat ${
                        !journey.seats.find((s) => s.number === rowSeats[0])
                          .isAvailable
                          ? "occupied"
                          : selectedSeat === rowSeats[0]
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSeatClick(rowSeats[0])}
                    >
                      {rowSeats[0]}
                    </div>
                  )}
                  {rowSeats[1] && (
                    <div
                      className={`seat ${
                        !journey.seats.find((s) => s.number === rowSeats[1])
                          .isAvailable
                          ? "occupied"
                          : selectedSeat === rowSeats[1]
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSeatClick(rowSeats[1])}
                    >
                      {rowSeats[1]}
                    </div>
                  )}
                </div>

                {/* Corridor */}
                <div className="corridor"></div>

                {/* Right pair */}
                <div className="seat-group">
                  {rowSeats[2] && (
                    <div
                      className={`seat ${
                        !journey.seats.find((s) => s.number === rowSeats[2])
                          .isAvailable
                          ? "occupied"
                          : selectedSeat === rowSeats[2]
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSeatClick(rowSeats[2])}
                    >
                      {rowSeats[2]}
                    </div>
                  )}
                  {rowSeats[3] && (
                    <div
                      className={`seat ${
                        !journey.seats.find((s) => s.number === rowSeats[3])
                          .isAvailable
                          ? "occupied"
                          : selectedSeat === rowSeats[3]
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSeatClick(rowSeats[3])}
                    >
                      {rowSeats[3]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="action-buttons">
            <button onClick={handleBuyTicket}>Buy Ticket</button>
            <button onClick={() => navigate("/journey-list")}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetail;
