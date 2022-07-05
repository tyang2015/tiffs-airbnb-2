'use strict';

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
   await queryInterface.bulkInsert('AppUsers', [
    {
      firstName: 'Tiffany',
      lastName: 'Yang',
      email: 'tiffanyang2015@gmail.com',
      password: 'baludf'
    },
    {
      firstName: 'Lilia',
      lastName: 'Isan',
      email: 'lilia@gmail.com',
      password: 'password1'
    },
    {
      firstName: 'Rena',
      lastName: 'Li',
      email: 'Rena@gmail.com',
      password: 'password2'
    },
    {
      firstName: 'Ashley',
      lastName: 'Yeh',
      email: 'ashley@gmail.com',
      password: 'english'
    },
    {
      firstName: 'Isaac',
      lastName: 'Newton',
      email: 'Isaac@gmail.com',
      password: 'gravity'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('AppUsers', null, {});
  }
};
