'use strict';
module.exports = function (sequelize, DataTypes) {
  var seqCustomers = sequelize.define("seq_customers", {
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { underscored: true });

  seqCustomers.associate = function (models) {
    seqCustomers.hasMany(models.seq_burgers, {
      onDelete: "cascade", hooks: true
    });
  };
  return seqCustomers;
};