import "./../../css/managerDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManagerDashboardComponent() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [patients, setPatients] = useState([]);
    const [patientCount, setPatientCount] = useState(0);
    const [hospitalCount, setHospitalCount] = useState(0);
    const [managerEmail, setmanagerEmail] = useState(null);  // State to store the manager email

    // const managerEmail = localStorage.getItem("managerEmail");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");  // Retrieve admin's email from localStorage
        if (storedEmail) {
            setmanagerEmail(storedEmail);
        } else {
            navigate("/login");  // Redirect to login if email is not found
        }
    }, [navigate]);

    useEffect(() => {
        fetchPatients();
        fetchCounts();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users");
            setPatients(res.data);
        } catch (err) {
            console.error("Error fetching patients:", err);
        }
    };

    const fetchCounts = async () => {
        try {
            const pRes = await axios.get("http://localhost:5000/api/users-count");
            const hRes = await axios.get("http://localhost:5000/api/hospital-count");
            setPatientCount(pRes.data.total);
            setHospitalCount(hRes.data.total);
        } catch (err) {
            console.error("Error fetching counts:", err);
        }
    };

    const openPopup = (patient) => {
        setSelectedPatient(patient);
        setShowPopup(true);
    };

    const closePopup = () => setShowPopup(false);

    const handleLogout = () => {
        localStorage.removeItem("managerEmail");
        navigate("/login"); // Make sure this route exists
    };

    return (
        <div>
            <header>
                <nav className="navbar">
                    <h2>Vaid</h2>
                    <div className="navbar-profile">
                        <span>{managerEmail}</span>
                        <a>Support</a>
                        <button onClick={handleLogout} className="button red">Logout</button>
                    </div>
                </nav>
            </header>

            <main>
                <div className="sidebar">

                    <a>Dashboard</a>
                    <a>Emergency Message</a>

                </div>

                <div className="Dashboard">
                    <h1>Dashboard :-</h1>
                    <div className="statCards">
                        <div className="card">
                            <h3>Total Patients</h3>
                            <p>{patientCount}</p>
                        </div>
                        <div className="card">
                            <h3>Total Hospitals</h3>
                            <p>{hospitalCount}</p>
                        </div>
                    </div>

                    <div className="recentApplication">
                        <h2>Patient List</h2>
                        <table>
                            <thead>
                                <tr><th>Name</th><th>Email</th><th>Contact</th><th>Disease</th><th>Details</th></tr>
                                <tr><th>Name</th><th>Email</th><th>Contact</th><th>Disease</th></tr>
                            </thead>
                            <tbody>
                                {patients.map((patient, index) => (
                                    <tr key={index}>
                                        <td>{patient.name}</td>
                                        <td>{patient.email}</td>
                                        <td>{patient.contact}</td>
                                        <td>{patient.disease}</td>
                                        <td>
                                            <button className="button" onClick={() => openPopup(patient)}>View</button>
                                        </td>
                                        <td>{patient.tel}</td>
                                        <td>{patient.disease}</td>
                                        {/* <td>
                                            <button className="button" onClick={() => openPopup(patient)}>View</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popup Modal */}
                {showPopup && (
                    <div className="popupOverlay">
                        <div className="popup">
                            <h3>Patient Name: {selectedPatient.name}</h3>
                            <p>Email: {selectedPatient.email}</p>
                            <p>Contact: {selectedPatient.contact}</p>
                            <p>Contact: {selectedPatient.tel}</p>
                            <p>Disease: {selectedPatient.disease}</p>
                            <button className="button" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </main>

            <footer>
                <div className="footer">
                    <p>All Rights Reserved || Vaidhyakiya Shayaka</p>
                </div>
            </footer>
        </div>
    );
}

export default ManagerDashboardComponent;
