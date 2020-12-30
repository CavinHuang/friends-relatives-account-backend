/**
 * 亲友类型路由
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
 */
'use strict';
import {FriendController} from '../controller/friend.controller';
const $ = new FriendController();

module.exports = (Router: any): void => {
  Router
    .post('/friend/add', $.add) // 创建文章
    .post('/friend/update', $.update) // 文章修改
    .get('/friend/list', $.lists)
};
