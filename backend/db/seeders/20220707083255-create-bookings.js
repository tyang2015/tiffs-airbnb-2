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
       spotId: 3,
       userId: 1,
       startDate: "2020-08-10 08:10:10",
       endDate: "2020-07-15 10:10:10",
     },
    {
      spotId: 2,
      userId: 2,
      startDate: "2020-07-06 08:10:10",
      endDate: "2020-07-09 10:10:10",
    },
    {
      spotId: 2,
      userId: 1,
      startDate: "2020-10-10 08:10:10",
      endDate: "2020-10-15 10:10:10",
    },
    {
      spotId: 1,
      userId: 2,
      startDate: "2020-11-10 9:10:10",
      endDate: "2020-11-15 12:10:10",
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
