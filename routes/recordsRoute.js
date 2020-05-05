const Route = require("express").Router();
const { getRecords, getRecord, postRecord, putRecord, deleteRecord } = require("../controllers/recordsController");
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, getRecords);
Route.get("/:id", auth, getRecord);
Route.post("/", auth, isAdmin, postRecord);
Route.put("/:id", auth, isAdmin, putRecord);
Route.delete("/:id", auth, isAdmin, deleteRecord);

/* another way to write it:
Route.route("/")
.get(getRecords)
.post(postRecord)
.put(putRecord)
.delete(deleteRecord); */

module.exports = Route;