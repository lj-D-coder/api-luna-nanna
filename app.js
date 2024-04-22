import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import routes from "./routes/route.js";

const app = express();
const server = http.createServer(app);

app.use(express.json()); //to parse parse json
app.use(cors());
dotenv.config();
const port = process.env.PORT; // You can change the port as needed
const db_connect = process.env.DB_CONNECT;

//Routes

app.use("/cms/api", routes);

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(db_connect)
  .then(() => {
    console.log("App connected  to database");
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
