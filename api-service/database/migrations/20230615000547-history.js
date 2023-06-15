'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('history', {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'CASCADE',
          },
            symbol: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            time: {
              type: Sequelize.STRING,
              allowNull: false
            },
            open: {
              type: Sequelize.DECIMAL,
              allowNull: false,
            },
            high: {
              type: Sequelize.DECIMAL,
              allowNull: false,
            },
            low: {
              type: Sequelize.DECIMAL,
              allowNull: false,
            },
            close: {
              type: Sequelize.DECIMAL,
              allowNull: false,
            },
            volume: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false,
            },
          created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
