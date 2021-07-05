module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Glove", {
        name: { type: DataTypes.STRING },
        price: { type: DataTypes.INTEGER },
        detail: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING },
    })
};