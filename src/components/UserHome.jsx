// src/components/UserHome.jsx
import React from "react";
import TicketForm from "./TicketForm";
import "./UserHome.css";

const UserHome = () => {
  return (
    <div className="userhome-container">
      {/* Ortak header App.jsx'de tanımlı, bu yüzden burada ekstra header eklemeye gerek yok */}
      <div className="main-content">
        <TicketForm />
      </div>
    </div>
  );
};

export default UserHome;
