const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000
mongoose.connect(
  "mongodb+srv://nightzokssa:Nightzokssa1@cluster0.hckks.mongodb.net/SamBroTwitter?retryWrites=true&w=majority"
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

app.listen(port)
