'use strict'
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash('123456', 10)
    await queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'father@mail.com',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sally',
      email: 'mother@mail.com',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
