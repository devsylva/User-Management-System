const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

// log requests
app.use(morgan("tiny"));
// parse request to the body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// mongodb connection
connectDB();

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assests
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/', require('./server/routes/router'));
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
