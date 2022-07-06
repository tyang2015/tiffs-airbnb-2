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
   await queryInterface.bulkInsert('Reviews', [
    {
      userId: 4,
      spotId: 2,
      review: "island is beautiful",
      stars: 5,
    },
    {
      userId: 2,
      spotId: 2,
      review: "sunset and ice cream are the best",
      stars: 4
    },
    {
      userId: 3,
      spotId: 2,
      review: "Coronado is great. I like the ice rink",
      stars: 4
    },
    {
      userId: 3,
      spotId: 1,
      review: "This place is a scam. Fast food chain not good place to stay",
      stars: 1
    },
    {
      userId: 2,
      spotId: 1,
      review: "I like hamburgers but not at Bobs",
      stars: 2
    },
    {
      userId: 1,
      spotId: 3,
      review: "Reflects the values of Charlotte",
      stars: 5
    },
    {
      userId: 3,
      spotId: 3,
      review: "Rich in history and has a well known military base. And great southern BBQ",
      stars: 4
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
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
