/**
 * 账单model
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/25
*/
import {Model, Sequelize, DataTypes} from 'sequelize';
module.exports = (sequelize: Sequelize) => {
  class Bill extends Model {}
  
  Bill.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '唯一id'
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '所属会员ID'
      },
      type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '变化类型：1、进账；2、出账'
      },
      number: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        comment: '变化的金额'
      },
      friend: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '所属亲友ID'
      },
      bill_cate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '所属分类ID'
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Math.ceil((new Date().getTime()) / 1000),
        comment: '发生时间'
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'bill', // 定义表名
      sequelize,
      paranoid: true, // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  )
  return Bill
}