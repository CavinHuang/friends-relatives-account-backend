/**
 * 账单类型定义
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/

export type BillType = 1 | 2

export interface BillField {
  id?: number;
  type: BillType;
  number: number;
  friend: number;
  bill_cate: number;
  remark?: string;
  uid: number;
  time: number;
}