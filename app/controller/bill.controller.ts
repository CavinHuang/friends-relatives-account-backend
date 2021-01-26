/**
 * 账单相关的接口
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/
import {CustomError} from "../utils/error_constructor";
import BillService from "../service/bill.service";
import {getMonthStartAndEnd, yearStartAndEnd} from "../utils/date";
import db from "../model";
import { Op } from 'sequelize';


export class BillController {
  // 增加流水
  public async add (ctx: any) {
    const { uid, number, type, time, friend, bill_cate, remark } = ctx.request.body
    if (!uid || !number || !type || !friend) throw new CustomError('关键参数不能为空', { msg: 'number && type && friend不能为空' })
    ctx.result['data'] = await db.BillService.add({
      uid,
      type,
      time,
      number,
      friend,
      bill_cate,
      remark
    })
  }
  
  /**
   * 年列表
   * @param ctx
   */
  public async yearLists(ctx: any) {
    const { uid } = ctx.request.query
    if (!uid) throw new CustomError('缺少关键参数')
    const monthsMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const oDate = new Date()
    const yearData = yearStartAndEnd(oDate.getFullYear())
  
    const result = await db.BillModel.findAll(
      {
        where: {
          time: {
            [Op.between]: [yearData.start, yearData.end]
          }
        },
        order: [
          ['id', 'DESC']
        ]
      }
    );
    const datas = []
    for (let j = 0; j < monthsMap.length; j++) {
      const _month = monthsMap[j]
      const _monthInfo = getMonthStartAndEnd(oDate, _month)
      const _item = {
        month: _month,
        year: oDate.getFullYear(),
        data: [],
        income: 0,
        out: 0
      }
      for (let i = 0; i < result.length; i ++) {
        const _tmp = result[i]
        const time = _tmp.time
        
        if (time >= _monthInfo.start && time < _monthInfo.end) {
          // @ts-ignore
          _item.data.push(_tmp)
          if (_tmp.type * 1 === 1) {
            _item.income += Number(_tmp.number)
          } else {
            _item.out += Number(_tmp.number)
          }
          result.splice(i, 1)
        }
      }
      datas.push(_item)
    }
    
    ctx.result['data'] = datas
  }
}