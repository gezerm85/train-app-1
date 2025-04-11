// src/components/PendingUsers.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./PendingUsers.css";

const PendingUsers = () => {
  const navigate = useNavigate();

  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, name: "Deniz Demir", email: "deniz@example.com" },
    { id: 2, name: "Güneş Yaz", email: "gunes@example.com" },
    { id: 3, name: "Ayşe Yılmaz", email: "ayse@example.com" },
    { id: 4, name: "Daisy Brown", email: "daisy@example.com" },
    { id: 5, name: "Mehmet Çelik", email: "mehmet@example.com" },
  ]);

  // Kullanıcı ekleme fonksiyonu
  const addUser = (user) => {
    console.log("User added:", user);
    // Burada kullanıcıyı onaylama işlemi yapılabilir (örneğin, API çağrısı)
    setPendingUsers(pendingUsers.filter((u) => u.id !== user.id)); // Kullanıcıyı listeden kaldır
  };

  // Kullanıcı silme fonksiyonu
  const deleteUser = (user) => {
    console.log("User deleted:", user);
    // Burada kullanıcıyı reddetme işlemi yapılabilir (örneğin, API çağrısı)
    setPendingUsers(pendingUsers.filter((u) => u.id !== user.id)); // Kullanıcıyı listeden kaldır
  };

  return (
    <div>
      <Header />
      <div className="pending-users-container">
        <h1>Pending Users</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => addUser(user)}>Add</button>
                  <button onClick={() => deleteUser(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Admin Paneline Dönüş Butonu */}
        <button onClick={() => navigate("/admin")} className="back-to-admin-button">
          Back to Admin Panel
        </button>
      </div>
    </div>
  );
};

export default PendingUsers;