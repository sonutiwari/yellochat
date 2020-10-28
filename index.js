const express = require("express");
const rootRouter = require("./routers/rootRouter");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", rootRouter);
app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("App is running on PORT", PORT);
  }
});
