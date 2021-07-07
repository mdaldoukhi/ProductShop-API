const express = require("express");
const multer = require("multer");
const {
    gloveFetch,
    deleteGlove,
    createGlove,
    updateGlove,
    fetchProduct
} = require("./controllers");
const router = express.Router();

/* Middleware that handles fetching */
router.param("productId", async (req, res, next, productId) => {
    const glove = await fetchProduct(productId, next)
    if (glove) {
        req.glove = glove;
        next()
    } else {
        const error = new Error("Glove Not Found");
        error.status = 404;
        next(error)
    }
})

const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage })
/* Read Routes */
router.get("/", gloveFetch);

/* Delete Routes */
router.delete("/:productId", deleteGlove);

/* Create Routes */

/* Updates Routes */
router.put("/:productId", upload.single("image"), updateGlove);

module.exports = router;