'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Comics',
            'shine', {
                type: Sequelize.STRING
            }
        ).then(() => {
            return queryInterface.addColumn(
                'Comics',
                'pages', {
                    type: Sequelize.INTEGER
                }
            )
        }).then(() => {
            return queryInterface.addColumn(
                'Comics',
                'story', {
                    type: Sequelize.STRING
                }
            )
        }).then(() => {
            return queryInterface.addColumn(
                'Comics',
                'uri', {
                    type: Sequelize.STRING
                }
            )
        }).then(() => {
            return queryInterface.addColumn(
                'Comics',
                'mime', {
                    type: Sequelize.STRING
                }
            )
        }).then(() => {
            return queryInterface.addColumn(
                'Comics',
                'ext', {
                    type: Sequelize.JSON
                }
            )
        }).then(() => {
            return queryInterface.addColumn(
                'Series',
                'ext', {
                    type: Sequelize.JSON
                }
            )
        }).then(() => {
            return queryInterface.addColumn(
                'Authors',
                'ext', {
                    type: Sequelize.JSON
                }
            )
        });

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Comics', 'shine'
        ).then(() => {
            return queryInterface.removeColumn(
                'Comics', 'pages'
            )
        }).then(() => {
            return queryInterface.removeColumn(
                'Comics', 'story'
            )
        }).then(() => {
            return queryInterface.removeColumn(
                'Comics', 'uri'
            )
        }).then(() => {
            return queryInterface.removeColumn(
                'Comics', 'mime'
            )
        }).then(() => {
            return queryInterface.removeColumn(
                'Comics', 'ext'
            )
        }).then(() => {
            return queryInterface.removeColumn(
                'Series', 'ext'
            )
        }).then(() => {
            return queryInterface.removeColumn(
                'Authors', 'ext'
            )
        });
    }
};