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
      userId: 1,
      spotId: 1,
      review: "Beautiful honeymoon spot!",
      stars: 5
    },
    {
      userId: 2,
      spotId: 3,
      review: "Unusual japanese airbnb that you typically can't find in the states!",
      stars: 4
    },
    {
      userId: 4,
      spotId: 3,
      review: "The view is great but not so fond of sleeping on the floor. Sashimi is fresh and delicious",
      stars: 4
    },
    // added here
    {
      userId: 5,
      spotId: 3,
      review: "Not bad but service is not great",
      stars: 2
    },
    {
      userId: 1,
      spotId: 4,
      review: "right next to the fountain!",
      stars: 5
    },
    {
      userId: 2,
      spotId: 4,
      review: "Legend has it that during the Civil War, both Union and Confederate armies agreed to not wage war here to preserve its beauty. I see why, it's amazing!",
      stars: 5
    },
    {
      userId: 1,
      spotId: 5,
      review: "Great bathtub",
      stars: 4
    },
    {
      userId: 5,
      spotId: 5,
      review: "Love the romantic vibe here and I even hear frogs outside my window which really brings out the lost in wilderness feeling",
      stars: 5
    },
    {
      userId: 8,
      spotId: 6,
      review: "Super nice japanese inspired airbnb",
      stars: 5
    },
    {
      userId: 4,
      spotId: 7,
      review: "you see the stars above your head instead of the ceiling",
      stars: 5
    },
    {
      userId: 3,
      spotId: 8,
      review: "Pool is beautiful but the host is nowhere to be found",
      stars: 2
    },
    {
      userId: 2,
      spotId: 9,
      review: "Victorian Castle has 20+ rooms which is easy to get lost in",
      stars: 3
    },
    {
      userId: 5,
      spotId: 9,
      review: "I slept on the floor for 2 nights because I got lost. Reception is also not great so I couldn't call. Never again would I want to repeat this experience",
      stars: 1
    },
    {
      userId: 2,
      spotId: 10,
      review: "unique looking bedroom!",
      stars: 4
    },
    {
      userId: 6,
      spotId: 10,
      review: "THe host is super nice",
      stars: 4
    },
    {
      userId: 2,
      spotId: 11,
      review: "pretty views but i got a bug bite",
      stars: 2
    },
    {
      userId: 3,
      spotId: 12,
      review: "chandelier really adds a nice touch",
      stars: 4
    },
    {
      userId: 7,
      spotId: 12,
      review: "This place is so secluded I can't find food or restaurants nearby. ",
      stars: 2
    },
    {
      userId: 3,
      spotId: 13,
      review: "Feels like I'm walking down the streets of Paris",
      stars: 5
    },
    {
      userId: 4,
      spotId: 14,
      review: "Love Danish culture and one of the antique doll shops nearby is my favorite place to shop here. Great for people who like delicate, collectible items",
      stars: 4
    },
    {
      userId: 1,
      spotId: 14,
      review: "Pompous wine tourists are everywhere",
      stars: 2
    },
    {
      userId: 3,
      spotId: 15,
      review: "Very extravagant and makes you feel like a queen indeed",
      stars: 5
    },
    {
      userId: 5,
      spotId: 16,
      review: "The amount of whiteness in the decor is blinding. But nice bedding and fruits",
      stars: 3
    },
    {
      userId: 8,
      spotId: 17,
      review: "I hate those rowdy college kids next door but at least I have access to a luxury pool and steam room to drown out my sorrows",
      stars: 4
    },
    {
      userId: 2,
      spotId: 18,
      review: "fancy place",
      stars: 5
    },
    {
      userId: 3,
      spotId: 19,
      review: "makes me feel like a character in a video game",
      stars: 5
    },
    {
      userId: 1,
      spotId: 19,
      review: "I did not see any ghosts which is irrationally disappointing",
      stars: 1
    },
    {
      userId: 2,
      spotId: 20,
      review: "Indoor pool and lighting makes you feel like you're in another world",
      stars: 5
    },
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
