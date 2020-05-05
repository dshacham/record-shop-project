const express = require("express");
const app = express();
//error handler must be above the Routes
const createError = require("http-errors");
const mongoose = require("mongoose");
const logger = require("morgan");

const indexRoute = require("./routes/indexRoute");
const recordsRoute = require("./routes/recordsRoute");
const usersRoute = require("./routes/usersRoute");
const ordersRoute = require("./routes/orderRoute");
const { setCors } = require("./middleware/security");

const port = process.env.PORT || 3002;

//see seed.js for comments:
mongoose.connect("mongodb://127.0.0.1:27017/record-shop", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("database connected"));

app.use(express.json());
app.use(logger("dev"));
app.use(setCors);

app.use("/", indexRoute);
app.use("/records", recordsRoute);
app.use("/users", usersRoute);
app.use("/orders", ordersRoute);

//middleware in case there's an error in the requests:
app.use((req, res, next) => {
    next(createError(404));
});

//error catcher - if we get an error in the prev func:
app.use((err, req, res, next) => {
    res.json({ status: err.status, err: err.message });
});

app.listen(port, () => console.log(`listening on port ${port}`));