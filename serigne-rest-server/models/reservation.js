'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reservation = sequelize.define('Reservation', {
   
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
    models.Reservation.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    }),

    models.Reservation.belongsTo(models.Trajet,{
      foreignKey:{
        allowNull: false
      }
    })
  };
  return Reservation;
};  