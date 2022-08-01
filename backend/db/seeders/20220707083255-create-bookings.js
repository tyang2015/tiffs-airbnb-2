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
      startDate: new Date("2022-08-10"),
      endDate: new Date("2022-07-15")
    },
    {
      spotId:4,
      userId: 1,
      startDate: new Date("2023-08-10"),
      endDate: new Date("2023-09-15")
    },
    {
      spotId: 3,
      userId: 1,
      startDate: new Date("2024-10-10"),
      endDate: new Date("2024-11-15")
    },
    {
      spotId: 5,
      userId: 1,
      startDate: new Date("2023-04-10"),
      endDate: new Date("2023-04-15")
    },
    {
      spotId: 6,
      userId: 1,
      startDate: new Date("2024-08-10"),
      endDate: new Date("2024-09-15")
    },
    {
      spotId: 7,
      userId: 1,
      startDate: new Date("2025-06-10"),
      endDate: new Date("2025-06-15")
    },
    {
      spotId: 4,
      userId: 1,
      startDate: new Date("2027-06-10"),
      endDate: new Date("2027-06-15")
    },
    {
      spotId: 8,
      userId: 1,
      startDate: "2023-02-10",
      endDate: "2023-02-15"
    },
    {
      spotId: 9,
      userId: 1,
      startDate: new Date("2022-05-11"),
      endDate: new Date("2020-06-16")
    },
    {
      spotId: 10,
      userId: 1,
      startDate: new Date("2024-09-10"),
      endDate: new Date("2024-10-15")
    },
    {
      spotId: 11,
      userId: 1,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-02-01")
    },
    {
      spotId: 12,
      userId: 1,
      startDate: new Date("2029-08-10"),
      endDate: new Date("2029-10-15")
    },
    {
      spotId: 13,
      userId: 1,
      startDate: new Date("2028-08-10"),
      endDate: new Date("2028-12-15")
    },
    {
      spotId: 2,
      userId: 2,
      startDate: new Date("2026-07-06"),
      endDate: new Date("2026-07-09")
    },
    {
      spotId: 2,
      userId: 1,
      startDate: new Date("2031-10-10"),
      endDate: new Date("2031-12-17")
    },
    {
      spotId: 1,
      userId: 2,
      startDate: new Date("2029-11-10"),
      endDate: new Date("2029-11-15")
    },
    {
      spotId: 10,
      userId: 4,
      startDate: new Date("2028-11-10"),
      endDate: new Date("2028-11-15")
    },
    {
      spotId: 12,
      userId: 4,
      startDate: new Date("2025-12-10"),
      endDate: new Date("2025-12-15")
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
