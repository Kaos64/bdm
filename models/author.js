'use strict';
module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        firstname: DataTypes.STRING,
        name: DataTypes.STRING,
        birthday: DataTypes.DATE,
        country: DataTypes.STRING,
        biography: DataTypes.STRING,
        photo: DataTypes.STRING,
        fullname: DataTypes.STRING,
        ext: DataTypes.JSON,
    }, {});
    Author.associate = function(models) {
        // associations can be defined here
        Author.belongsToMany(models.Comics, { through: 'ComicsAuthor' });
    };
    return Author;
};