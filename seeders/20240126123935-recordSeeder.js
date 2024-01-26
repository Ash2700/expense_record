'use strict';

const { Association } = require('sequelize');
const category = require('../models/category');
const Users = require('../models/users');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('records', [{
      name: '午餐',
      date: '2019/4/24',
      amount: 60,
      userID: 1,
      categoryID: 4,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: '晚餐',
      date: '2019/4/23',
      amount: 60,
      userID: 1,
      categoryID: 4,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'MRT',
      date: '2019/4/23',
      amount: 20,
      userID: 1,
      categoryID: 2,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: '電影:美國隊長',
      date: '2019/4/20',
      amount: 240,
      userID: 2,
      categoryID: 3,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: '租金',
      date: '2019/3/30',
      amount: 20000,
      userID: 1,
      categoryID: 1,
      createdAt: new Date,
      updatedAt: new Date
    },
    ],
      { include: [Users,category] })
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('records', null, {})
  }
};
