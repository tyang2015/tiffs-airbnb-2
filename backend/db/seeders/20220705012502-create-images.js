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
   await queryInterface.bulkInsert('Images', [
    {
      spotId: 1,
      reviewId: 4,
      url: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-620964650-1832x1374.jpg'
    },
    {
      spotId: 1,
      reviewId: 4,
      url: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-945273794-1832x1374.jpg'
    },
    {
      spotId: 3,
      reviewId: 6,
      url: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-538162756-1832x1374.jpg'
    },
    {
      spotId: 3,
      reviewId: 7,
      url: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-636587230-1832x1374.jpg'
    },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Images', null, {});
  }
};
