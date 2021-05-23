const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const tutorialSchema = require("mongoose").Schema(
    {
        tutorialName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            min: 3,
            max: 50,
        },
        level: {
            type: String,
            enum: ["beginner", "medium", "advance"],
            default: "beginner",
        },
        tutorialInfo: {
            type: String,
        },
        tutorialAbout: {
            type: String,
        },
        sampleCode: {
            code: { type: String },
            input: { type: String },
            output: { type: String },
        },
    },
    { timestamps: true }
);

module.exports = new mongoose.model("Tutorial", tutorialSchema);
