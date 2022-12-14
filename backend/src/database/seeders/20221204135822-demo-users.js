const md5 = require('md5');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        password: md5('1Q2345678'),
        telephone: 5512999911111,
        created_at: new Date(),
      },
      {
        name: 'Jane Doe',
        email: 'jane@doe.com',
        password: md5('1Q2345678'),
        telephone: 5512999911112,
        created_at: new Date(),
      },
      {
        name: 'Minie Doe',
        email: 'minie@doe.com',
        password: md5('1Q2345678'),
        telephone: 5512999911113,
        created_at: new Date(),
      },
      {
        name: 'Molly Doe',
        email: 'molly@doe.com',
        password: md5('1Q2345678'),
        telephone: 5512999911114,
        created_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
