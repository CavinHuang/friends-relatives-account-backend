/**
 * 账单相关的接口
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/
import {CustomError} from "../utils/error_constructor";
import BillService from "../service/bill.service";
import {getMonthStartAndEnd, renderChineseWeek, weekType, yearStartAndEnd} from "../utils/date";
import db from "../model";
import { Op } from 'sequelize';
import {toPrefixZero} from "../utils/string";
const friendBilleModel = db.BillModel.hasOne(db.FriendModel, {
  foreignKey: "id",
  sourceKey: "friend",
  as: "friendInfo"
})

const cateBileModel = db.BillModel.hasOne(db.BillCateModel, {
  foreignKey: "id",
  sourceKey: "bill_cate",
  as: "billCate"
})

export class BillController {
  // 增加流水
  public async add (ctx: any) {
    const { uid, number, type, time, friend, bill_cate, remark } = ctx.request.body
    if (!uid || !number || !type || !friend) throw new CustomError('关键参数不能为空', { msg: 'number && type && friend不能为空' })
    ctx.result['data'] = await BillService.add({
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
    const oDate = new Date()
    const yearData = yearStartAndEnd(oDate.getFullYear())
    let months = oDate.getMonth() + 1
  
    const result = await db.BillModel.findAll(
      {
        include: [
          {
            association: friendBilleModel,
            attributes: ['name', 'remark']
          },
          {
            association: cateBileModel,
            attributes: ['name'],
          },
        ],
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
    for (let j = 1; j <= months; j++) {
      const _month = j
      const _monthInfo = getMonthStartAndEnd(oDate, _month)
      const _item = {
        month: toPrefixZero(_month),
        year: oDate.getFullYear(),
        data: [],
        income: 0,
        out: 0
      }
      for (let i = 0; i < result.length; i ++) {
        const _tmp = JSON.parse(JSON.stringify(result[i]))
        const time = _tmp.time
        const _tmpDate = new Date(_tmp.time * 1)
        _tmp.year = _tmpDate.getFullYear()
        _tmp.month = toPrefixZero( _tmpDate.getMonth() + 1 )
        _tmp.day = toPrefixZero(_tmpDate.getDate())
        _tmp.week = <weekType>_tmpDate.getDay()
        _tmp.week_cn = renderChineseWeek( _tmp.week)
        _tmp.hour = toPrefixZero(_tmpDate.getHours())
        _tmp.minutes = toPrefixZero(_tmpDate.getMinutes())
        _tmp.second = toPrefixZero(_tmpDate.getSeconds())
  
        if (_tmp.month > months) {
          months = _tmp.month
        }
        if (time > _monthInfo.start && time <= _monthInfo.end) {
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
    
    ctx.result['data'] = datas.reverse()
  }
}