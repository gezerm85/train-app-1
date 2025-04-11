import React, { useEffect, useState, useCallback } from "react";

const AdminPanel = () => {
  const [stations, setStations] = useState([]);
  const [trips, setTrips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [trains, setTrains] = useState([]);

  const [stationForm, setStationForm] = useState({ name: "", city: "" });
  const [tripForm, setTripForm] = useState({
    trainId: 0,
    departureStationId: 0,
    arrivalStationId: 0,
    departureTime: "",
    arrivalTime: "",
    price: 0,
  });
  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "MALE",
    phoneNumber: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const [stationRes, tripRes, employeeRes, trainRes] = await Promise.all([
        fetch("http://localhost:8080/stations/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8080/trips/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8080/employees/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8080/trains/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const [stationData, tripData, employeeData, trainData] = await Promise.all([
        stationRes.json(),
        tripRes.json(),
        employeeRes.json(),
        trainRes.json(),
      ]);

      setStations(Array.isArray(stationData) ? stationData : []);
      setTrips(Array.isArray(tripData) ? tripData : []);
      setEmployees(Array.isArray(employeeData) ? employeeData : []);
      setTrains(Array.isArray(trainData) ? trainData : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postData = async (url, data, resetForm) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error posting data");
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData = async (url) => {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error deleting data");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 space-y-12">
      <Section title="Stations">
        <Form
          inputs={[
            {
              value: stationForm.name,
              onChange: (e) => setStationForm({ ...stationForm, name: e.target.value }),
              placeholder: "Station Name",
            },
            {
              value: stationForm.city,
              onChange: (e) => setStationForm({ ...stationForm, city: e.target.value }),
              placeholder: "City",
            },
          ]}
          onSubmit={() => postData("http://localhost:8080/stations/", stationForm, () => setStationForm({ name: "", city: "" }))}
        />
        <Table data={stations} onDelete={(id) => deleteData(`http://localhost:8080/stations/${id}`)} />
      </Section>

      <Section title="Trips">
        <Form
          inputs={[
            { value: tripForm.trainId, onChange: (e) => setTripForm({ ...tripForm, trainId: Number(e.target.value) }), placeholder: "Train ID" },
            { value: tripForm.departureStationId, onChange: (e) => setTripForm({ ...tripForm, departureStationId: Number(e.target.value) }), placeholder: "Departure Station ID" },
            { value: tripForm.arrivalStationId, onChange: (e) => setTripForm({ ...tripForm, arrivalStationId: Number(e.target.value) }), placeholder: "Arrival Station ID" },
            { value: tripForm.departureTime, onChange: (e) => setTripForm({ ...tripForm, departureTime: e.target.value }), placeholder: "Departure Time" },
            { value: tripForm.arrivalTime, onChange: (e) => setTripForm({ ...tripForm, arrivalTime: e.target.value }), placeholder: "Arrival Time" },
            { value: tripForm.price, onChange: (e) => setTripForm({ ...tripForm, price: Number(e.target.value) }), placeholder: "Price" },
          ]}
          onSubmit={() => postData("http://localhost:8080/trips/", tripForm, () => setTripForm({ trainId: 0, departureStationId: 0, arrivalStationId: 0, departureTime: "", arrivalTime: "", price: 0 }))}
        />
        <Table data={trips} onDelete={(id) => deleteData(`http://localhost:8080/trips/${id}`)} />
      </Section>

      <Section title="Employees">
        <Form
          inputs={[
            { value: employeeForm.firstName, onChange: (e) => setEmployeeForm({ ...employeeForm, firstName: e.target.value }), placeholder: "First Name" },
            { value: employeeForm.lastName, onChange: (e) => setEmployeeForm({ ...employeeForm, lastName: e.target.value }), placeholder: "Last Name" },
            { value: employeeForm.age, onChange: (e) => setEmployeeForm({ ...employeeForm, age: Number(e.target.value) }), placeholder: "Age" },
            { value: employeeForm.gender, onChange: (e) => setEmployeeForm({ ...employeeForm, gender: e.target.value }), placeholder: "Gender" },
            { value: employeeForm.phoneNumber, onChange: (e) => setEmployeeForm({ ...employeeForm, phoneNumber: e.target.value }), placeholder: "Phone Number" },
            { value: employeeForm.address, onChange: (e) => setEmployeeForm({ ...employeeForm, address: e.target.value }), placeholder: "Address" },
          ]}
          onSubmit={() => postData("http://localhost:8080/employees/", employeeForm, () => setEmployeeForm({ firstName: "", lastName: "", age: 0, gender: "MALE", phoneNumber: "", address: "" }))}
        />
        <Table data={employees} onDelete={(id) => deleteData(`http://localhost:8080/employees/${id}`)} />
      </Section>

      <Section title="Trains">
        <Table data={trains} onDelete={null} />
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    {children}
  </section>
);

const Form = ({ inputs, onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    className="space-y-2 mb-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {inputs.map((input, idx) => (
        <input
          key={idx}
          value={input.value}
          onChange={input.onChange}
          placeholder={input.placeholder}
          className="p-2 border rounded"
          required
        />
      ))}
    </div>
    <button
      type="submit"
      className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Submit
    </button>
  </form>
);

const Table = ({ data, onDelete }) => {
  if (!Array.isArray(data) || data.length === 0) return <p className="text-gray-500">No data found.</p>;

  const headers = Object.keys(data[0]);

  return (
    <table className="min-w-full table-auto border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-2 border text-left capitalize">{h}</th>
          ))}
          {onDelete && <th className="p-2 border text-center">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {headers.map((h, i) => (
              <td key={i} className="p-2 border">{item[h]}</td>
            ))}
            {onDelete && (
              <td className="p-2 border text-center">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminPanel;
