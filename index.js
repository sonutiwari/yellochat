const express = require("express");
require("dotenv").config();
const rootRouter = require("./routers/rootRouter");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", rootRouter);
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("App is running on PORT", process.env.PORT);
  }
});
