'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trajet = sequelize.define('Trajet', {
     lieuDep: DataTypes.STRING,
     lieuArr: DataTypes.STRING,
     dateDep: DataTypes.DATE,
     heureDep: DataTypes.INTEGER,
     tarifvoy: DataTypes.INTEGER,
     UserId: DataTypes.INTEGER,
  }, {});
  Trajet.associate = function(models) {
    // associations can be defined here
    models.Trajet.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    })
  };
  return Trajet;
};