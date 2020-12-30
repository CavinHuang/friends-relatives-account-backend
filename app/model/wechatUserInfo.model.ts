'use strict';
import { Model, Sequelize, DataTypes } from 'sequelize';
module.exports = (sequelize: Sequelize) => {
  class WechatUserInfo extends Model { }
  WechatUserInfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      openid: {
        type: DataTypes.STRING,
        comment: '微信方唯一ID',
        allowNull: false,
        unique: true,
        defaultValue: ''
      },
      nickName: {
        type: DataTypes.STRING,
        comment: '昵称',
        allowNull: false,
        defaultValue: ''
      },
      avatarUrl: {
        type: DataTypes.STRING,
        comment: '头像',
        allowNull: false,
        defaultValue: ''
      },
      gender: {
        type: DataTypes.TINYINT,
        comment: '性别',
        allowNull: false,
        defaultValue: 0
      },
      language: {
        type: DataTypes.STRING,
        comment: '语言',
        allowNull: false,
        defaultValue: ''
      },
      country: {
        type: DataTypes.STRING,
        comment: '所在国家',
        allowNull: false,
        defaultValue: ''
      },
      province: {
        type: DataTypes.STRING,
        comment: '所在省',
        allowNull: false,
        defaultValue: ''
      },
      city: {
        type: DataTypes.STRING,
        comment: '所在城市',
        allowNull: false,
        defaultValue: ''
      }
    },
    {
      tableName: 'wechat_user_info', // 定义表名
      sequelize,
      paranoid: true // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  )

  return WechatUserInfo
}
