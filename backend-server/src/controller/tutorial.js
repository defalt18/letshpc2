const Tutorial = require("../models/tutorial");

exports.getAllTutorials = (req, res) => {
    Tutorial.find({}).exec((err, Tutorial) => {
        if (err)
            return res.status(400).json({
                message: "Somethings went wrong",
            });
        return res.status(200).json({
            message: "All Tutorial fetched",
            Tutorials: Tutorial,
        });
    });
};

exports.getTutorial = (req, res) => {
    Tutorial.findById(req.params.id).exec((err, Tutorial) => {
        if (err)
            return res.status(400).json({
                message: "Somethings went wrong",
            });
        return res.status(200).json({
            message: "Tutorial fetched successfully",
            Tutorials: Tutorial,
        });
    });
};
