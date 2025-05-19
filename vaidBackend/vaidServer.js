const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // use your DB password
    database: "vaid_registration" // your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database.");
});

// Registration Route
app.post("/register", (req, res) => {
    const data = req.body;
    const query = `
        INSERT INTO users (name, bpl, age, tel, tel2, email, password, gender, Gname, relation, Gtel, disease, diseaseDetails)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.name, data.bpl, data.age, data.tel, data.tel2,
        data.email, data.password, data.gender, data.Gname,
        data.relation, data.Gtel, data.disease, data.diseaseDetails
    ];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User registered successfully", id: result.insertId });
    });
});

/// Admin Login Route
app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
            res.json({ message: "Login successful", admin: results[0] });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

//User login
app.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        console.log("Query result:", results);  // DEBUG LOG
        
        if (results.length > 0) {
            res.json({ message: "Login successful", admin: results[0] });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

//manager login route
app.post("/manager/login", (req, res) => {
    const email = req.body.email.trim().toLowerCase();
const password = req.body.password.trim();

    // const { email, password } = req.body;
    console.log("Login attempt:", email, password);  // DEBUG LOG

    const query = "SELECT * FROM managers WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        console.log("Query result:", results);  // DEBUG LOG

        if (results.length > 0) {
            res.json({ message: "Login successful", manager: results[0] });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    });
});



//suggesting hospital based on desease details
app.get('/api/suggested-hospitals/:email', (req, res) => {
    const userEmail = req.params.email;

    const getUserDiseaseQuery = 'SELECT disease FROM users WHERE email = ?';
    db.query(getUserDiseaseQuery, [userEmail], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'User not found' });

        const disease = result[0].disease;

        const getHospitalsQuery = 'SELECT * FROM hospitals WHERE speciality LIKE ?';
        db.query(getHospitalsQuery, [`%${disease}%`], (err, hospitals) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(hospitals);
        });
    });
});


// GET all hospitals
app.get('/api/hospitals', (req, res) => {
    const query = 'SELECT * FROM hospitals';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

// GET all users (patients)
app.get("/users", (req, res) => {
    db.query("SELECT name, email, tel, disease FROM users", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// POST a new hospital
app.post('/api/hospitals', (req, res) => {
    const { name, department, speciality, email, contact_number, location } = req.body;
    const query = 'INSERT INTO hospitals (name, department, speciality, email, contact_number, location) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, department, speciality, email, contact_number, location];
    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Insert failed' });
        res.status(201).json({ message: 'Hospital added', id: result.insertId });
    });
});

// PUT update hospital by id
app.put('/api/hospitals/:id', (req, res) => {
    const { id } = req.params;
    const { name, department, speciality, email, contact_number, location } = req.body;
    const query = `
        UPDATE hospitals 
        SET name = ?, department = ?, speciality = ?, email = ?, contact_number = ?, location = ?
        WHERE id = ?
    `;
    const values = [name, department, speciality, email, contact_number, location, id];
    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Update failed' });
        res.json({ message: 'Hospital updated' });
    });
});

// DELETE hospital by id
app.delete('/api/hospitals/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM hospitals WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Delete failed' });
        res.json({ message: 'Hospital deleted' });
    });
});

// Get all managers
app.get('/api/managers', (req, res) => {
    db.query('SELECT id, name, email, contact FROM managers', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
  
  // Add a new manager
  app.post('/api/managers', async (req, res) => {
    const { name, email, password, contact } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing required fields' });
  
   
  
    db.query(
      'INSERT INTO managers (name, email, password, contact) VALUES (?, ?, ?, ?)',
      [name, email, password, contact],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Manager added', id: result.insertId });
      }
    );
  });
  
  // Update manager
  app.put('/api/managers/:id', async (req, res) => {
    const { name, email, password, contact } = req.body;
    let updateFields = [];
    let values = [];
  
    if (name) { updateFields.push('name = ?'); values.push(name); }
    if (email) { updateFields.push('email = ?'); values.push(email); }
    if (password) {
      
      updateFields.push('password = ?');
      values.push(password);
    }
    if (contact) { updateFields.push('contact = ?'); values.push(contact); }
  
    values.push(req.params.id);
  
    db.query(`UPDATE managers SET ${updateFields.join(', ')} WHERE id = ?`, values, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Manager updated' });
    });
  });
  
  // Delete manager
  app.delete('/api/managers/:id', (req, res) => {
    db.query('DELETE FROM managers WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Manager deleted' });
    });
  });
  
// Get all patients
app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});

// Get patient count
app.get("/api/users-count", (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ total: results[0].total });
    });
});

// Get hospital count
app.get("/api/hospital-count", (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM hospitals", (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ total: results[0].total });
    });
});


app.get("/api/medical-history/:email", (req, res) => {
    const email = req.params.email;

    // Step 1: Fetch user disease info
    const userQuery = `
        SELECT disease AS diseaseName,  diseaseDetails AS diseaseDescription
        FROM users WHERE email = ?
    `;
    db.query(userQuery, [email], (err, userResult) => {
        if (err) return res.status(500).json({ error: err.message });
        if (userResult.length === 0) return res.status(404).json({ error: "User not found" });

        const user = userResult[0];
        const disease = user.diseaseName;

        // Step 2: Fetch matching hospitals (fixed query)
        const hospitalQuery = `
            SELECT name, location
            FROM hospitals
            WHERE speciality LIKE ?
            LIMIT 2
        `;
        db.query(hospitalQuery, [`%${disease}%`], (err, hospitalResult) => {
            if (err) return res.status(500).json({ error: err.message });

            const response = [{
                diseaseName: user.diseaseName,
                diseaseDescription: user.diseaseDescription,
                severity: "Moderate", // Placeholder
                hospitals: hospitalResult
            }];

            res.json(response);
        });
    });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
