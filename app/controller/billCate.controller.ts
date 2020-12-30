import {CustomError} from "../utils/error_constructor";
import db from "../model";

/**
 * 账单类型
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/

export class BillCateController {
  /**
   * @api {post} /bill/add
   * @apiDescription  修改文章
   * @apiName add
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async add (ctx: any) {
    const {name, type = 1, icon} = ctx.request.body
    if (!name || !type) throw new CustomError('缺少必要参数', { msg: 'name和belong不能为空' })
    
    const result = await db.BillCateModel.create({
      name,
      type,
      icon
    })
    ctx.result['data'] = {
      info: result,
    };
  }
  
  /**
   * @api {post} /bill/update
   * @apiDescription  修改文章
   * @apiName update
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async update(ctx: any) {
    const {id, name, type = 1, icon} = ctx.request.body;
    if (!name || !type)
      throw new CustomError('缺少参数', {msg: 'name、belong缺少'});
    
    const result = await db.FriendModel.update(
      {
        name,
        type,
        icon
      },
      {
        where: {id},
      }
    );
    
    ctx.result['data'] = true;
  }
}