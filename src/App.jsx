import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.jpeg";

import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
// User side
import UserHome from "./components/UserHome";
import JourneyList from "./components/JourneyList";
import JourneyDetail from "./components/JourneyDetail";
import Payment from "./components/Payment";
// Manager side
import ManagerPanel from "./components/ManagerPanel";
// Admin side
import Admin from "./components/Admin";
import PendingUsers from "./components/PendingUsers";
import TicketEdit from "./components/TicketEdit";
import TrainEdit from "./components/TrainEdit";
import Footer from "./components/Footer";

// ➕ Navigasyon yönlendirmesi için ayrı component oluşturuluyor
const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);

    // Yalnızca ana sayfadaysa yönlendir
    if (token && location.pathname === "/") {
      switch (role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "user":
          navigate("/user");
          break;
     
        default:
          navigate("/user");
      }
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) return;
  
    fetch("http://localhost:8080/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🛡️ Token ekliyoruz
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Profil alınamadı");
        return res.json();
      })
      .then((data) => {
        console.log("Profil Bilgisi:", data);
  
        // İsteğe bağlı: rolü localStorage'a kaydedebilirsin
        localStorage.setItem("role", data.role);
      })
      .catch((err) => console.error("Hata:", err));
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/signin");
  };
  

  return (
    <div className="app-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "10px 30px",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#222",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <img
            src={logo}
            alt="Fast Train System Logo"
            style={{ height: "40px", marginRight: "12px", borderRadius: "5px" }}
          />
          RailWave
        </Link>
        <nav style={{ display: "flex", gap: "15px", fontSize: "16px" }}>
          {isLoggedIn ? (
           
                  <Link to="/profile" style={navLinkStyle}>
              Profile
            </Link>
        
          ) : (
            <>
              <Link to="/signin" style={navLinkStyle}>
                Sign In
              </Link>
              <Link to="/register" style={navLinkStyle}>
                Sign Up
              </Link>
            
            </>
          )}
          
          <Link to="/forgot-password" style={navLinkStyle}>
            Forgot Password
          </Link>
          {isLoggedIn &&  <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>}
        
        </nav>
      </header>

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          <Route path="/user" element={<UserHome />} />
          <Route path="/journey-list" element={<JourneyList />} />
          <Route path="/journey/:id" element={<JourneyDetail />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/managerPanel" element={<ManagerPanel />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/pending-users" element={<PendingUsers />} />
          <Route path="/ticket-edit" element={<TicketEdit />} />
          <Route path="/train-edit" element={<TrainEdit />} />

          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

// Navigasyon linkleri için stil
const navLinkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
  transition: "color 0.2s ease",
};

const logoutButtonStyle = {
  background: "none",
  border: "none",
  color: "#e53935",
  fontWeight: "500",
  cursor: "pointer",
  fontSize: "16px",
  padding: "0",
  transition: "color 0.2s ease",
};


// Ana <Router> burada tanımlanıyor
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
