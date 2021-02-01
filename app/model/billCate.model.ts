/**
 * 账单类型model
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/25
*/
import {Model, Sequelize, DataTypes} from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  class BillCateModel extends Model {}
  
  BillCateModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        comment: '唯一id'
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '所属会员ID'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '分类名称'
      },
      type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '分类类型：1、进账；2、出账'
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '分类图标(保留字段)'
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '分类描述'
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '分类状态：1、启用； 0、停用'
      }
    },
    {
      tableName: 'bill_cate', // 定义表名
      sequelize,
      paranoid: true, // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  )
  return BillCateModel
}