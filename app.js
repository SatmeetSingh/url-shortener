import express from "express";
import dotenv from "dotenv";
import Urlrouter from "./router/url.js";
import Staticrouter from "./router/staticRouter.js";
import connectDb from "./connect.js";
import path from "path";
const app = express();

dotenv.config();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), "public")));

connectDb("mongodb://localhost:27017/url-shortening")
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// router
app.use("/url", Urlrouter);
app.use("/", Staticrouter);

app.listen(port, () => {
  console.log(`Server working at ${port}`);
});
