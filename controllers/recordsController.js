const db = require("../models/db");
const createError = require("http-errors");

exports.getRecords = (req, res) => {
    let records = db.get("records").value();
    res.json({ success: true, records: records });
};

exports.getRecord = (req, res) => {
    // const {id} = req.params;
    let record = db.get("records").find({ id: req.params.id });
    res.json({ success: true, record: record });
};

exports.postRecord = (req, res) => {
    console.log(req.body);
    db.get("records").push(req.body).last().assign({ id: new Date().toString() }).write();
    res.json({ success: true, record: req.body });
};

exports.putRecord = (req, res) => {
    const { id } = req.params;
    const record = req.body;
    db.get("records").find({ id }).assign({ record }).write();
    res.json({ success: true, record: record });
};

exports.deleteRecord = (req, res, next) => {
    console.log(req.params.id);
    if (req.params.id !== "1") {
        next(createError(500));
    };
    const { id } = req.params;
    const record = db.get("records").remove({ id }).write();
    res.json({ success: true, record: record });
};
