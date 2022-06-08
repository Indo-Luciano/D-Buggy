const { authenticate } = require("passport/lib");

const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const { append } = require("express/lib/response");

// LOOK_HERE ⬇️ Added this to check and verify that the function was correctly hashing and comparing the passwords. compareHash function works correctly
// function generateHash(password) {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   return hash;
// }

// // test
// console.log(generateHash("password123"));

// function compareHash(password, hashed) {
//   return bcrypt.compareSync(password, hashed);
// }

// // comparing test to hashed test
// console.log(
//   compareHash(
//     "password123",
//     "$2b$10$1jtCQFcpULY48pFIvSMkHOdw0WhE15oHKd9BcKYXyIwgb9bHM4hBe"
//   )
// );

// SEPERATE ----------------------------

async function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    // console.log(user);
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
      console.log(compareHash(password, user[0][0].password));
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
    console.log(user_id);
  });
}

// Previous code
// // FIX TODO where is it comparing the passwords???
// try {
//   if (
//     await bcrypt.compare(
//       password,
//       con.query("SELECT * FROM users WHERE password = ?", [user.password])
//     )
//   ) {
//     return done(null, user);
//   } else {
//     return done(null, false, { message: "Password incorrect" });
//   }
// } catch (e) {
//   return done(e);
// }

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
