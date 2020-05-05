exports.log = (req, res, next) => {
    console.log("this is a middleware function");
    next();
};

//import to app.js {log} and use it (log) alone or in a specific route in the app Or in a specific route file - in the get, order, post or delete. When choosing the third option, don't import both in app.js and the route file.