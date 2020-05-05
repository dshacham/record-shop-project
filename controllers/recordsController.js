// const db = require("../models/db");
const createError = require("http-errors");
const Record = require("../models/recordSchema");
const jwt = require("jsonwebtoken");

exports.getRecords = async (req, res, next) => {
    // let records = db.get("records").value();
    try {

        const records = await Record.find();
        res.json({ success: true, records: records });
    }
    catch (err) {
        next(err);
    };
};

exports.getRecord = async (req, res, next) => {
    const { id } = req.params;
    // let record = db.get("records").find({ id: req.params.id });
    try {
        const record = await Record.findById(id);
        if (!record) throw createError(500);
        res.json({ success: true, record: record });
    }
    catch (err) {
        next(err);
    };
};

exports.postRecord = async (req, res, next) => {
    // db.get("records").push(req.body).last().assign({ id: new Date().toString() }).write();
    try {
        const record = new Record(req.body);
        await record.save();
        res.json({ success: true, record: record });
    }
    catch (err) {
        next(err);
    };
};

exports.putRecord = async (req, res, next) => {
    const { id } = req.params;
    const record = req.body;
    // db.get("records").find({ id }).assign(record).write();
    try {
        const updateRecord = await Record.findByIdAndUpdate(id, record, { new: true });
        if (!updateRecord) throw createError(404);
        res.json({ success: true, record: updateRecord });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteRecord = async (req, res, next) => {
    const { id } = req.params;
    // const record = db.get("records").remove({ id }).write();
    try {
        const record = await Record.findByIdAndDelete(id);
        if (!record) throw createError(404);
        res.json({ success: true, record: record });
    }
    catch (err) {
        next(err);
    };
};
