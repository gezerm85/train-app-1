// src/components/TrainEdit.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./TrainEdit.css";

const TrainEdit = () => {
  const navigate = useNavigate();

  // Trenlerin state'i
  const [trains, setTrains] = useState([
    { id: 1, name: "Express 101", route: "Ankara - Istanbul", price: 150 },
    { id: 2, name: "Express 102", route: "Istanbul - Izmir", price: 120 },
    { id: 3, name: "Night Star", route: "Istanbul - Erzurum", price: 180 },
    { id: 4, name: "Express 404", route: "Istanbul - Ankara", price: 200 },
  ]);

  // Düzenlenen veya eklenen trenin state'i
  const [train, setTrain] = useState({ id: 0, name: "", route: "", price: 0 });
  const [isEditMode, setIsEditMode] = useState(false);

  // Input değişikliklerini yakalama fonksiyonu
  const handleChange = (e) => {
    setTrain({ ...train, [e.target.name]: e.target.value });
  };

  // Tren kaydetme veya güncelleme fonksiyonu
  const saveTrain = () => {
    if (isEditMode) {
      // Güncelleme işlemi
      setTrains(trains.map((t) => (t.id === train.id ? train : t)));
      alert(`Train ${train.name} updated successfully!`);
    } else {
      // Ekleme işlemi
      const newTrain = { ...train, id: trains.length + 1 };
      setTrains([...trains, newTrain]);
      alert(`Train ${newTrain.name} added successfully!`);
    }
    resetForm();
  };

  // Tren silme fonksiyonu
  const deleteTrain = (id) => {
    if (window.confirm("Are you sure you want to delete this train?")) {
      setTrains(trains.filter((t) => t.id !== id));
      alert("Train deleted successfully!");
      resetForm();
    }
  };

  // Tren düzenleme fonksiyonu
  const editTrain = (train) => {
    setIsEditMode(true);
    setTrain(train);
  };

  // Formu sıfırlama fonksiyonu
  const resetForm = () => {
    setTrain({ id: 0, name: "", route: "", price: 0 });
    setIsEditMode(false);
  };

  return (
    <div>
      {/* Header bileşeni */}
      <Header />

      {/* Tren Düzenleme Container'ı */}
      <div className="train-edit-container">
        <h1>{isEditMode ? "Edit Train" : "Add Train"}</h1>

        {/* Tren Ekleme/Düzenleme Formu */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveTrain();
          }}
        >
          <label>Train Name:</label>
          <input
            type="text"
            name="name"
            value={train.name}
            onChange={handleChange}
            required
          />
          <label>Route:</label>
          <input
            type="text"
            name="route"
            value={train.route}
            onChange={handleChange}
            required
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={train.price}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditMode ? "Update" : "Save"}</button>
          {isEditMode && (
            <button type="button" onClick={() => deleteTrain(train.id)}>
              Delete
            </button>
          )}
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>

        <hr />

        {/* Mevcut Trenler Listesi */}
        <h2>Available Trains</h2>
        <table>
          <thead>
            <tr>
              <th>Train ID</th>
              <th>Train Name</th>
              <th>Route</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.route}</td>
                <td>{t.price} TL</td>
                <td>
                  <button onClick={() => editTrain(t)}>Edit</button>
                  <button onClick={() => deleteTrain(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Admin Paneline Dönüş Butonu */}
        <button
          onClick={() => navigate("/admin")}
          className="back-to-admin-button"
        >
          Back to Admin Panel
        </button>
      </div>
    </div>
  );
};

export default TrainEdit;