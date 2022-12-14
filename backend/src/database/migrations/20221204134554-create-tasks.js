'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};
