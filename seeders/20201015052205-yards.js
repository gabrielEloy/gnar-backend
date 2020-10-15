'use strict';

module.exports = {
  up: async (queryInterface, _) => {
    const employees = []
    for (let i = 0; i < 12000; i += 1) {
      employees.push({ name: `Name ${i}` })
    }
    await queryInterface.bulkInsert('employees', employees, {})
  },

  down: async (queryInterface, _) => {
    await queryInterface.bulkDelete('employees', null, {})
  }
};
