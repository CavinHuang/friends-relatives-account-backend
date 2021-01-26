/**
 * 账单服务
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/
import {BillField} from "../../types/bill";
import db from "../model";

export default class BillService {
  
  public static async add (changeData: BillField) {
    const {type, number, bill_cate, friend, remark, uid, time} = changeData
    return await db.BillModel.create({
      type,
      uid,
      time,
      number,
      bill_cate,
      friend,
      remark
    })
  }
}