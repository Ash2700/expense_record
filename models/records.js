'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     records.belongsTo(models.Users,{foreignKey:'id'}),
     records.belongsTo(models.category,{foreignKey:'id'})
    }
  }
  records.init({
    name: DataTypes.STRING,
    date:DataTypes.DATE,
    amount:DataTypes.INTEGER,
    userID:DataTypes.INTEGER,
    categoryID:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'records',
  });
  return records;
};