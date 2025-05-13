import "./../css/Home.css";
import { useNavigate } from "react-router-dom";

function HomePageComponent() {
    const navigate = useNavigate();

    return (
        <div>
        <div className="homepage">
            <header className="header">
                <div className="logo">Vaid</div>
                <button className="login" onClick={() => navigate("/login")}>Login</button>
            </header>

            <main className="main-content">
                <div className="text-content">
                    <h1>Welcome to Vaidhyakiya Shayaka</h1>
                    <p>
                        Empowering access to government healthcare with a single platform. 
                        Register to connect with services designed to care for you and your family.
                    </p>
                    <div className="buttons">
                        <button onClick={() => navigate("/register")}>Register</button>
                       
                    </div>
                </div>
            </main>

        </div>
            <footer className="footer">
                <p>© 2025 Vaidhyakiya Shayaka — All rights reserved</p>
            </footer>
        </div>
    );
}

export default HomePageComponent;
