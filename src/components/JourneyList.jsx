// src/components/JourneyList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JourneyList.css";

const JourneyList = () => {
  const navigate = useNavigate();

  // Day buttons
  const [selectedDay, setSelectedDay] = useState("Today");

  const days = ["Today", "Tomorrow", "5 Mar Tue", "6 Mar Wed", "7 Mar Thu"];

  // Journey data can be filtered by day.
  // For now, it's static and shows all journeys regardless of the day.
  const allJourneys = [
    {
      id: 1,
      from: "İstanbul",
      to: "Ankara",
      departureTime: "08:00",
      arrivalTime: "12:00",
      duration: "4 Hours",
      price: 200,
    },
    {
      id: 2,
      from: "Ankara",
      to: "Konya",
      departureTime: "13:30",
      arrivalTime: "16:00",
      duration: "2.5 Hours",
      price: 150,
    },
    {
      id: 3,
      from: "Adana",
      to: "Hüyük",
      departureTime: "16:30",
      arrivalTime: "20:34",
      duration: "4 Hours 4 Minutes",
      price: 280,
    },
  ];

  // Filter (optional): For now, we use the same data
  const journeys = allJourneys;

  const handleDayClick = (day) => {
    setSelectedDay(day);
    // Optional: Filter journeys based on selected day
  };

  const goDetail = (journeyId) => {
    navigate(`/journey/${journeyId}`);
  };

  return (
    <div className="journey-list-container">
      {/* Ortak header App.jsx'de tanımlı, bu yüzden burada Header kaldırıldı */}

      <div className="journey-list-content">
        <h2>Available Journeys</h2>

        {/* Day buttons */}
        <div className="days-row">
          {days.map((day) => (
            <button
              key={day}
              className={`day-button ${selectedDay === day ? "active-day" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Journey cards */}
        <div className="journey-cards">
          {journeys.map((j) => (
            <div key={j.id} className="journey-card" onClick={() => goDetail(j.id)}>
              <div className="journey-info">
                <div className="time-range">
                  <span className="dep-time">{j.departureTime}</span>
                  <span className="arr-time">{j.arrivalTime}</span>
                </div>
                <span className="arrow">→</span>
              </div>
              <div className="journey-sub">
                <span>
                  {j.from} - {j.to}
                </span>
                <span>Duration: {j.duration}</span>
              </div>
              <div className="journey-price">Price: {j.price} TL</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyList;
