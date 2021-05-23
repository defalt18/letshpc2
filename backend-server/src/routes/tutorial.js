const express = require("express");
const { getAllTutorials, getTutorial } = require("../controller/tutorial");
const router = express.Router();

router.get("/tutorial", getAllTutorials);
router.get("/tutorial/:id", getTutorial);


module.exports = router;
