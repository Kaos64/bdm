'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
                'Comics',
                'editorId', {
                    type: Sequelize.INTEGER,
                    reference: {
                        model: 'Editor',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                }
            )
            .then(() => {
                return queryInterface.createTable('ComicsAuthor', {
                    comicsId: {
                        allowNull: false,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    authorId: {
                        allowNull: false,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    type: {
                        allowNull: false,
                        primaryKey: true,
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
            })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Comics', 'EditorId'
        ).then(() => {
            return queryInterface.dropTable('ComicsAuthor');
        });
    }
};