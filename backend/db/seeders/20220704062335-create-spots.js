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
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-505409204-1832x1374.jpg',
    },
    {
      ownerId: 2,
      address: 'Termina',
      city: 'San Diego',
      state: 'California',
      country: 'United States',
      lat: 30.8954,
      lng: -150.2728,
      name: "Coronado Island",
      description: "beautiful beachside views",
      price: 720.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-529590615-1832x1374.jpg',
    },
    {
      ownerId: 4,
      address: 'Mulberry',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Hilton Resort",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
    },
    {
      ownerId: 2,
      address: 'Place1',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort1",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
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
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
    },
    {
      ownerId: 4,
      address: 'Place3',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort3",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
    },
    {
      ownerId: 4,
      address: 'Place4',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort4",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
    },
    {
      ownerId: 4,
      address: 'Place5',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort5",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
    },
    {
      ownerId: 4,
      address: 'Place6',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort6",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
    },
    {
      ownerId: 4,
      address: 'Place7',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort7",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
    },
    {
      ownerId: 4,
      address: 'Place8',
      city: 'Charlotte',
      state: 'North Carolina',
      country: 'United States',
      lat: 80.8954,
      lng: -100.2728,
      name: "Resort8",
      description: "nice staff and breakfast",
      price: 260.90,
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
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
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
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
      previewImage: 'https://www.jetsetter.com//uploads/sites/7/2019/04/GettyImages-920879930-1380x690.jpg',
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
