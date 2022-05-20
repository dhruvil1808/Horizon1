const mongoose = require("mongoose");
const schema = mongoose.Schema; //create a schema

const userSchema = new schema( //creating a schema
    {
        email: { type: String, required: true },
        pno: { type: String, required: true },
        dob: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);
const buyerUser = mongoose.model("buyerUser", userSchema); //creating a model with schema
module.exports = buyerUser;