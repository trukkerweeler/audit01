require("dotenv").config();

const exp = require("constants");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.APP_PORT

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const auditRoutes = require("./routes/audit");
app.use("/audit", auditRoutes);

const scheduleRoutes = require("./routes/schedule");
app.use("/schedule", scheduleRoutes);

const processRoutes = require("./routes/process");
app.use("/process", processRoutes);

const managerRoutes = require("./routes/manager");
app.use("/manager", managerRoutes);

const checklistRoutes = require("./routes/checklist");
app.use("/checklist", checklistRoutes);

const resultsRoutes = require("./routes/results");
app.use("/results", resultsRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
