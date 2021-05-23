const express = require("express");
const {
    createTutorial,
    editTutorial,
} = require("../../controller/admin/tutorial");
const router = express.Router();

router.post("/admin/tutorial/create", createTutorial);
router.post("/admin/tutorial/edit/:id", editTutorial);

module.exports = router;
