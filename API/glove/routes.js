const express = require("express");
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
    if(glove) {
        req.glove = glove;
        next()
    }else {
        const error = new Error("Glove Not Found");
        error.status = 404;
        next(error)
    }
})
/* Read Routes */
router.get("/", gloveFetch);

/* Delete Routes */
router.delete("/:productId", deleteGlove);

/* Create Routes */
router.post("/", createGlove);

/* Updates Routes */
router.put("/:productId", updateGlove);

module.exports = router;