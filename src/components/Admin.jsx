import React, { useEffect, useState, useCallback } from "react";

const citiesOfTurkey = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye",
  "Düzce"
];

const Admin = () => {
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({ name: "", city: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchStations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/stations/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setStations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("İstasyon verisi alınamadı:", err);
      setStations([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  const addStation = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/stations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("İstasyon eklenemedi");

      setForm({ name: "", city: "" });
      fetchStations();
    } catch (err) {
      console.error("İstasyon ekleme hatası:", err);
    }
  };

  const deleteStation = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/stations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("İstasyon silinemedi");

      fetchStations();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Station Management</h1>

      <form onSubmit={addStation} className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
        <input
          type="text"
          placeholder="Station Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        <select
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          required
        >
          <option value="">Select City</option>
          {citiesOfTurkey.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Add Station
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-600">Loading stations...</p>
      ) : stations.length === 0 ? (
        <p className="text-center text-gray-400">No stations available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 shadow-sm rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <tr key={station.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{station.id}</td>
                  <td className="p-3 border">{station.name}</td>
                  <td className="p-3 border">{station.city}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => deleteStation(station.id)}
                      className="text-red-500 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
