import dotenv from "dotenv";
dotenv.config();

import http from "http";

import connectDB from "./config/db.js";
import app from "./app.js";
import { initSocket } from "./sockets/incidentSocket.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    initSocket(server);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
const express = require("express");
const app = express();

const aiRoutes = require("./routes/ai");

app.use(express.json());

// Register AI routes here
app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});