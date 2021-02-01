/**
 * 字符操作函数
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2021/2/1
*/

// 加零前缀
export const toPrefixZero = (num: number) => num > 9 ? num : '0' + num