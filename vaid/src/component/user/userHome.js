import "./../../css/userHome.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserHomePageComponent() {
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState({});
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email) {
            navigate("/");
            return;
        }
        setUserEmail(email);
        fetch(`http://localhost:5000/api/suggested-hospitals/${email}`)
            .then(res => res.json())
            .then(data => setHospitals(data))
            .catch(err => console.error("Error fetching hospitals:", err));
    }, []);

    const openPopup = (hospital) => {
        setSelectedHospital(hospital);
        setShowPopup(true);
    };

    const closePopup = () => setShowPopup(false);

    const handleLogout = () => {
        localStorage.removeItem("email");
        alert("You have been logged out.");
        navigate("/");
    };

    return (
        <div>
            <header>
                <nav className="Usernavbar">
                    <h2>Vaid</h2>
                    <div className="userInfo">
                        <span className="userEmail">{userEmail}</span>
                        <a onClick={() => alert("Support coming soon!")}>Support</a>
                        <button className="button" onClick={handleLogout}>Log Out</button>
                    </div>
                </nav>
            </header>

            <main>
                {/* Suggested Hospitals */}
                <div className="suggestedHospitals">
                    <h2>Suggested Hospitals</h2>
                    {hospitals.length === 0 ? (
                        <p>No hospitals suggested yet.</p>
                    ) : (
                        hospitals.map((hospital, index) => (
                            <div className="Hospital" key={index}>
                                <div className="hospitalDetails">
                                    <h3>{hospital.name}</h3>
                                    <p>{hospital.department}</p>
                                    <p>{hospital.speciality}</p>
                                    <p>{hospital.email}</p>
                                    <p>{hospital.location}</p>
                                </div>
                                {/* Enable this button if you want popup modal */}
                                {/* <button className='button' onClick={() => openPopup(hospital)}>View More</button> */}
                            </div>
                        ))
                    )}
                </div>

                {/* Features */}
                <div className="featuresSection">
                    <h2>Features</h2>
                    <div className="featuresCards">
                        <div className="featureCard" onClick={() => navigate("/medical-history")}>
                            <h3>View Records</h3>
                            <p>Access your previous medical records and history securely anytime.</p>
                        </div>

                        <div className="featureCard">
                            <h3>Reviews</h3>
                            <p>Read and write reviews about your hospital experiences.</p>
                        </div>
                        <div className="featureCard">
                            <h3>Give Feedback</h3>
                            <p>Send your suggestions or concerns to help us improve your care.</p>
                        </div>
                    </div>
                </div>

                {/* Feedback Form */}
                <div className="feedbackFormSection">
                    <h2>Send Feedback to Admin</h2>
                    <form
                        className="feedbackForm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const message = e.target.elements.message.value;
                            fetch('http://localhost:5000/api/feedback', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: userEmail, message }),
                            })
                                .then(res => res.json())
                                .then(() => {
                                    alert("Feedback sent successfully");
                                    e.target.reset();
                                })
                                .catch(err => console.error("Feedback error:", err));
                        }}
                    >
                        <textarea name="message" placeholder="Write your feedback here..." required />
                        <button className="button" type="submit">Submit Feedback</button>
                    </form>
                </div>

                {/* Optional Popup Modal */}
                {showPopup && (
                    <div className="popupOverlay" onClick={closePopup}>
                        <div className="popup" onClick={(e) => e.stopPropagation()}>
                            <h3>Hospital Name: {selectedHospital.name}</h3>
                            <p>Speciality: {selectedHospital.speciality}</p>
                            <p>Email: {selectedHospital.email}</p>
                            <p>Location: {selectedHospital.location}</p>
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

export default UserHomePageComponent;
