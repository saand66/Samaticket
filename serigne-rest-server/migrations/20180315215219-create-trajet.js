'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trajets', {
      idtrajet: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Iduser: {
        type: Sequelize.INTEGER,
        REFERENCES:{
          models:'Users',
          key:'iduser',
        }
      },
      LieuDep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      LieuArr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      DateDep: {
        allowNull: false,
        type: Sequelize.DATE
      },
      heureDep: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tarifVoay: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trajets');
  }
};