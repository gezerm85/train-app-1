// src/components/ManagerPanel.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./ManagerPanel.css";

const weeklySalesData = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 180 },
  { day: "Wed", sales: 100 },
  { day: "Thu", sales: 200 },
  { day: "Fri", sales: 250 },
  { day: "Sat", sales: 300 },
  { day: "Sun", sales: 220 },
];
const monthlySalesData = [
  { month: "Jan", sales: 800 },
  { month: "Feb", sales: 900 },
  { month: "Mar", sales: 1200 },
  { month: "Apr", sales: 950 },
  { month: "May", sales: 1300 },
];
const upcomingJourneys = [
  { id: 1, from: "İstanbul", to: "Ankara", time: "08:00" },
  { id: 2, from: "Ankara", to: "Konya", time: "10:00" },
];
const occupancyRate = 78;
const dailyRevenue = 15600;

function ManagerPanel() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ali Veli",
      age: 25,
      gender: "Male",
      phone: "555-1234",
      address: "İstanbul",
    },
  ]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const view = searchParams.get("view");

  const handleHire = (newPerson) => {
    const newId =
      employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    const personToAdd = { id: newId, ...newPerson };
    setEmployees([...employees, personToAdd]);
  };

  return (
    <div className="manager-dashboard-container">
      {/* Ortak header App.jsx'de tanımlı, bu yüzden buradan Header kaldırıldı */}
      <div className="manager-content">
        {view === "employees" ? (
          <EmployeeList employees={employees} />
        ) : (
          <MainDashboard
            occupancyRate={occupancyRate}
            dailyRevenue={dailyRevenue}
            weeklySalesData={weeklySalesData}
            monthlySalesData={monthlySalesData}
            upcomingJourneys={upcomingJourneys}
            onHire={handleHire}
            employees={employees}
          />
        )}
      </div>
    </div>
  );
}

function MainDashboard({
  occupancyRate,
  dailyRevenue,
  weeklySalesData,
  monthlySalesData,
  upcomingJourneys,
  onHire,
  employees,
}) {
  return (
    <>
      <h2>Manager Panel</h2>

      <div className="summary-cards">
        <div className="card">
          <h3>Daily Total Sales</h3>
          <p>{dailyRevenue} TL</p>
        </div>
        <div className="card">
          <h3>Occupancy Rate</h3>
          <p>% {occupancyRate}</p>
        </div>
      </div>

      {/* Side-by-side charts */}
      <div className="chart-row">
        <div className="chart-section">
          <h3>Weekly Sales Chart</h3>
          <BarChart width={300} height={250} data={weeklySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#4facfe" />
          </BarChart>
        </div>

        <div className="chart-section">
          <h3>Monthly Sales Chart</h3>
          <BarChart width={300} height={250} data={monthlySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#ff7f0e" />
          </BarChart>
        </div>
      </div>

      <div className="upcoming-section">
        <h3>Upcoming Journeys</h3>
        <ul>
          {upcomingJourneys.map((j) => (
            <li key={j.id}>
              {j.from} → {j.to} ({j.time})
            </li>
          ))}
        </ul>
      </div>

      <HireForm onHire={onHire} />

      <div className="employee-list">
        <h4>Recently Added Employee(s):</h4>
        {employees.slice(-3).map((emp) => (
          <div key={emp.id}>
            {emp.name} - {emp.gender}, Age: {emp.age}, Phone: {emp.phone}
          </div>
        ))}
      </div>
    </>
  );
}

function HireForm({ onHire }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleHireSubmit = (e) => {
    e.preventDefault();
    if (!name || !surname) {
      alert("Please enter name and surname!");
      return;
    }
    const fullName = `${name} ${surname}`;
    const newPerson = {
      name: fullName,
      age,
      gender,
      phone,
      address,
    };
    onHire(newPerson);

    setName("");
    setSurname("");
    setAge("");
    setGender("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="hire-form">
      <h3>New Employee Hiring</h3>
      <form onSubmit={handleHireSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function EmployeeList({ employees }) {
  return (
    <div className="employee-list">
      <h2>My Employees</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <strong>{emp.name}</strong> ({emp.gender}), {emp.age} years old
            <br />
            Phone: {emp.phone}, Address: {emp.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerPanel;
