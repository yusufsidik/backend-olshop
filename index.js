import express from "express";
import connection from "./lib/connectionDB.js";

import cors from "cors"

// routes
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import brandRouter from "./routes/brand.route.js"
import productRouter from "./routes/product.route.js"

const app = express();

// middleware to read json
app.use(express.json());

app.use(cors(process.env.CLIENT_URL))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use("/users", userRouter);
app.use("/category", categoryRouter)
app.use("/brand", brandRouter)
app.use("/product", productRouter)

// middleware to handle error
app.use((error, req, res, next) => res.status(error.status || 500).json({ message: error.message, status: error.status }))

app.listen(process.env.PORT, () => {
  connection();
  console.log(`Server is running on port ${process.env.PORT}`);
});