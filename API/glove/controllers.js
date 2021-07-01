let gloves = require("../../data");
const slugify = require('slugify');

exports.gloveFetch = (req, res) => {
    // JSON = JavaScript Object Notation
    res.json(gloves);
};

exports.deleteGlove = (req, res) => {
    const { productId } = req.params;
    const foundProduct = gloves.find(glove => glove.id === +productId)
    if (foundProduct) {
        gloves = gloves.filter(glove => glove.id !== +productId)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Not Found" })
    }
};

exports.createGlove = (req, res) => {
    /* Define the object's value and key */
    const id = gloves.length + 1;
    const slug = slugify(req.body.name, { lower: true }); //lower here to make value lowerCase
    const newProduct = {
        id,
        slug,
        ...req.body
    }
    gloves.push(newProduct) //will push the newProduct to the object 
    res.status(201).json(newProduct) //will show on the post man the content
};

exports.updateGlove = (req, res) => {
    const { productId } = req.params;
    const foundProduct = gloves.find(glove => glove.id === +productId) // will check if the id exist or not
    if (foundProduct) {
        for (const key in req.body) foundProduct[key] = req.body[key] //will update the product depend on the change which key by for loop
        foundProduct.slug = slugify(foundProduct.name, { lower: true }); //lower here to make value lowerCase
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Not Found" })
    }
};
