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
   const convertDate = (dateStr) => {
    let date = new Date(dateStr);
    let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate(), date.getUTCHours(),
    date.getUTCMinutes(), date.getUTCSeconds());
    return now_utc
   }

   await queryInterface.bulkInsert('Bookings',
   [
    {
      spotId:1,
      userId: 1,
      startDate: new Date("2025-08-10"),
      endDate: new Date("2025-09-15"),
      // startDate: convertDate("2025-08-10"),
      // endDate: convertDate("2025-09-15")
    },
    // {
    //   spotId:4,
    //   userId: 1,
    //   startDate: new Date("2023-08-11"),
    //   endDate: new Date("2023-09-16")
    // },
    // {
    //   spotId: 3,
    //   userId: 1,
    //   startDate: new Date("2024-10-17"),
    //   endDate: new Date("2024-11-16")
    // },
    // {
    //   spotId: 5,
    //   userId: 1,
    //   startDate: new Date("2023-04-11"),
    //   endDate: new Date("2023-04-16")
    // },
    // {
    //   spotId: 6,
    //   userId: 1,
    //   startDate: new Date("2024-08-11"),
    //   endDate: new Date("2024-09-16")
    // },
    // {
    //   spotId: 7,
    //   userId: 1,
    //   startDate: new Date("2025-06-11"),
    //   endDate: new Date("2025-06-16")
    // },
    // {
    //   spotId: 4,
    //   userId: 1,
    //   startDate: new Date("2027-06-11"),
    //   endDate: new Date("2027-06-16")
    // },
    // {
    //   spotId: 8,
    //   userId: 1,
    //   startDate: new Date("2023-02-11"),
    //   endDate: new Date("2023-02-16")
    // },
    // {
    //   spotId: 9,
    //   userId: 1,
    //   startDate: new Date("2026-05-12"),
    //   endDate: new Date("2026-06-17")
    // },
    // {
    //   spotId: 10,
    //   userId: 1,
    //   startDate: new Date("2024-09-11"),
    //   endDate: new Date("2024-10-16")
    // },
    // {
    //   spotId: 11,
    //   userId: 1,
    //   startDate: new Date("2023-01-02"),
    //   endDate: new Date("2023-02-02")
    // },
    // {
    //   spotId: 12,
    //   userId: 1,
    //   startDate: new Date("2029-08-11"),
    //   endDate: new Date("2029-10-16")
    // },
    // {
    //   spotId: 13,
    //   userId: 1,
    //   startDate: new Date("2028-08-11"),
    //   endDate: new Date("2028-12-16")
    // },
    // {
    //   spotId: 2,
    //   userId: 2,
    //   startDate: new Date("2026-07-07"),
    //   endDate: new Date("2026-07-10")
    // },
    // {
    //   spotId: 2,
    //   userId: 1,
    //   startDate: new Date("2031-10-11"),
    //   endDate: new Date("2031-12-18")
    // },
    // {
    //   spotId: 1,
    //   userId: 2,
    //   startDate: new Date("2029-11-11"),
    //   endDate: new Date("2029-11-16")
    // },
    // {
    //   spotId: 10,
    //   userId: 4,
    //   startDate: new Date("2028-11-11"),
    //   endDate: new Date("2028-11-16")
    // },
    // {
    //   spotId: 12,
    //   userId: 4,
    //   startDate: new Date("2025-12-11"),
    //   endDate: new Date("2025-12-16")
    // }
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
