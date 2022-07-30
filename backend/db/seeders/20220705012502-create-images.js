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
      url: 'https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2017/9/18/CI_Airbnb-romantic-Airbnbs-3.jpg.rend.hgtvcom.966.644.suffix/1505819731026.jpeg'
    },
    {
      spotId: 1,
      reviewId: 4,
      url: 'https://www.thebrokebackpacker.com/wp-content/uploads/2021/03/La-Cabane-in-Uluwatu.jpg'
    },
    {
      spotId: 3,
      reviewId: 6,
      url: 'https://pbs.twimg.com/media/FQQVnp5VcAEMO2I?format=jpg&name=large'
    },
    {
      spotId: 3,
      reviewId: 7,
      url: 'https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt9fd0514fb26a0e68/607df8964f478c3f353de301/Boutique_Camping_option_2.jpg?crop=100p,56.22p,x0,y21.48p&width=720&height=405&auto=webp'
    },
    {
      spotId: 3,
      reviewId: 7,
      url: 'https://a0.muscache.com/pictures/d51dd1be-c85c-4cb1-a6eb-ceaeba5038f2.jpg'
    },
    // added here
    {
      spotId: 3,
      reviewId: 6,
      url: 'https://a0.muscache.com/im/pictures/3c93866e-b403-4802-bbab-4758cb47c70a.jpg?im_w=480'
    },
    {
      spotId: 4,
      reviewId: 6,
      url: 'https://news.airbnb.com/wp-content/uploads/sites/4/2021/09/07_Winnie-the-Pooh-Living-Room-Airbnb-CREDIT-Henry-Woide.jpg?fit=2662,1776'
    },
    {
      spotId: 4,
      reviewId: 6,
      url: 'https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/images/4LNlT5o18Y42tB1J4dvQLD.jpeg'
    },
    {
      spotId: 4,
      reviewId: 6,
      url: 'https://media.afar.com/uploads/images/afar_posts/images/T3Ab1mSG1J/original_open-uri20210914-48-1b3fqzl?1631646636'
    },
    {
      spotId: 5,
      reviewId: 6,
      url: 'https://wpcluster.dctdigital.com/sundaypost/wp-content/uploads/sites/13/2019/02/dream.png'
    },
    {
      spotId: 6,
      reviewId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48981172/original/b42d7410-ab34-4dff-baae-c0a05226aad7.jpeg?im_w=720'
    },
    {
      spotId: 7,
      reviewId: 6,
      url: 'https://www.telegraph.co.uk/content/dam/Travel/2018/August/airbnb-great-wall-china-bedroom.jpg'
    },
    {
      spotId: 8,
      reviewId: 6,
      url: 'https://i.insider.com/5e627be8a9f40c0bf655c917?width=1000&format=jpeg&auto=webp'
    },
    {
      spotId: 9,
      reviewId: 6,
      url: 'https://i.insider.com/5e28674bab49fd597a4ab25c?width=700&format=jpeg&auto=webp'
    },
    {
      spotId: 10,
      reviewId: 6,
      url: 'https://wpcluster.dctdigital.com/sundaypost/wp-content/uploads/sites/13/2019/02/skye-bothy.png'
    },
    {
      spotId: 11,
      reviewId: 6,
      url: 'https://www.veronikasadventure.com/wp-content/uploads/2020/04/Taiwan-Airbnb-6-Alishan.jpg'
    },
    {
      spotId: 12,
      reviewId: 6,
      url: 'https://i0.wp.com/files.tripstodiscover.com/files/2021/06/Naturalist-Boudoir-Lumberton-Texas.jpg?resize=784%2C522'
    },
    {
      spotId: 13,
      reviewId: 6,
      url: 'https://www.twowanderingsoles.com/wp-content/uploads/2021/07/img_60ee7aadf3499.jpg'
    }

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
