// src/components/Admin.jsx
import React, { useState } from "react";
import "./Admin.css";
import Header from "./Header";

const Admin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Deniz Demir", email: "deniz@example.com" },
    { id: 2, name: "Güneş Yaz", email: "gunes@example.com" },
  ]);

  const [tickets, setTickets] = useState([
    { id: 1, passengerName: "John Doe", train: "Express 101" },
    { id: 2, passengerName: "Jane Smith", train: "Express 102" },
  ]);

  const [trains, setTrains] = useState([
    { id: 1, name: "Express 101", route: "Ankara - Istanbul", price: 150 },
    { id: 2, name: "Express 102", route: "Istanbul - Izmir", price: 120 },
  ]);

  return (
    <div>
      {/* Header ile admin linkleri dropdown’da */}
      <Header />

      <div className="admin-container">
        <h1>Welcome, Admin!</h1>

        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Tickets</h2>
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Passenger Name</th>
              <th>Train</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.passengerName}</td>
                <td>{t.train}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Trains</h2>
        <table>
          <thead>
            <tr>
              <th>Train ID</th>
              <th>Train Name</th>
              <th>Route</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((tr) => (
              <tr key={tr.id}>
                <td>{tr.id}</td>
                <td>{tr.name}</td>
                <td>{tr.route}</td>
                <td>{tr.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
