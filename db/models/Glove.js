const SequelizeSlugify = require("sequelize-slugify")
module.exports = (sequelize, DataTypes) => {
    const Glove = sequelize.define("Glove", {
        name: { type: DataTypes.STRING, allowNull: false },
        slug: {
            type: DataTypes.STRING,
            unique: true    
        },
        price: { type: DataTypes.INTEGER, validate: { min: 1 }, defaultValue: 1 },
        detail: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING },
    })
    SequelizeSlugify.slugifyModel(Glove, { source: ['name'] });

    return Glove
};