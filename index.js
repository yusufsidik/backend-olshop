import express from "express";
import connection from "./lib/connectionDB.js";

// routes
import userRoute from "./routes/user.route.js";

const port = 3000;
const app = express();

app.use(express.json());


app.use("/users", userRoute);


app.use((error, req, res, next) => {

  res.status(error.status || 500)

  res.json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack
  })
})

app.listen(port, () => {
  connection();
  console.log(`Server is running on port ${port}`);
});