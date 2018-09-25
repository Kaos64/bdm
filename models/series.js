'use strict';
module.exports = (sequelize, DataTypes) => {
    const Series = sequelize.define('Series', {
        name: DataTypes.STRING,
        abstract: DataTypes.TEXT,
        cover: DataTypes.STRING,
        ext: DataTypes.JSON,
    }, {});
    Series.associate = function(models) {
        // associations can be defined here
        Series.hasMany(models.Comics);
    };
    return Series;
};