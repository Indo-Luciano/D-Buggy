const { authenticate } = require("passport/lib");

const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const { append } = require("express/lib/response");

// Authenticate User
async function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    // console.log(user);
    // if (err) {
    //   return done(err);
    // }
    // if (!user) {
    //   return done(null, false, { message: "Incorrect email" });
    // }
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      user[0][0].password &&
        (await bcrypt.compareSync(password, user[0][0].password));
      return done(null, user);

      function compareHash(password, hashed) {
        return bcrypt.compareSync(password, hashed);
      }
      // console.log(compareHash(password, user[0][0].password));
      // } else {
      // return done(null, false, { message: "Password Incorrect" });
      // }
    } catch (e) {
      return done(e);
    }
  };

  // ------------------------------------

  passport.use(
    new localStrategy({ usernameField: "email" }, await authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}

// const userId = user[0][0].user_id;
// console.log(userId);

// sessionStorage.setItem("user id", user[0][0].user_id);
// console.log(sessionStorage.getItem("user id"));

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
