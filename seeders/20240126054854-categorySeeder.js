'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      name: '家居物業',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '交通出行',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '休閒娛樂',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '餐飲食品',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '其他',
      createdAt: new Date(),
      updatedAt: new Date(),
    },])
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('category', null, {});
  }
};
