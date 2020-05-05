const bcrypt = require("bcrypt");

exports.encrypt = async (password) => {
    if (!password) return ""; //if the user doesn't provide password
    return await bcrypt.hash(password, 10); //how many characters the password should be
};

exports.compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};