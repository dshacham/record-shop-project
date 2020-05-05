const Route = require("express").Router();
const { getUsers, getUser, postUser, putUser, deleteUser, login } = require("../controllers/usersController");
// const { body } = require("express-validator");
const { validateInputs } = require("../middleware/validator");
const auth = require("../middleware/authenticator");

Route.get("/", auth, getUsers);
Route.get("/:id", auth, getUser);
// Route.post("/", /*adding middleware(s) to validate (array for readability):*/[body("email").isEmail().withMessage("Invalid Email"), body("password").isLength({ min: 6 }).withMessage("Password too short")],/*end of middlewares*/ postUser);
Route.post("/", validateInputs(), postUser);
Route.post("/login", login);
Route.put("/:id", auth, putUser);
Route.delete("/:id", deleteUser);

/* another way to write it:
Route.route("/")
.get(getUsers)
.post(postUser)
.put(putUser)
.delete(deleteUser); */

module.exports = Route;