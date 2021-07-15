const { Glove, Shop } = require("../../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop
  } catch (error) {
    next(error)
  }
}

exports.shopFetch = async (req, res, next) => {
  try {
    const shopes = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Glove,
        as: "gloves",
        attributes: ["id"]
      }
    });
    res.json(shopes);
  } catch (error) {
    next(error)
  }
};

exports.createShop = async (req, res, next) => {
  try {
    const foundShop = await Shop.findOne({
      where: { userId: req.user.id }
    })
    if (foundShop) {
      const error = new Error("You Already own a Shop")
      error.status = 400
      return next(error)
    }
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`
    req.body.userId = req.user.id;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop); //will show on the post man the content
  } catch (error) {
    next(error)
  }
};

exports.createGlove = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`
      req.body.shopId = req.shop.id
      const newGlove = await Glove.create(req.body);
      res.status(201).json(newGlove); //will show on the post man the content
    } else {
      const error = new Error("Unauthrozied")
      error.status = 401
      return next(error)
    }
  } catch (error) {
    next(error)
  }
};