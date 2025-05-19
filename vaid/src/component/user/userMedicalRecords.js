import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../css/medicalHistory.css";

function MedicalHistoryComponent() {
    const [record, setRecord] = useState(null);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("email");
        if (!userEmail) {
            navigate("/");
        } else {
            setEmail(userEmail);
            fetch(`http://localhost:5000/api/medical-history/${userEmail}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch data");
                    return res.json();
                })
                .then((data) => {
                    if (data && data.length > 0) {
                        const updated = data.map((record) => ({
                            ...record,
                            severity: record.severity || "Moderate"
                        }));
                        setRecord(updated[0]); // only one record expected
                    } else {
                        setRecord(null);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching medical history:", err);
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("email");
        alert("You were logged out");
        navigate("/");
    };

    const handleNavigation = () => {
        navigate("/userHome");
    };

    return (
        <div className="mh-container">
            <nav className="mh-navbar">
                <h2 className="mh-logo">Vaid</h2>
                <div className="mh-user-controls">
                    <span className="mh-email">{email}</span>
                    <a className="mh-home-link" onClick={handleNavigation}>Home</a>
                    <button className="mh-logout-btn" onClick={handleLogout}>Log Out</button>
                </div>
            </nav>

            <main className="mh-main">
                <div className="mh-content-wrapper">
                    <h2 className="mh-title">Your Medical Record</h2>
                    {!record ? (
                        <p className="mh-message">Loading or no history found.</p>
                    ) : (
                        <div className="mh-record-card">
                            <div className="mh-disease-block">
                                <h3>Disease Details</h3>
                                <p><strong>Name:</strong> {record.diseaseName}</p>
                                <p><strong>Description:</strong> {record.diseaseDescription}</p>
                                <p><strong>Severity:</strong> {record.severity}</p>
                            </div>

                            <div className="mh-hospital-block">
                                <h4>Suggested Hospitals</h4>
                                <ul className="mh-hospital-list">
                                    {record.hospitals && Array.isArray(record.hospitals) && record.hospitals.length > 0 ? (
                                        record.hospitals.map((hosp, idx) => (
                                            <li key={idx}>
                                                {hosp.type === "General" && "🏥 "}
                                                {hosp.type === "Specialized" && "🧬 "}
                                                {hosp.type === "Clinic" && "🩺 "}
                                                <strong>{hosp.name}</strong> - {hosp.location}
                                            </li>
                                        ))
                                    ) : (
                                        <p>No hospitals available.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <footer className="mh-footer">
                <p>© 2025 Vaidhyakiya Shayaka. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default MedicalHistoryComponent;
