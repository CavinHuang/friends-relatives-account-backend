/**
 * 账单类型路由
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/
'use strict';
import {BillCateController} from '../controller/billCate.controller';
const $ = new BillCateController();

module.exports = (Router: any): void => {
  Router
    .get('/bill_cate/lists', $.lists) // 列表
    .post('/bill_cate/add', $.add) // 创建文章
    .post('/bill_cate/update', $.update) // 文章修改
};
