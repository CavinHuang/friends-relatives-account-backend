'use strict';
import WechatController from '../controller/wechat.controller';
const $ = new WechatController();

module.exports = (Router: any): void => {
  Router.post('/wechat/saveUserInfo', $.saveUserInfo) // 创建文章
};
