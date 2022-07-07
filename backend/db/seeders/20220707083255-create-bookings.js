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
   await queryInterface.bulkInsert('Bookings',[
    {
      spotId:1,
      userId: 1,
      startDate: new Date("2020-08-10"),
      endDate: new Date("2020-07-15"),
    },
    {
      spotId: 3,
      userId: 1,
      startDate: new Date("2020-08-10"),
      endDate: new Date ("2020-07-15"),
    },
    {
      spotId: 2,
      userId: 2,
      startDate: new Date("2020-07-06"),
      endDate: new Date("2020-07-09"),
    },
    {
      spotId: 2,
      userId: 1,
      startDate: new Date("2020-10-10"),
      endDate: new Date("2020-10-15") ,
    },
    {
      spotId: 1,
      userId: 2,
      startDate: new Date("2020-11-10"),
      endDate: new Date ("2020-11-15"),
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
