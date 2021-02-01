/**
 * 日期操作函数
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2021/1/26
*/

/**
 * [monthSize 获得指定日期所在月的天数]
 * @return number       [总天数]
 * @param oDate          [日期]
 */
export function monthSize(oDate: Date) {
  oDate = oDate ? oDate : new Date();
  let year = oDate.getFullYear(),
    month = oDate.getMonth(),
    _oDate = new Date();
  _oDate.setFullYear(year);
  _oDate.setMonth(month + 1, 0);
  return _oDate.getDate();
}

/**
 * 查询月份的开始时间和结束时间
 * @param oDate
 * @param month
 */
export function getMonthStartAndEnd(oDate: Date, month: number) {
  oDate = oDate ? oDate : new Date()
  month = month ? month : oDate.getMonth()
  
  const year = oDate.getFullYear()
  let start:number = 0
  let end:number = 0
  const _oDate = new Date(year + '/' + month + '/01')
  const endDay = monthSize(_oDate)
  const _oDateEnd = new Date(year + '/' + month + '/' + endDay + ' 23:59:59')
  start = _oDate.getTime()
  end = _oDateEnd.getTime()
  
  return { start, end }
}

/**
 * 计算一年的开始和结束时间
 * @param year
 */
export function yearStartAndEnd(year: number) {
  const oStartDate = new Date(year + '/01/01')
  const oEndDate = new Date(year + '/12/31')
  
  return {
    start: oStartDate.getTime(),
    end: oEndDate.getTime()
  }
}
export type weekType = 1 | 2 | 3 | 4 | 5 | 6 | 7

/**
 * 渲染中文星期
 * @param num
 */
export function renderChineseWeek(num: weekType) {
  const _map = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  }
  return _map[num]
}
