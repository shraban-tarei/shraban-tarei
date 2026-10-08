const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
    host: "gateway01.ap-northeast-1.prod.aws.tidbcloud.com",
    port: 4000,
    user: "Vz7E5j5jZoa7u5A.root",
    password: "IJl19d1DZsthYHW9",
    database: "friends_db",

    ssl: {
        minVersion: "TLSv1.2"
    }
});

db.connect((err) => {
    if (err) {
        console.log("❌ MySQL connection failed");
        console.log(err.message);
        return;
    }

    console.log("✅ MySQL connected successfully!");
});

app.use(express.json());

app.use(express.static("public"));

app.post("/submit", (req, res) => {

    const { name, mobile, email, department } = req.body;

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 Website running on port ${PORT}`);
});
