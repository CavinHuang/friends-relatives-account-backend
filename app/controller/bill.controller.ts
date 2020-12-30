/**
 * 账单相关的接口
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/
import {CustomError} from "../utils/error_constructor";
import BillService from "../service/bill.service";

export class BillController {
  // 增加流水
  public add (ctx: any) {
    const { number, type, friend, bill_cate, remark} = ctx.request.body
    if (!number || !type || !friend) throw new CustomError('关键参数不能为空', { msg: 'number && type && friend不能为空' })
    ctx.result['data'] = BillService.add({
      type,
      number,
      friend,
      bill_cate,
      remark
    })
  }
}