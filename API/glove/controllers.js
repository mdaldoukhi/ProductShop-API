const { Glove } = require("../../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const glove = await Glove.findByPk(productId);
    return glove
  } catch (error) {
    next(error)
  }
}
exports.gloveFetch = async (req, res, next) => {
  try {
    const gloves = await Glove.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(gloves);
  } catch (error) {
    next(error)
  }
};

exports.deleteGlove = async (req, res, next) => {
  try {
    await req.glove.destroy();
    res.status(204).end();
  } catch (error) {
    next(error)
  }
};
exports.updateGlove = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`
    await req.glove.update(req.body);
    res.json(req.glove);
  } catch (error) {
    next(error)
  }
};
