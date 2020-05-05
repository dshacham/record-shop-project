const Route = require("express").Router();
const { getOrders, getOrder, postOrder, putOrder, deleteOrder } = require("../controllers/ordersController");
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");

Route.get("/", auth, isAdmin, getOrders);
Route.get("/:id", auth, getOrder);
Route.post("/", auth, postOrder);
Route.put("/:id", auth, putOrder);
Route.delete("/:id", auth, deleteOrder);

/* another way to write it:
Route.route("/")
.get(getOrders)
.post(postOrder)
.put(putOrder)
.delete(deleteOrder); */

module.exports = Route;