'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Authors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstname: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATE
            },
            country: {
                type: Sequelize.STRING
            },
            biography: {
                type: Sequelize.STRING
            },
            photo: {
                type: Sequelize.STRING
            },
            fullname: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Authors');
    }
};