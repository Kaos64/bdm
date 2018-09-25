'use strict';
module.exports = (sequelize, DataTypes) => {
    const Editor = sequelize.define('Editor', {
        name: DataTypes.STRING
    }, {});
    Editor.associate = function(models) {
        // associations can be defined here
        Editor.hasMany(models.Comics);
    };
    return Editor;
};