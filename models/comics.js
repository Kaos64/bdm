'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comics = sequelize.define('Comics', {
        title: DataTypes.STRING,
        cover: DataTypes.STRING,
        abstract: DataTypes.TEXT,
        seriesId: DataTypes.INTEGER,
        editorId: DataTypes.INTEGER,
        volume: DataTypes.INTEGER,
        release: DataTypes.DATE,
        reference: DataTypes.STRING,
        weight: DataTypes.STRING,
        size: DataTypes.STRING,
        language: DataTypes.STRING,
        collection: DataTypes.STRING,
        shine: DataTypes.STRING,
        story: DataTypes.STRING,
        pages: DataTypes.INTEGER,
        uri: DataTypes.STRING,
        mime: DataTypes.STRING,
        ext: DataTypes.JSON,
    }, {});
    Comics.associate = function(models) {
        // associations can be defined here
        Comics.belongsToMany(models.Kind, { through: 'ComicsKind' });
        Comics.belongsToMany(models.Author, { through: 'ComicsAuthor' });
    };
    return Comics;
};