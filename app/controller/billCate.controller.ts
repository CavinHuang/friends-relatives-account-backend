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
    const {name, type = 1, icon, uid} = ctx.request.body
    if (!name || !type || !uid) throw new CustomError('缺少必要参数', { msg: 'name和belong不能为空' })
    
    const result = await db.BillCateModel.create({
      uid,
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
    const {id, name, status, type, icon, uid, remark} = ctx.request.body;
    if (!id)
      throw new CustomError('缺少参数', {msg: 'name、type 缺少'});
    
    const updateData:any = {}
    if (name !== undefined && name !== null) updateData.name = name
    if (type !== undefined && type !== null) updateData.type = type
    if (icon !== undefined && icon !== null) updateData.icon = icon
    if (remark !== undefined && remark !== null) updateData.remark = remark
    if (status !== undefined && status !== null) updateData.status = status
    const result = await db.BillCateModel.update(
      updateData,
      {
        where: {id},
      }
    );
    
    ctx.result['data'] = !!result;
  }
  
  /**
   * 分类列表
   * @param ctx
   */
  public async lists(ctx: any) {
    const {uid} = ctx.request.query;
    if (!uid)
      throw new CustomError('缺少参数', {msg: 'id缺少'});
  
  ctx.result['data'] = await db.BillCateModel.findAll(
      {
        where: {
          uid
        },
        order: [
          ['id', 'DESC']
        ]
      }
    );
  }
}