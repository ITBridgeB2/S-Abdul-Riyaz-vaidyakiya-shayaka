import React, { useState, useEffect } from "react";
import "./../../css/adminHospital.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API requests

function AdminHospitalComponent() {
    const [showPopup, setShowPopup] = useState(false);
    const [viewPopup, setviewPopup] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState({});
    const [hospitals, setHospitals] = useState([]);
    const [editingHospital, setEditingHospital] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        speciality: "",
        email: "",
        contact_number: "",
        location: ""
    });

    const navigate = useNavigate();

    // Fetch hospitals from backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/hospitals")
            .then((res) => setHospitals(res.data))
            .catch((err) => console.error("Fetch error:", err));
    }, []);
    //this is for popup and toggle button
    const closePopup = (hospital) => {
        setSelectedHospital(hospital);
        setviewPopup(true);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    //navigating to dashboard
    const navgateToDashboard = () => {
        navigate("/adminDashboard");
    };

    //navigate to manager dashboard
    const navigateToManager = () => {
        navigate("/adminManager")
    }

    //taking value from inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    //for deleting hospital
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this hospital?")) {
            axios.delete(`http://localhost:5000/api/hospitals/${id}`)
                .then(() => {
                    alert("Hospital Deleted")
                    setHospitals(prev => prev.filter(h => h.id !== id));
                })
                .catch(err => console.error("Delete error:", err));
        }
    };
    //for updating the hospital details
    const handleEdit = (hospital) => {
        setEditingHospital(hospital);
        setFormData(hospital);
        setShowPopup(true);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingHospital) {
            // Update existing
            axios.put(`http://localhost:5000/api/hospitals/${editingHospital.id}`, formData)
                .then(() => {
                    setHospitals(prev => prev.map(h => h.id === editingHospital.id ? formData : h));
                    alert("Hospital Details Updated Successfully")
                    togglePopup();
                    setEditingHospital(null);
                    resetForm();
                })
                .catch(err => console.error("Update error:", err));
        } else {
            // Add new
            axios.post("http://localhost:5000/api/hospitals", formData)
                .then((res) => {
                    setHospitals((prev) => [...prev, { ...formData, id: res.data.id }]);
                    alert("Hospital added successfully")
                    togglePopup();
                    resetForm();
                })
                .catch((err) => console.error("Add error:", err));
        }
    };

    const resetForm = () => {
        setFormData({
            name: "", department: "", speciality: "",
            email: "", contact_number: "", location: ""
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
                    <a onClick={navgateToDashboard}>Dashboard</a>
                    <a>Hospitals</a>
                    <a onClick={navigateToManager}>Managers</a>
                </div>

                <div className="hospitalDasboard">
                    <h1>Hospital :-</h1>
                    <div className="addHospital">
                        <h3>Add Government Hospitals</h3>
                        <button className="button" onClick={togglePopup}>Add +</button>
                    </div>

                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Add Hospital</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>Hospital Name:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                    <label>Department:</label>
                                    <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                                    <label>Speciality:</label>
                                    <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} required />
                                    <label>Email:</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                    <label>Contact Number:</label>
                                    <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
                                    <label>Location:</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                                    <div className="popup-buttons">
                                        <button type="submit" className="button">Submit</button>
                                        <button type="button" className="button cancel" onClick={togglePopup}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <h2>Hospitals List</h2>
                    <div className="hospitalList">
                        {hospitals.map((app, index) => (
                            <div className="hospital" key={index}>
                                <h3>{app.name}</h3>
                                <div className="buttonList">
                                    <button className="button" onClick={() => closePopup(app)}>View</button>
                                    <button className="button green" onClick={() => handleEdit(app)}>Update</button>
                                    <button className="button red" onClick={() => handleDelete(app.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {viewPopup && (
                        <div className="popupOverlay">
                            <div className="popup">
                                <h3>Hospital Name: {selectedHospital.name}</h3>
                                <p>Department: {selectedHospital.department}</p>
                                <p>Speciality: {selectedHospital.speciality}</p>
                                <p>Email: {selectedHospital.email}</p>
                                <p>Contact: {selectedHospital.contact_number}</p>
                                <p>Location: {selectedHospital.location}</p>
                                <button className="button" onClick={() => setviewPopup(false)}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer>
                <div className="footer">
                    <p>All Right Reserved || Vaidhyakiya shayaka || Copyright Claim</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminHospitalComponent;
