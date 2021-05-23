const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = require("mongoose").Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        hashPassword: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hashPassword);
    },
};

module.exports = new mongoose.model("User", userSchema);
