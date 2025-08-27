import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

export default function App() {
  const [searchId, setSearchId] = useState("");

  const [id, setId] = useState("");       // Book ID field
  const [name, setName] = useState("");   // Book Name
  const [email, setEmail] = useState(""); // Email

  const handleSearch = async () => {
    if (!searchId) return alert("Enter Book ID to search");
    try {
      const { data } = await API.get(`/books/${searchId}`);
      setId(String(data.id));
      setName(data.name);
      setEmail(data.email);
    } catch {
      alert("Book not found");
    }
  };

  const handleSave = async () => {
    if (!name || !email) return alert("Book Name and Email are required");
    try {
      const { data } = await API.post("/books/", { name, email });
      setId(String(data.id)); // show DB id after save
      setSearchId(String(data.id));
      alert("Saved!");
    } catch (e) {
      alert(e?.response?.data?.detail || "Error saving book");
    }
  };

  const handleModify = async () => {
    if (!id) return alert("Search or enter an ID to update");
    try {
      await API.put(`/books/${id}`, { name, email });
      alert("Updated!");
    } catch (e) {
      alert(e?.response?.data?.detail || "Error updating book");
    }
  };

  const handleDelete = async () => {
    if (!id) return alert("Search or enter an ID to delete");
    if (!confirm(`Delete book ${id}?`)) return;
    try {
      await API.delete(`/books/${id}`);
      alert("Deleted!");
      handleClear();
    } catch (e) {
      alert(e?.response?.data?.detail || "Error deleting book");
    }
  };

  const handleClear = () => {
    setSearchId("");
    setId("");
    setName("");
    setEmail("");
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <h1>Book Store Data Entry Form</h1>
        <div className="search">
          <input
            type="number"
            placeholder="Book ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn btn-search" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Card */}
      <div className="card">
        <div className="row">
          <label>Book ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Returned by DB"
          />
        </div>

        <div className="row">
          <label>Book Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Learning Python"
          />
        </div>

        <div className="row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="learning.python@books.com"
          />
        </div>

        <div className="actions">
          <button className="btn btn-save" onClick={handleSave}>Save</button>
          <button className="btn btn-modify" onClick={handleModify}>Modify</button>
          <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
          <button className="btn btn-clear" onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  );
}
