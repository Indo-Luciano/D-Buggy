if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const axios = require("axios");
const cors = require("cors");
const methodOverride = require("method-override");
const ticketRouter = require("./routes/tickets");

router.use(express.urlencoded({ extended: false }));

// SESSION SETUP
router.use(flash());
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));
// router.use('/_add-ticket', ticketRouter)

// Login / Register pages
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

// exporting variables for use in other modules
module.exports = router;

// connect to mysql db
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
  console.log("Connected");
});

// registering user to database
router.post("/register", checkNotAuthenticated, async (req, res) => {
  // 10-12 rounds because it will be almost impossible to reverse engineer
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = hashedPassword;

  con.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
    [first_name, last_name, email, password],
    (err, result) => {
      if (err) {
        res.redirect("/register");
      } else {
        res.redirect("/login");
        console.log("Sent");
      }
    }
  );
});

// Logout
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// call user by email and return user already with account

// login user (authenticating user data from db)
async function getUserByEmail(email) {
  const result = await con
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);
  return result;
}

// async function getUserById(user_id, email) {
//   const result = await con
//     .promise()
//     .query("SELECT * FROM users WHERE user_id = ?", [user_id]);
//   return result;
//   console.log(result);
// }

// login user (authenticating user data from db)
const initializePassport = require("./passport-config");
initializePassport(passport, getUserByEmail);

// // TODO login for demo user
// router.post("/login", async (req, res) => {
//   function demoLogin(email, password) {
//     con.query(
//       "SELECT * FROM users WHERE email === demo@user AND password === password"[
//         (email, password)
//       ]
//     );
//   }
// });

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

// TODO TODO TODO

// Everything in ./routes/tickets is through /tickets

router.post("/add-ticket", async (req, res, done) => {
  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  const title = req.body.title;
  const category = req.body.category;
  const priority = req.body.priority;
  const description = req.body.description;
  const user_id = 6;
  const date = new Date();
  // const date = getDay(), '/',
  console.log(date);

  // TODO FIX
  // const user = con.query("SELECT SESSION-USER_ID");
  // console.log(user);

  // console.log(user);

  con.query(
    "INSERT INTO tickets (title, description, date, category_category_id, users_user_id, priority_priority_id) VALUES (?,?,?,?,?,?)",
    [title, description, date, category, user_id, priority],
    (err, result, done) => {
      if (err) {
        // return done({ message: "Error Submitting" });
        res.redirect("/");
        console.log(err);
      } else {
        res.redirect("/");
        console.log("Ticket Sent");
      }
    }
  );
});

router.use("/tickets", ticketRouter);

// router.get("/add-ticket", (req, res) => {
//   res.render("_add-ticket.ejs");
// });

// TODO FIX
router.get("/", checkAuthenticated, async (req, res) => {
  const tickets = await getAllTickets();
  console.log(tickets);
  res.render("index", { tickets: tickets[0] });
});

async function getAllTickets() {
  const result = await con.promise().query("SELECT * FROM tickets");
  return result;
}
