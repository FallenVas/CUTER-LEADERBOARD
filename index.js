const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config();
mongoose.connect(
  proccess.env.MONGODB_URI,
);
const connection = mongoose.connection;
connection.on("open", () => console.log("connected"));
connection.on("error", console.error.bind(console, "connection error:"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get("/twitterUsers", async (req, res) => {
  const collection = connection.db.collection("users");
  let users = await collection.findOne({});
  users = users.users;
  users.reverse();
  for(let i = 0; i<users.length;i++){
    users[i].rank = i+1
  }
  res.json(users);
});
app.get("/previousWinners", async (req, res) => {
    const collection = await connection.db.collection("weekly");
    let users = await collection.find({}).toArray();
    console.log(users)
    users = users[users.length-1]
    users = users.users;
    users.reverse();
    for(let i = 0; i<users.length;i++){
      users[i].rank = i+1
    }
    res.json(users.slice(0,11));
  });
app.listen(port)
