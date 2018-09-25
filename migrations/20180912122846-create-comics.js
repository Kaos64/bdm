'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Comics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            cover: {
                type: Sequelize.STRING
            },
            abstract: {
                type: Sequelize.TEXT
            },
            volume: {
                type: Sequelize.INTEGER
            },
            release: {
                type: Sequelize.DATE
            },
            reference: {
                type: Sequelize.STRING
            },
            weight: {
                type: Sequelize.STRING
            },
            size: {
                type: Sequelize.STRING
            },
            language: {
                type: Sequelize.STRING
            },
            collection: {
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
        return queryInterface.dropTable('Comics');
    }
};