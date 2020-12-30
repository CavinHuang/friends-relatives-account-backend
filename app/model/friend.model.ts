/**
 * 亲友模型
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/25
 */
import {Model, Sequelize, DataTypes} from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  class FriendModel extends Model {}

  FriendModel.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '亲友名称'
    },
    belong: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '所属亲友ID'
    },
    sex: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 3,
      comment: '亲友性别'
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '亲友关系备注'
    }
  },
    {
        tableName: 'friend_info', // 定义表名
        sequelize,
        paranoid: true, // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  )
  return FriendModel
}