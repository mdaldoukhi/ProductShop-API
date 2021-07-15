const express = require("express");
const multer = require("multer");
const passport = require("passport");

const {
    shopFetch,
    createShop,
    createGlove,
    fetchShop
} = require("./controllers");

const router = express.Router();

/* Middleware that handles fetching */
router.param("shopId", async (req, res, next, shopId) => {
    const shop = await fetchShop(shopId, next)
    if (shop) {
        req.shop = shop;
        next()
    } else {
        const error = new Error("Shop Not Found");
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

router.get("/", shopFetch);

router.post("/", passport.authenticate("jwt", { session: false }), upload.single("image"), createShop);

router.post("/:shopId/gloves", passport.authenticate("jwt", { session: false }), upload.single("image"), createGlove);

module.exports = router;


