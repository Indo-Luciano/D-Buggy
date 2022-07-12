const { authenticate } = require("passport/lib");

const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const { append } = require("express/lib/response");
const passport = require("passport");
//-----------------------------------------------------
// Auth User

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//-----------------------------------------------------
module.exports = initialize;

const con = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: `d-buggy_db`,
});

con.connect(function (err) {
  if (err) throw err;
  // console.log("Connected");
});
