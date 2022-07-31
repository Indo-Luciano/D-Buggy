const { authenticate } = require("passport/lib");

const passport = require("passport");
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
}

// ------------------------------------

//   passport.use(
//     new localStrategy({ usernameField: "email" }, await authenticateUser)
//   );
//   passport.serializeUser((user, done) => done(null, user));
//   passport.deserializeUser((user, done) => {
//     return done(null, user);
//   });
// }

// /**
//  * Module dependencies.
//  */
// var pause = require("pause"),
//   util = require("util"),
//   Strategy = require("passport-strategy");

// /**
//  * `SessionStrategy` constructor.
//  *
//  * @api public
//  */
// function SessionStrategy(options, deserializeUser) {
//   if (typeof options == "function") {
//     deserializeUser = options;
//     options = undefined;
//   }
//   options = options || {};

//   Strategy.call(this);
//   this.name = "session";
//   this._deserializeUser = deserializeUser;
// }

// /**
//  * Inherit from `Strategy`.
//  */
// util.inherits(SessionStrategy, Strategy);

// /**
//  * Authenticate request based on the current session state.
//  *
//  * The session authentication strategy uses the session to restore any login
//  * state across requests.  If a login session has been established, `req.user`
//  * will be populated with the current user.
//  *
//  * This strategy is registered automatically by Passport.
//  *
//  * @param {Object} req
//  * @param {Object} options
//  * @api protected
//  */
// SessionStrategy.prototype.authenticate = function (req, options) {
//   if (!req._passport) {
//     return this.error(new Error("passport.initialize() middleware not in use"));
//   }
//   options = options || {};

//   var self = this,
//     su;
//   if (req._passport.session) {
//     su = req._passport.session.user;
//   }

//   if (su || su === 0) {
//     // NOTE: Stream pausing is desirable in the case where later middleware is
//     //       listening for events emitted from request.  For discussion on the
//     //       matter, refer to: https://github.com/jaredhanson/passport/pull/106

//     var paused = options.pauseStream ? pause(req) : null;
//     this._deserializeUser(su, req, function (err, user) {
//       if (err) {
//         return self.error(err);
//       }
//       if (!user) {
//         delete req._passport.session.user;
//       } else {
//         // TODO: Remove instance access
//         var property = req._passport.instance._userProperty || "user";
//         req[property] = user;
//       }
//       self.pass();
//       if (paused) {
//         paused.resume();
//       }
//     });
//   } else {
//     self.pass();
//   }
// };

// /**
//  * Expose `SessionStrategy`.
//  */
// module.exports = SessionStrategy;
//------------------------------------------------------

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
