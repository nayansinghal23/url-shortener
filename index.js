const express = require("express");
const path = require("path");
const router = require("./routes/url.js");
const connectDB = require("./connect.js");
const URL = require("./models/url.js");
const staticRouter = require("./routes/staticRouter.js");
const userRouter = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const {
  restrictToLoggesInUserOnly,
  checkAuth,
} = require("./middlewares/auth.js");

const app = express();

// Database
connectDB("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.use("/url", restrictToLoggesInUserOnly, router);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
});

app.listen(5000, () => {
  console.log("Server started on PORT 5000");
});
