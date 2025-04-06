const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/timetracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const timeSchema = new mongoose.Schema({
  domain: String,
  time: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

const TimeLog = mongoose.model("TimeLog", timeSchema);

app.post("/track", async (req, res) => {
  const { domain, time, category } = req.body;
  await TimeLog.create({ domain, time, category });
  res.sendStatus(200);
});

app.get("/report", async (req, res) => {
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const data = await TimeLog.aggregate([
    { $match: { date: { $gte: lastWeek } } },
    { $group: { _id: "$category", totalTime: { $sum: "$time" } } }
  ]);
  res.json(data);
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
