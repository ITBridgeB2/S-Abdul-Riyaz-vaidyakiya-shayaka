import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../../css/adminDashboard.css";

function AdminDashboardComponent() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [adminEmail, setAdminEmail] = useState(null);  // State to store the admin's email
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
            navigate("/login");
            return;
        }
        setAdminEmail(storedEmail);

        // Fetch from backend
        fetch("http://localhost:5000/users")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then(data => {
                setApplications(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Error loading user data.");
                setLoading(false);
            });
    }, [navigate]);


    useEffect(() => {
        const storedEmail = localStorage.getItem("email");  // Retrieve admin's email from localStorage
        if (storedEmail) {
            setAdminEmail(storedEmail);
        } else {
            navigate("/login");  // Redirect to login if email is not found
        }
    }, [navigate]);

    const openPopup = (patient) => {
        setSelectedPatient(patient);
        setShowPopup(true);
    };

    const closePopup = () => setShowPopup(false);

    const logout = () => {
        localStorage.removeItem("email");  // Clear admin's email from localStorage
        navigate("/login");  // Redirect to login page
    };

    const support = () => {
        alert("This feauture available soon")
    }
//navigation to hospital dashboard
    const navgateToHospital = () => {
        navigate("/adminHospital")
    }
//navigate to manager dashboard
    const navigateToManager = () => {
        navigate("/adminManager")
    }
    return (
        <div className="container">
            <header>
                <nav className="navbar">
                    <h2>Vaid</h2>
                    <div className="navbarRight">
                        {adminEmail && (
                            <span className="adminEmail"> {adminEmail}</span>
                        )}
                        <a className="supportLink" onClick={support}>Support</a>
                        <button className="button" onClick={logout}>Logout</button>
                    </div>
                </nav>
            </header>
            <main>
                <div className="sidebar">
                    <a href="#dashboard" className="sidebarLink">Dashboard</a>

                    <a className="sidebarLink" onClick={navgateToHospital}>Hospitals</a>
                    <a href="#managers" className="sidebarLink" onClick={navigateToManager}>Managers</a>
                </div>
                <div className="content">
                    <div className="Dashboard">
                        <h1>Dashboard :-</h1>
                        <div className="statCards">
                            <div className="card">
                                <h3>Total Patient</h3>
                                <p>100+</p>
                            </div>
                            <div className="card">
                                <h3>Total Hospitals</h3>
                                <p>20+</p>
                            </div>
                            <div className="card">
                                <h3>Total Managers</h3>
                                <p>10+</p>
                            </div>
                        </div>
                        <div className="recentApplication">
                            <h2>All Application</h2>
                            {loading && <p>Loading...</p>}
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            {!loading && !error && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th><th>Email</th><th>Tel-No</th><th>Disease</th><th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((app, index) => (
                                            <tr key={index}>
                                                <td>{app.name}</td>
                                                <td>{app.email}</td>
                                                <td>{app.tel}</td>
                                                <td>{app.disease}</td>
                                                <td><button className="button" onClick={() => openPopup(app)}>View</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                    </div>
                </div>

                {/* Popup Modal */}
                {showPopup && (
                    <div className="popupOverlay">
                        <div className="popup">
                            <h3>Patient Name: {selectedPatient.name}</h3>
                            <p>Email: {selectedPatient.email}</p>
                            <p>Phone: {selectedPatient.tel}</p>
                            <p>Disease: {selectedPatient.disease}</p>
                            <button className="button" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </main>

            <footer>
                <div className="footer">
                    <p>All Right Reserved || Vaidhyakiya shayaka || Copyright Claim</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminDashboardComponent;
