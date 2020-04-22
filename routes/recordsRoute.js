const Route = require("express").Router();
const { getRecords, getRecord, postRecord, putRecord, deleteRecord } = require("../controllers/recordsController");

Route.get("/", getRecords);
Route.get("/:id", getRecord);
Route.post("/", postRecord);
Route.put("/:id", putRecord);
Route.delete("/:id", deleteRecord);

/* another way to write it:
Route.route("/")
.get(getRecords)
.post(postRecord)
.put(putRecord)
.delete(deleteRecord); */

module.exports = Route;