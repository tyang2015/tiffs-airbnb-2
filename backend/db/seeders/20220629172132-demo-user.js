'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      firstName: 'Tiffany',
      lastName: 'Yang',
      email: 'tiffanyang2015@gmail.com',
      hashedPassword: bcrypt.hashSync('baludf')
    },
    {
      email: 'demo@user.io',
      firstName: 'Demo-lition',
      lastName: 'Lovato',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user1@user.io',
      firstName: 'FakeUser1',
      lastName: 'Lila',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'user2@user.io',
      firstName: 'FakeUser2',
      lastName: 'Moon',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
      firstName: 'Isaac',
      lastName: 'Newton',
      email: 'Isaac@gmail.com',
      hashedPassword: bcrypt.hashSync('gravity')
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete('Users', {
       username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
     }, {});

  }
};
