'use strict';

module.exports = {
  up: async (queryInterface, _) => {
    const yards = [
      { id: `TEST`, name: `Test` }
    ];

    for (let i = 0; i < 20; i++) {
      yards.push({ id: `TEST${i}`, name: `Test ${i}` })
    }
    
    await queryInterface.bulkInsert('yards', yards, {})
  },

  down: async (queryInterface, _) => {
    await queryInterface.bulkDelete('yards', null, {})
  }
};
