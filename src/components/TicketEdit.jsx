// src/components/TicketEdit.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./TicketEdit.css";

const TicketEdit = () => {
  const navigate = useNavigate();

  // Biletlerin state'i
  const [tickets, setTickets] = useState([
    { id: 1, passengerName: "John Doe", train: "Express 101" },
    { id: 2, passengerName: "Jane Smith", train: "Express 102" },
    { id: 3, passengerName: "Derya Sam", train: "Express 101" },
    { id: 4, passengerName: "Ahmet Kara", train: "Express 102" },
    { id: 5, passengerName: "Alex Botez", train: "Express 102" },
    { id: 6, passengerName: "Seyit Sayman", train: "Express 101" },
  ]);

  // Düzenlenen biletin state'i
  const [editingTicket, setEditingTicket] = useState(null);

  // Bilet düzenleme fonksiyonu
  const editTicket = (ticket) => {
    setEditingTicket({ ...ticket });
  };

  // Bilet kaydetme fonksiyonu
  const saveTicket = () => {
    setTickets(
      tickets.map((t) => (t.id === editingTicket.id ? editingTicket : t))
    );
    setEditingTicket(null); // Düzenleme modunu kapat
  };

  // Düzenleme işlemini iptal etme fonksiyonu
  const cancelEdit = () => {
    setEditingTicket(null);
  };

  // Bilet iptal etme fonksiyonu
  const cancelTicket = (ticket) => {
    setTickets(tickets.filter((t) => t.id !== ticket.id));
  };

  return (
    <div>
      {/* Header bileşeni */}
      <Header />

      {/* Bilet Düzenleme Container'ı */}
      <div className="ticket-edit-container">
        <h1>Edit Tickets</h1>

        {/* Bilet Tablosu */}
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Passenger Name</th>
              <th>Train</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.passengerName}</td>
                <td>{ticket.train}</td>
                <td>
                  <button onClick={() => editTicket(ticket)}>Edit</button>
                  <button onClick={() => cancelTicket(ticket)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Düzenleme Formu */}
        {editingTicket && (
          <div className="edit-form">
            <h2>Edit Ticket</h2>
            <label>Passenger Name:</label>
            <input
              type="text"
              value={editingTicket.passengerName}
              onChange={(e) =>
                setEditingTicket({
                  ...editingTicket,
                  passengerName: e.target.value,
                })
              }
            />
            <label>Train:</label>
            <input
              type="text"
              value={editingTicket.train}
              onChange={(e) =>
                setEditingTicket({ ...editingTicket, train: e.target.value })
              }
            />
            <button onClick={saveTicket}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        )}

        {/* Admin Paneline Dönüş Butonu */}
        <button
          onClick={() => navigate("/admin")}
          className="back-to-admin-button"
        >
          Back to Admin
        </button>
      </div>
    </div>
  );
};

export default TicketEdit;