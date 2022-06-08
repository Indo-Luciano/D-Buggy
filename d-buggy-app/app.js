"use strict";

// (งᴗ‸ᴗ)ง        ~ Indo

const exp = require("constants");
const express = require("express");
const path = require("path");

// calling variables from other modules
const routes = require("./routes");

const app = express();

// app.get()
// app.post()
// app.put()
// app.delete()

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// calling css
// static files
app.use(express.static("public"));

// app.use(database);

app.use(routes);

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

// ---------------------------------------------------------------------------------
