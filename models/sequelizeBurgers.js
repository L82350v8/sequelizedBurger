"use strict";
module.exports = function (sequelize, DataTypes) {
  var seqBurgers = sequelize.define("seq_burgers", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
   }, { underscored: true });

  seqBurgers.associate = function (models) {
    seqBurgers.belongsTo(models.seq_customers, {
      onDelete: "cascade", hooks: true
    });
  };
  
  return seqBurgers;
};
