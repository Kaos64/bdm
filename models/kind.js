'use strict';
module.exports = (sequelize, DataTypes) => {
    const Kind = sequelize.define('Kind', {
        label: DataTypes.STRING
    }, {});
    Kind.associate = function(models) {
        // associations can be defined here
        Kind.belongsToMany(models.Comics, { through: 'ComicsKind' });
    };
    return Kind;
};