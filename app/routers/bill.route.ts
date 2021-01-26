/**
 * 账单流水
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/
import {BillController} from '../controller/bill.controller'
const $ = new BillController()

module.exports = (Route: any):void => {
  Route
    .post('/bill/add', $.add)
    .get('/bill/lists',$.yearLists)
}