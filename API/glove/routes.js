const express = require("express");
const {
    gloveFetch,
    deleteGlove,
    createGlove,
    updateGlove,
} = require("./controllers");
const router = express.Router();

/* Read Routes */
router.get("/", gloveFetch);

/* Delete Routes */
router.delete("/:productId", deleteGlove);

/* Create Routes */
router.post("/", createGlove);

/* Updates Routes */
router.put("/:productId", updateGlove);

module.exports = router;