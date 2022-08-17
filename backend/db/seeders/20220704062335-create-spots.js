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
   await queryInterface.bulkInsert('Spots', [
    {
      ownerId: 1,
      address: '626',
      city: 'Rowland Heights',
      state: 'California',
      country: 'United States',
      lat: 33.8954,
      lng: -118.2728,
      name: "Bobs Hamburgers",
      description: "great place to stay for a couple nights with free WIFI",
      price: 679.90,
      previewImage: 'https://travel.home.sndimg.com/content/dam/images/travel/fullrights/2017/9/18/CI_Airbnb-romantic-Airbnbs-3.jpg.rend.hgtvcom.966.644.suffix/1505819731026.jpeg',
    },
    {
      ownerId: 1,
      address: 'Termina',
      city: 'San Diego',
      state: 'California',
      country: 'United States',
      lat: 30.8954,
      lng: -150.2728,
      name: "Coronado Island",
      description: "beautiful beachside views",
      price: 720.90,
      previewImage: 'https://a0.muscache.com/im/pictures/57409785-0690-4dd9-b5aa-c60c6c63f1bf.jpg?im_w=720',
    },
    {
      ownerId: 1,
      address: 'Mulberry',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Hilton Resort",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://pbs.twimg.com/media/FQQVnp5VcAEMO2I?format=jpg&name=large',
    },
    {
      ownerId: 2,
      address: 'Hundred Acre Woods 2100',
      city: 'Hundred Acre Woods',
      state: 'Oklahoma',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Winnie the Pooh Airbnb",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://news.airbnb.com/wp-content/uploads/sites/4/2021/09/07_Winnie-the-Pooh-Living-Room-Airbnb-CREDIT-Henry-Woide.jpg?fit=2662,1776',
    },
    {
      ownerId: 4,
      address: 'Place2',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort2",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://wpcluster.dctdigital.com/sundaypost/wp-content/uploads/sites/13/2019/02/dream.png',
    },
    {
      ownerId: 4,
      address: 'Place3',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Japanese styled condo",
      description: "features sand garden, onsen and complementary sushi dinner",
      price: 260.90,
      previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-48981172/original/b42d7410-ab34-4dff-baae-c0a05226aad7.jpeg?im_w=720',
    },
    {
      ownerId: 4,
      address: 'washington road',
      city: 'Alexandria',
      state: 'DC',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Rustic Cabin in the Sunlight",
      description: "Interior decor filled with rustic charm",
      price: 260.90,
      previewImage: 'https://www.telegraph.co.uk/content/dam/Travel/2018/August/airbnb-great-wall-china-bedroom.jpg',
    },
    {
      ownerId: 4,
      address: 'doohickey avenue',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Shimmering Oasis ",
      description: "Walkable distance to dates garden, with access to various recreational amenities including tiki bar and pool",
      price: 260.90,
      previewImage: 'https://i.insider.com/5e627be8a9f40c0bf655c917?width=1000&format=jpeg&auto=webp',
    },
    {
      ownerId: 4,
      address: 'ff lane',
      city: 'Brentwood',
      state: 'CA',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Victorian Castle",
      description: "Final Fantasy inspired with lots of live performances",
      price: 260.90,
      previewImage: 'https://i.insider.com/5e28674bab49fd597a4ab25c?width=700&format=jpeg&auto=webp',
    },
    {
      ownerId: 4,
      address: 'malibu beach',
      city: 'LA',
      state: 'CA',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Malibu abode",
      description: "oceanside views, close to Getty Villa and Inn of the 7th Ray",
      price: 260.90,
      previewImage: 'https://wpcluster.dctdigital.com/sundaypost/wp-content/uploads/sites/13/2019/02/skye-bothy.png',
    },
    {
      ownerId: 4,
      address: 'Place8',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Romantic Treehouse",
      description: "Perfect place for honeymoon and general couple merriment",
      price: 260.90,
      previewImage: 'https://www.veronikasadventure.com/wp-content/uploads/2020/04/Taiwan-Airbnb-6-Alishan.jpg',
    },
    {
      ownerId: 4,
      address: 'Place9',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort9",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://i0.wp.com/files.tripstodiscover.com/files/2021/06/Naturalist-Boudoir-Lumberton-Texas.jpg?resize=784%2C522',
    },
    {
      ownerId: 4,
      address: 'Place10',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort10",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.twowanderingsoles.com/wp-content/uploads/2021/07/img_60ee7aadf3499.jpg',
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
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
