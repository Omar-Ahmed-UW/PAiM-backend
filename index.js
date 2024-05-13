const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// session: app.use(session) for login/signup

// route all incoming routes for /api/ to app.js
app.use("/api", require("./src/app.js"));

app.get("/", (req, res) => res.status(200).send("PAiM Backend"));

app.get("*", (req, res) => {
  res.status(404).send("404 error!");
});

app.listen(port, () => console.log("Server running on port " + port));
