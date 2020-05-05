const mongoose = require("mongoose");
const { Schema } = mongoose; // const Schema = mongoose.Schema
const AddressSchema = require("./addressSchema");
const jwt = require("jsonwebtoken");
const { encrypt, compare } = require("../lib/encryption");

//creating an instance of schema and defining the data we want in the db:
const UserSchema = new Schema(
    {
        firstName: { type: String, required: true }, // or just String if not required

        lastName: { type: String, required: true },

        email: { type: String, required: true },

        role: {
            type: String,
            enum: ["Admin", "User"],
            required: true
        },

        tokens: [
            {
                token: {
                    type: String,
                    require: true
                }
            }
        ],

        password: { type: String, required: true },

        address: AddressSchema //embedding the address schema into the user collection


    }, {
    toObject: {
        virtuals: true
    }/* ,
    toJSON:{
        virtuals:true
    } */
});

// we can create methods like this one that splits the user's name to first and last if they give the full name in one field:
UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`
});

UserSchema.methods.generateAuthToken = function () { //can't use arrow function here
    const user = this; //refers to the UserSchema

    const token = jwt.sign({ _id: user._id }, "secretKey").toString();

    user.tokens.push({ token });

    return token;
};

//send back to the user only what we want them to see
UserSchema.methods.getPublicFields = function () {
    let returnObject = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        _id: this._id
    };
    return returnObject;
};

UserSchema.pre("save", async function (next) { //before using save function run this func
    // if(!this.isModified("password")) return next();
    this.password = await encrypt(this.password);
    next();
});

//check password when user tries to login
UserSchema.methods.checkPassword = async function (password) {
    const user = this;
    return await compare(password, user.password);
};

UserSchema.statics.findByToken = function (token) { //static methods can only be used with the main constructor
    const User = this; //capital U for the main constructor
    let decoded;

    try {
        decoded = jwt.verify(token, "secretKey");
    }
    catch (e) {
        return;
    };

    const user = User.findOne({
        _id: decoded._id,
        // "tokens.token": token //must have quotation when nesting
    }).select("-password -__v"); //select what we don't want to show to the user
    return user;
};

//1st argument: in which db collection we want to store the data(document)
//2nd argument: the document
module.exports = mongoose.model("User", UserSchema); //creating a new collection