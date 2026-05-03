import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config()

const app = express();

//middleware
app.use(rateLimiter);
app.use(express.json());


//custom middleware 
app.use((req, res, next) => {
  console.log("hey we got a request , the method is :", req.method);
  next();
})
const PORT = process.env.PORT || 5001;



app.get("/", (req, res) => {
  res.send("its working");
});

app.use("/api/transactions",transactionRoutes)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT :", PORT);
  });
});


