// const db = require("../models/db");
// const { validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
    // let users = db.get("users").value();
    try {
        const users = await User.find(); //finding (all) data in the collection
        res.json({ success: true, users: users });
    }
    catch (err) {
        next(err);
    };
};

exports.getUser = async (req, res, next) => {
    // let user = db.get("users").find({ id: req.params.id });
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) throw createError(404);
        res.json({ success: true, user: user });
    }
    catch (err) {
        next(err);
    };
};

exports.postUser = async (req, res, next) => {
    // db.get("users").push(req.body).last().assign({ id: new Date().toString() }).write();
    try {
        //example:
        // let errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     console.log(errors);
        //     let err = errors.errors.map(er => ({ [er.param]: er.msg }))
        //     throw { status: 203, message: err };
        // };

        const user = new User(req.body);
        const token = user.generateAuthToken();
        await user.save();

        const data = user.getPublicFields();

        res.header("x-auth", token).json({ success: true, user: data });
    }
    catch (err) {
        next(err);
    };
};

exports.putUser = async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    // db.get("users").find({ id }).assign(user).write();
    try {
        const updateUser = await User.findByIdAndUpdate(id, user, { new: true }); // to get the updated version
        if (!updateUser) throw createError(500);
        res.json({ success: true, user: updateUser });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteUser = async (req, res, next) => {
    // const user = db.get("users").remove({ id }).write();
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw createError(404);
        res.json({ success: true, user: user });
    }
    catch (err) {
        next(err);
    };
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        // if (!user) throw createError(404);
        const valid = await user.checkPassword(password);
        if (!valid) throw createError(403);

        // let token = jwt.sign({ _id: user._id }, "secretKey");
        let token = user.generateAuthToken();
        const data = user.getPublicFields();
        // user.tokens.push({token})
        // user.save();
        // res.header("test", token);
        // res.json({ success: true, message: `Welcome, ${user.firstName}!` });
        res.header("x-auth", token).json({ success: true, user: data });
    }
    catch (err) {
        next(err);
    };
};