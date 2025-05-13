import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../css/adminManager.css";
import { useNavigate } from "react-router-dom";

function AdminManagerComponent() {
    const navigate = useNavigate();
    const [managers, setManagers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [viewPopup, setViewPopup] = useState(false);
    const [selectedManager, setSelectedManager] = useState({});
    const [editingManager, setEditingManager] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        contact: ""
    });

    const API_URL = "http://localhost:5000/api/managers";

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        try {
            const res = await axios.get(API_URL);
            setManagers(res.data);
        } catch (err) {
            console.error("Error fetching managers:", err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //for updating the hospital details
    const handleEdit = (manager) => {
        setEditingManager(manager);
        setFormData(manager);
        setShowPopup(true);
    };

    const handleAddManager = async (e) => {
        e.preventDefault();
        if (editingManager) {
            // Update existing
            axios.put(`http://localhost:5000/api/managers/${editingManager.id}`, formData)
                .then(() => {
                    setManagers(prev => prev.map(h => h.id === editingManager.id ? formData : h));
                    alert("Manager Details Updated Successfully")
                    togglePopup();
                    setEditingManager(null);
                    resetForm();
                })
                .catch(err => console.error("Update error:", err));
        }
        else {
            try {
                await axios.post(API_URL, formData);
                setFormData({ name: "", email: "", password: "", contact: "" });
                setShowPopup(false);
                fetchManagers();
            } catch (err) {
                console.error("Error adding manager:", err);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchManagers();
        } catch (err) {
            console.error("Error deleting manager:", err);
        }
    };

    const togglePopup = () => setShowPopup(!showPopup);

    const openViewPopup = (manager) => {
        setSelectedManager(manager);
        setViewPopup(true);
    };

    const resetForm = () => {
        setFormData({
            name: "", email: "",
            password: "",
            contact: ""
        });
    };

    return (
        <div>
            <header>
                <nav className="navbar">
                    <h2>Vaid</h2>
                    <div>Profile Picture</div>
                </nav>
            </header>

            <main>
                <div className="sidebar">
                    <a onClick={() => navigate("/adminDashboard")}>Dashboard</a>
                    <a onClick={() => navigate("/adminHospital")}>Hospitals</a>
                    <a>Managers</a>
                </div>

                <div className="managerContainer">
                    <h1>Managers</h1>
                    <div className="addManager">
                        <h3>Add Manager</h3>
                        <button className="button" onClick={togglePopup}>Add +</button>
                    </div>

                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Add Manager</h2>
                                <form onSubmit={handleAddManager}>
                                    <label>Name:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                                    <label>Email:</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                    <label>Password:</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                    <label>Contact:</label>
                                    <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required />
                                    <div className="popup-buttons">
                                        <button type="submit" className="button">Submit</button>
                                        <button type="button" className="button cancel" onClick={togglePopup}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <h2>Manager List</h2>
                    <div className="managerList">
                        {managers.map((manager) => (
                            <div className="manager" key={manager.id}>
                                <h3>{manager.name}</h3>
                                <div className="buttonList">
                                    <button className="button" onClick={() => openViewPopup(manager)}>View</button>
                                    <button className="button green" onClick={() => handleEdit(manager)}>Update</button>
                                    <button className="button red" onClick={() => handleDelete(manager.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {viewPopup && (
                        <div className="popupOverlay">
                            <div className="popup">
                                <h3>Manager Name: {selectedManager.name}</h3>
                                <p>Email: {selectedManager.email}</p>
                                <p>Contact: {selectedManager.contact}</p>
                                <button className="button" onClick={() => setViewPopup(false)}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <div className="footer">
                    <p>All Rights Reserved || Vaidhyakiya Shayaka</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminManagerComponent;
