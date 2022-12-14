const md5 = require('md5');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'To-do list database',
        description: 'Develop a To-do list database',
        status: 'in progress',
        created_at: new Date(),
        user_id: 1,
      },
      {
        title: 'To-do list middlewares',
        description: 'Develop To-do list\'s validation middlewares',
        status: 'awaiting',
        created_at: new Date(),
        user_id: 2,
      },
      {
        title: 'To-do list sequelize-setup',
        description: 'Develop a To-do list sequelize setup',
        status: 'complete',
        created_at: new Date(),
        user_id: 1,
      },
      {
        title: 'To-do list backend',
        description: 'Develop a To-do list backend interface',
        status: 'awaiting',
        created_at: new Date(),
        user_id: 3,
      },
      {
        title: 'To-do list frontend',
        description: 'Develop a To-do list frontend interface',
        status: 'awaiting',
        created_at: new Date(),
        user_id: 4,
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
