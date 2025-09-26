const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API routes
app.use("/api/v1/transactions", transactions);

// 👉 Serve frontend (Vite build)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
