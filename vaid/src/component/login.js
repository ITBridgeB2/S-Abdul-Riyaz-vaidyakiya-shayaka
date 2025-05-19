import "./../css/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPageComponent() {
    const navigate = useNavigate();

    const [role, setRole] = useState("user"); // Default to "user"
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleNavigation = () => {
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const login = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/${role}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Login successful") {
                    localStorage.setItem("email", loginData.email);
                    alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Logged In Successfully!`);
                    if (role === "admin") {
                        navigate("/adminDashboard");
                    } else if (role === "manager") {
                        navigate("/managerDashboard");
                    } else {
                        navigate("/userHome");
                    }
                } else {
                    alert(data.error || "Login failed");
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                alert("Login failed due to server error.");
            });
    };

    return (
        <div>
            <header>
                <nav className="loginNavbar">
                    <h2>Vaid</h2>
                </nav>
            </header>
            <main>
                <h2>Login</h2>
                <form onSubmit={login}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="role">Role:</label></td>
                                <td>
                                    <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="user">👤 User</option>
                                        <option value="manager">🧑‍💼 Manager</option>
                                        <option value="admin">🛡️ Admin</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="email">Email:</label></td>
                                <td><input onChange={handleChange} name="email" type="email" placeholder="Enter Email" required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="password">Password:</label></td>
                                <td><input onChange={handleChange} name="password" type="password" placeholder="Enter Password" required /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className="button-row">
                                        <button className="center" type="submit">Log In</button>
                                        <button className="center" type="button" onClick={handleNavigation}>Back</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </main>
        </div>
    );
}

export default LoginPageComponent;
