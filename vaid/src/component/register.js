import "./../css/register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPageComponent() {
    const navigate = useNavigate();
    const handleNavigation = () =>
{
    navigate("/")
}    
    const [formData, setFormData] = useState({
        name: "",
        bpl: "",
        age: "",
        tel: "",
        tel2: "",
        email: "",
        password: "",
        Cpassword: "",
        gender: "",
        Gname: "",
        relation: "",
        Gtel: "",
        disease: "",
        diseaseDetails: "",
        file: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.bpl) newErrors.bpl = "BPL number  is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Valid email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.Cpassword)
            newErrors.Cpassword = "Passwords do not match";
        if (!formData.tel || formData.tel.length !== 10)
            newErrors.tel = "Phone number must be 10 digits";
        if (!formData.tel2 || formData.tel2.length !== 10)
            newErrors.tel2 = "Phone number must be 10 digits";
        if (!formData.gender) newErrors.gender = "Please select gender";
        if (!formData.age || isNaN(formData.age)) 
            newErrors.age = "Valid age is required";
        if(!formData.Gname) newErrors.Gname = "Guardian name is required"
        if(!formData.relation) newErrors.relation = "Guardian relation type  is required"
        if(!formData.Gtel || formData.Gtel.length !== 10) newErrors.Gtel = "Guardian phone number  is required and it should be 10 digit"
        if(!formData.disease) newErrors.disease = "disease type  is required"
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(async (response) => {
                const data = await response.json();
            
                if (response.ok) {
                    alert("Registered Successfully!");
                    navigate("/userHome");
                } else {
                    alert(data.error || "Registration failed");
                }
            })
            .catch((error) => {
                console.error("Registration error:", error);
                alert("Registration failed. Try again.");
            });
            
        }
        // alert("fuck this")
        // fetch("http://localhost:5000/register", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert("Registered Successfully!");
        //     navigate("/userHome");
        // })
        // .catch(error => {
        //     console.error("Registration error:", error);
        //     alert("Registration failed. Try again.");
        // });
        
    };

    return (
        <div>
            <header>
                <nav className="navbar">
                    <h2>Vaid</h2>
                    <button className="button">Admin Login</button>
                   
                </nav>
            </header>

            <main className="registerMain">
                <h2 className="formTitle">Register User</h2>
                <form className="registerForm" onSubmit={handleSubmit}  >
                    <div className="formSection">
                        <h3>Personal Details</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="name">Enter User Name :</label></td>
                                    <td><input placeholder="Enter your User name" id="name" name="name" type="text" onChange={handleChange} value={formData.name} /> {errors.name && <span className="error" >{errors.name}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="bpl">BPL Card Number :</label></td>
                                    <td><input placeholder="Enter BPL Card Number" id="bpl" name="bpl" type="text" onChange={handleChange} value={formData.bpl} /> {errors.bpl && <span className="error" >{errors.bpl}</span>}</td>

                                </tr>
                                <tr>
                                    <td><label htmlFor="age">Age :</label></td>
                                    <td><input placeholder="Enter your Age" id="age" name="age" type="text" onChange={handleChange} value={formData.age} /> {errors.age && <span className="error" >{errors.age}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="tel">Phone Number :</label></td>
                                    <td><input placeholder="Enter Phone Number" id="tel" name="tel" type="text"  onChange={handleChange} value={formData.tel} /> {errors.tel && <span className="error" >{errors.tel}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="tel2">Alternate Number :</label></td>
                                    <td><input placeholder="Enter Alternate Number" id="tel2" name="tel2" type="text"  onChange={handleChange} value={formData.tel2} /> {errors.tel2 && <span className="error" >{errors.tel2}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="email">Email :</label></td>
                                    <td><input placeholder="Enter your Email Address" id="email" name="email" type="email" onChange={handleChange} value={formData.email} />
                                        {errors.email && <span className="error">{errors.email}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="password">Password :</label></td>
                                    <td><input placeholder="Enter Password" id="password" name="password" type="password"  onChange={handleChange} value={formData.password} /> {errors.password && <span className="error" >{errors.password}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="Cpassword">Confirm Password :</label></td>
                                    <td><input placeholder="Confirm Password" id="Cpassword" name="Cpassword" type="password"  onChange={handleChange} value={formData.Cpassword} /> {errors.Cpassword && <span className="error" >{errors.Cpassword}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label>Gender :</label></td>
                                    <td style={{display:"flex"}}>
                                        <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Male </label>
                                        <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
                                        {errors.gender && <span className="error">{errors.gender}</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="formSection">
                        <h3>Guardian Details</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="Gname">Guardian Name :</label></td>
                                    <td><input placeholder="Enter your Guardian name" id="Gname" name="Gname" type="text"  onChange={handleChange} value={formData.Gname} /> {errors.Gname && <span className="error" >{errors.Gname}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="relation">Relation :</label></td>
                                    <td><input placeholder="Enter your relation" id="relation" name="relation" type="text"  onChange={handleChange} value={formData.relation} /> {errors.relation && <span className="error" >{errors.relation}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="Gtel">Guardian Tel Number :</label></td>
                                    <td><input placeholder="Enter Guardian tel number" id="Gtel" name="Gtel" type="text"  onChange={handleChange} value={formData.Gtel} /> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="formSection">
                        <h3>Disease Details</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="disease">Disease Name :</label></td>
                                    <td><input placeholder="Enter Disease name" id="disease" name="disease" type="text"  onChange={handleChange} value={formData.disease} /> {errors.disease && <span className="error" >{errors.disease}</span>}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="diseaseDetails">Details about Disease :</label></td>
                                    <td><input placeholder="Enter Disease details" id="diseaseDetails" type="text" /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="file">Attach File :</label></td>
                                    <td><input type="file" id="file" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="center">
                        <button className="button" type="submit">Register</button>
                        <button className="button" type="button" onClick={handleNavigation}>Back</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default RegisterPageComponent;


