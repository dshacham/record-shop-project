const express = require("express");
const app = express();
//error handler must be above the Routes
const createError = require("http-errors");
const indexRoute = require("./routes/indexRoute");
const recordsRoute = require("./routes/recordsRoute");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", indexRoute);
app.use("/records", recordsRoute);

//middleware in case there's an error in the prev. methods:
app.use((req, res, next) => {
    next(createError(404));
});

//error catcher - if we get an error in the prev func:
app.use((err, req, res, next) => {
    res.json({ status: err.status, err: err.message });
});

app.listen(port, () => console.log("Server is running..."));