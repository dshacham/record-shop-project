const mongoose = require("mongoose");
// we store the data in the User:
const User = require("../models/userSchema");
// randomly fills fields for testing:
const faker = require("faker");

const main = async () => {
    //connect method built in mongoose. the address we get from running mongo on command. last part is our db
    mongoose.connect("mongodb://127.0.0.1:27017/record-shop", { useNewUrlParser: true, useUnifiedTopology: true });
    //on means listening for the event (open means it's connected with my file):
    mongoose.connection.on("error", (err) => console.log(err));
    mongoose.connection.on("open", () => console.log("database connected"));

    // to delete what we have in the db before we add new users:
    try {
        await User.deleteMany({});
        console.log("removing users collection")
    }
    catch (err) {
        console.log(err);
    };
    //creating empty array and mapping through it (w/o argument since it's null):
    const userPromises = Array(10).fill(null).map(() => {
        // User is a constructor so we create an instance of it:
        const user = new User({
            //must be in the same order of the schema:
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        });

        return user.save(); //this is a promise to store data in db. it won't do anything yet.
    });

    //to resolve all promises at once:
    try {
        await Promise.all(userPromises);
        console.log("users added to the db")
    } //if there's an error:
    catch (err) {
        console.log(err);
    };
};

main();
