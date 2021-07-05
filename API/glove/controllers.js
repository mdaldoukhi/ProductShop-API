const { Glove } = require("../../db/models");

exports.gloveFetch = async (req, res) => {
  try {
    const gloves = await Glove.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(gloves);
  } catch (error) {
    res.status(500).json({ meesage: error.message });
  }
};
exports.createGlove = async (req, res) => {
  try {
    const newGlove = await Glove.create(req.body);
    res.status(201).json(newGlove); //will show on the post man the content
  } catch (error) {
    res.status(500).json({ meesage: error.message });
  }
};
exports.deleteGlove = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Glove.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ meesage: error.message });
  }
};
exports.updateGlove = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Glove.findByPk(productId); // will check if the id exist or not
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ meesage: error.message });
  }
};
