// const db = require("../models/db");
const createError = require("http-errors");
const Order = require("../models/oderSchema");

exports.getOrders = async (req, res, next) => {
    // let orders = db.get("orders").value();
    try {
        const orders = await Order.find().populate("record", "-__v -year -img");
        res.json({ success: true, orders: orders });
    }
    catch (err) {
        next(err);
    };
};

exports.getOrder = async (req, res, next) => {
    // let order = db.get("orders").find({ id: req.params.id });
    const { id } = req.params;
    try {
        //populate=get info from record and show it, 2nd argument=what we don't want to see, always with -
        const order = await Order.findById(id).populate("record", "-__v -year -img");
        if (!order) throw createError(500);
        res.json({ success: true, order: order });
    }
    catch (err) {
        next(err);
    };
};

exports.postOrder = async (req, res, next) => {
    // db.get("orders").push(req.body).last().assign({ id: new Date().toString() }).write();
    try {
        const order = new Order(req.body);
        await order.save();
        res.json({ success: true, order: order });
    }
    catch (err) {
        next(err);
    };
};

exports.putOrder = async (req, res, next) => {
    const { id } = req.params;
    const order = req.body;
    // db.get("orders").find({ id }).assign(order).write();
    try {
        const updateOrder = await Order.findByIdAndUpdate(id, order, { new: true });
        if (!updateOrder) throw createError(404);
        res.json({ success: true, order: updateOrder });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteOrder = async (req, res, next) => {
    // const order = db.get("orders").remove({ id }).write();
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) throw createError(404);
        res.json({ success: true, order: order });
    }
    catch (err) {
        next(err);
    };
};
