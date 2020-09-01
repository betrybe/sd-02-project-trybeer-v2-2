module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '1',
        name: 'tryber',
        email: 'tryber@trybe.com.br',
        password: '123456',
        role: 'administrator',
      },
      {
        id: '2',
        name: 'User Tester',
        email: 'user@test.com',
        password: 'test12',
        role: 'client',
      },
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
