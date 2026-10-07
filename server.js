require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");

const app = express();


// ===============================
// MySQL Database Connection
// ===============================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // TiDB Cloud requires secure TLS connection
    ssl: {
        minVersion: "TLSv1.2"
    }
});


// ===============================
// Connect to MySQL
// ===============================

db.connect((err) => {

    if (err) {
        console.log("❌ MySQL connection failed");
        console.log(err.message);
        return;
    }

    console.log("✅ MySQL connected successfully!");

});


// ===============================
// Allow JSON Data
// ===============================

app.use(express.json());


// ===============================
// Show Website
// ===============================

app.use(express.static("public"));


// ===============================
// Receive Friend Information
// ===============================

app.post("/submit", (req, res) => {

    const {
        name,
        mobile,
        email,
        department
    } = req.body;


    const sql = `
        INSERT INTO friends
        (name, mobile, email, department)
        VALUES (?, ?, ?, ?)
    `;


    db.query(
        sql,
        [name, mobile, email, department],

        (err, result) => {

            if (err) {

                console.log("❌ Database error");
                console.log(err.message);

                return res.status(500).json({
                    success: false
                });

            }


            console.log("✅ Friend information saved!");

            res.json({
                success: true
            });

        }
    );

});


// ===============================
// Start Website
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `🌐 Website running on port ${PORT}`
    );

});