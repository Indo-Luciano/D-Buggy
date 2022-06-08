const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("In tickets");
// });

// Database Connect
const mysql = require("mysql2");
const { append } = require("express/lib/response");

const con = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: `d-buggy_db`,
});

con.connect(function (err) {
  if (err) throw err;
  //   console.log("Connected");
});

router.get("/tickets", (req, res, next) => {
  const tickets = con.query(
    "SELECT * FROM tickets",
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.render("index", { tickets: tickets });
    }
  );
});

module.exports = router;
