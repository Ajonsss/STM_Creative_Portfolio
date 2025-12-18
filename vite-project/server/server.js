const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'portfolio_db'
});

db.connect((err) => {
    if (err) console.error('❌ Database Error:', err);
    else console.log('✅ Connected to XAMPP MySQL Database');
});

// FILE UPLOAD SETUP
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// --- API ROUTES ---

// 1. PROJECTS (Modified to Order by ID DESC)
app.get('/api/projects', (req, res) => {
    // ORDER BY id DESC ensures the newest project (highest ID) comes first, 
    // and the first uploaded project (lowest ID) is shown last.
    db.query("SELECT * FROM projects ORDER BY id DESC", (err, result) => { 
        if (err) return res.status(500).send(err); 
        res.json(result); 
    });
});

app.post('/api/projects', upload.array('images', 10), (req, res) => {
    const { title, desc, fullDetails, duration, company } = req.body;
    
    let imagePath = '';
    if (req.files && req.files.length > 0) {
        const paths = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
        imagePath = paths.join(',');
    }

    const sql = "INSERT INTO projects (title, description, full_details, duration, company, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [title, desc, fullDetails, duration, company, imagePath], (err, result) => { if (err) return res.status(500).send(err); res.json({ success: true }); });
});

app.put('/api/projects/:id', upload.array('images', 10), (req, res) => {
    const { title, desc, fullDetails, duration, company } = req.body;
    
    if (req.files && req.files.length > 0) {
        const paths = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
        const imagePath = paths.join(',');
        
        db.query("UPDATE projects SET title=?, description=?, full_details=?, duration=?, company=?, image_url=? WHERE id=?", 
            [title, desc, fullDetails, duration, company, imagePath, req.params.id], 
            (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); }
        );
    } else {
        db.query("UPDATE projects SET title=?, description=?, full_details=?, duration=?, company=? WHERE id=?", 
            [title, desc, fullDetails, duration, company, req.params.id], 
            (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); }
        );
    }
});

app.delete('/api/projects/:id', (req, res) => {
    db.query("DELETE FROM projects WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true });
    });
});

// 2. SKILLS
app.get('/api/skills', (req, res) => { db.query("SELECT * FROM skills", (err, res2) => { if (err) return res.status(500).send(err); res.json(res2); }); });
app.post('/api/skills', (req, res) => { const { title, category } = req.body; db.query("INSERT INTO skills (title, category) VALUES (?, ?)", [title, category], (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); }); });
app.delete('/api/skills/:id', (req, res) => { db.query("DELETE FROM skills WHERE id=?", [req.params.id], (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); }); });

// 3. TIMELINE
app.get('/api/timeline', (req, res) => { db.query("SELECT * FROM timeline ORDER BY id DESC", (err, res2) => { if (err) return res.status(500).send(err); res.json(res2); }); });
app.post('/api/timeline', (req, res) => { const { type, title, subtitle, duration, description } = req.body; db.query("INSERT INTO timeline (type, title, subtitle, duration, description) VALUES (?, ?, ?, ?, ?)", [type, title, subtitle, duration, description], (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); }); });
app.delete('/api/timeline/:id', (req, res) => { db.query("DELETE FROM timeline WHERE id=?", [req.params.id], (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); }); });

// 4. PROFILE
app.get('/api/profile', (req, res) => { db.query("SELECT * FROM profile LIMIT 1", (err, res2) => { if (err) return res.status(500).send(err); res.json(res2[0] || {}); }); });
app.post('/api/profile', upload.single('image'), (req, res) => {
    const { bio } = req.body;
    if (req.file) {
        const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
        db.query("UPDATE profile SET bio=?, image_url=? WHERE id=1", [bio, imagePath], (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); });
    } else {
        db.query("UPDATE profile SET bio=? WHERE id=1", [bio], (err) => { if (err) return res.status(500).send(err); res.json({ success: true }); });
    }
});

// 5. LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) res.json({ success: true, user: result[0] });
        else res.json({ success: false, message: "Invalid credentials" });
    });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));