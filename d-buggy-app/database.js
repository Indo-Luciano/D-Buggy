// connect to mysql db
const mysql = require("mysql2");

const con = mysql.createConnection({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "$!nd0LuC!4n0$",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});
