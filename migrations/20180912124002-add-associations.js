'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
                'Comics',
                'seriesId', {
                    type: Sequelize.INTEGER,
                    reference: {
                        model: 'Series',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                }
            )
            .then(() => {
                return queryInterface.createTable('ComicsKind', {
                    comicsId: {
                        allowNull: false,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    kindId: {
                        allowNull: false,
                        primaryKey: true,
                        type: Sequelize.INTEGER
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
            })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Comics',
            'seriesId'
        ).then(() => {
            return queryInterface.dropTable('ComicsKind');
        })
    }
};