const { body, validationResult } = require('express-validator');

exports.validateInputs = () => {
    return [
        body("email") //what are we validating
            .isEmail()
            .normalizeEmail() //makes email lowercase
            .withMessage("Invalid Email"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password too short"),

        body("firstName")
            .notEmpty() //null
            .exists() //avoid duplicates - usually for username
            .trim() //remove extra spaces
            .escape() //remove special characters
            .withMessage("Invalid First Name"),

        (req, res, next) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                let err = errors.errors.map(er => ({ [er.param]: er.msg }));
                return res.json({ status: 203, message: err });
            };
            next();
        }
    ];
};