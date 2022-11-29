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
      email: 'tiffany@gmail.com',
      hashedPassword: bcrypt.hashSync("password")
    },
    {
      firstName: 'Sabrina',
      lastName: 'Lee',
      email: 'sabrina@gmail.com',
      hashedPassword: bcrypt.hashSync("password")
    },
    {
      firstName: 'Ananya',
      lastName: 'Bharghava',
      email: 'ananya@gmail.com',
      hashedPassword: bcrypt.hashSync("password")
    },
    {
      firstName: 'Randy',
      lastName: 'Chang',
      email: 'randy@gmail.com',
      hashedPassword: bcrypt.hashSync("password")
    },
    {
      email: 'demo1@gmail.com',
      firstName: 'Demo1',
      lastName: 'Demo1',
      hashedPassword: bcrypt.hashSync("password")
    },
    {
      email: 'user1@gmail.com',
      firstName: 'User1',
      lastName: 'User1',
      hashedPassword: bcrypt.hashSync("password")
    },
    {
      email: 'ashley@gmail.com',
      firstName: 'Ashley',
      lastName: 'Yeh',
      hashedPassword: bcrypt.hashSync("password")
    },
    {
      firstName: 'Isaac',
      lastName: 'Newton',
      email: 'Isaac@gmail.com',
      hashedPassword: bcrypt.hashSync("password")
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
     await queryInterface.bulkDelete('Users', null, {});

  }
};
