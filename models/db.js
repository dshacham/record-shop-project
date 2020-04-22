const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const file = new FileSync("./models/db.json");
const db = low(file);

//set some defaults (only for the first time running it so it doesn't restart the server endlessly):
// db.defaults({ records: [] })
//     .write()

module.exports = db;