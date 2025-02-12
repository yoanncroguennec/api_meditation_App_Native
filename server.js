// mongodb+srv://sido69:Sido69sido69@mini-mern-tut.v7azh.mongodb.net/Project44_react_mongodb_cloneIMDB?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const cors = require("cors");
// MODELS
const Habit = require("./server/models/Habit_Model");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

//  MONGODB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGO_URL);

// mongoose
//   .connect("mongodb+srv://sido69:Sido69sido69@mini-mern-tut.v7azh.mongodb.net/")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("Error Connecting to MongoDB", error);
//   });

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

// Routes
app.get("/", (req, res) => {
  // res.json("Bienvenue sur l'API");
  // // res.status(300).json({ message: "Bienvenue sur l'API" });
  const userIp = req.ip;
  // console.log(userIp);
  res.send(userIp);
  // return res.json({ userIp });
});

//endpoint to create a habit in the backend
app.post("/habits", async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;

    const newHabit = new Habit({
      title,
      color,
      repeatMode,
      reminder,
    });

    const savedHabit = await newHabit.save();
    res.status(200).json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: "Network error" });
  }
});
