const Tutorial = require("../../models/tutorial");

exports.createTutorial = (req, res) => {
    const {
        tutorialName,
        level,
        tutorialInfo,
        tutorialAbout,
        sampleCode,
        testCase,
    } = req.body;
    console.log("call from here");
    const _tutorial = new Tutorial({
        tutorialName,
        level,
        tutorialInfo,
        tutorialAbout,
        sampleCode,
        testCase,
    });

    _tutorial.save((error, tutorial) => {
        if (error) {
            return res
                .status(400)
                .json({ message: "Something went wrong123", error: error });
        }
        if (tutorial) {
            return res.status(201).json({
                message: "Tutorial successfully created",
                Tutorial: tutorial,
            });
        }
    });
};

exports.editTutorial = (req, res) => {
    Tutorial.findById(req.params.id).exec((err, tutorial) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        if (tutorial) {
            req.body.tutorialName != null &&
                (tutorial.tutorialName = req.body.tutorialName);
            req.body.level != null && (tutorial.level = req.body.level);
            req.body.tutorialInfo != null &&
                (tutorial.tutorialInfo = req.body.tutorialInfo);
            req.body.tutorialAbout != null &&
                (tutorial.tutorialAbout = req.body.tutorialAbout);
            req.body.sampleCode != null &&
                (tutorial.sampleCode = req.body.sampleCode);
            req.body.testCase != null &&
                (tutorial.testCase = req.body.testCase);
            tutorial.save((error, tutorial) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                        error: error,
                    });
                }
                if (tutorial) {
                    return res.status(201).json({
                        message: "Tutorial updated successfully",
                        Tutorial: tutorial,
                    });
                }
            });
        } else {
            return res.status(400).json({ message: "tutorial not found" });
        }
    });
};
