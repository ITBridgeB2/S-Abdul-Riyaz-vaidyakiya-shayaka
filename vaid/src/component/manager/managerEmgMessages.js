import { useState } from "react";
import "../../css/managerDashboard.css";
import { useNavigate } from "react-router-dom";
function ManagerEmgMessageComponent() {
    const [popupData, setPopupData] = useState(null);
     const navigate = useNavigate();

    const messages = [
        {
            name: "Mike Ross",
            message: "This is emergency. Please respond immediately!",
        },
        {
            name: "Rachel Zane",
            message: "Urgent: Critical patient needs doctor support.",
        },
        {
            name: "Harvey Specter",
            message: "Immediate attention needed in ICU ward.",
        },
    ];

    const handleRead = (msg) => {
        setPopupData(msg);
    };

    const closePopup = () => {
        setPopupData(null);
    };

     const handleNavigate = () =>{
navigate("/managerDashboard")
    }


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
                  
                    <a onClick={handleNavigate}>Dashboard</a>
                    
                    <a>Emergency Message</a>
                </div>

                <div className="emgMessages">
                    <h2>Emergency Messages</h2>
                    {messages.map((msg, i) => (
                        <div className="message" key={i}>
                            <div>
                                <h3>{msg.name}</h3>
                                <p>{msg.message.slice(0, 40)}...</p>
                            </div>
                            <button className="button" onClick={() => handleRead(msg)}>Read</button>
                        </div>
                    ))}
                </div>

                {popupData && (
                    <div className="popupOverlay">
                        <div className="popup fadeIn">
                            <h3>From: {popupData.name}</h3>
                            <p>{popupData.message}</p>
                            <button className="button" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </main>

            <footer>
                <div className="footer">
                    <p>All Right Reserved || Vaidhyakiya Shayaka || Copyright Claim</p>
                </div>
            </footer>
        </div>
    );
}

export default ManagerEmgMessageComponent;
