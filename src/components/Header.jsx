// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Örnek: Admin linkleri
  const goAddUser = () => {
    setMenuOpen(false);
    navigate("/pending-users");
  };
  const goEditTicket = () => {
    setMenuOpen(false);
    navigate("/ticket-edit");
  };
  const goEditTrain = () => {
    setMenuOpen(false);
    navigate("/train-edit");
  };
  const handleLogout = () => {
    setMenuOpen(false);
    localStorage.removeItem("role");
    alert("Logout successful!");
    navigate("/");
  };

  return (
    <header className="header-container">
      <div className="header-title" onClick={() => navigate("/")}>
      RailWave
      </div>
      <div className="header-right">
        <div className="profile-avatar" onClick={toggleMenu}>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="avatar-img"
          />
          <span className="username">Admin</span> 
          {/* istersen “Manager” / “User” da yazabilirsin */}
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            {/* Admin Linkleri */}
            <button onClick={goAddUser}>Add User</button>
            <button onClick={goEditTicket}>Edit Ticket</button>
            <button onClick={goEditTrain}>Edit Train</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
