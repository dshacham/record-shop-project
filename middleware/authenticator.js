const User = require("../models/userSchema");
const createError = require("http-errors");

const auth = async (req, res, next) => {
    //receive token from header
    const token = req.header("x-auth");

    try {
        //verify token with the func we created
        const user = await User.findByToken(token);
        if (!user) throw createError(403);

        //once all clear we attach our user/token to the user/token in request and send it further
        req.user = user;
        req.token = token;

        next();
    }
    catch (err) {
        next(err);
    };

};

module.exports = auth;