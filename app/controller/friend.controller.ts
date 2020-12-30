/**
 * 亲友
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/12/30
*/
import {CustomError} from "../utils/error_constructor";
import db from "../model";

export class FriendController {
  
  /**
   * @api {post} /bill/add
   * @apiDescription  修改文章
   * @apiName add
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async add (ctx: any) {
    const {name, belong, sex, remark} = ctx.request.body
    if (!name || !belong) throw new CustomError('缺少必要参数', { msg: 'name和belong不能为空' })
    
    const result = await db.FriendModel.create({
      name,
      belong,
      sex,
      remark
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
    const {id, name, belong, sex, remark} = ctx.request.body;
    if (!name || !belong)
      throw new CustomError('缺少参数', {msg: 'name、belong缺少'});
    
    const result = await db.FriendModel.update(
      {
        name,
        belong,
      },
      {
        where: {id},
      }
    );
    
    ctx.result['data'] = true;
  }
  
  /**
   * @api {get} /friend/list
   * @apiDescription  亲友列表
   * @apiName update
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async lists(ctx: any) {
    const {uid} = ctx.request.body;
    if (!uid)
      throw new CustomError('缺少参数', {msg: 'id缺少'});
    
    const result = await db.FriendModel.findAll(
      {
        where: {
          uid
        },
        order: 'id desc'
      }
    );
    
    ctx.result['data'] = result;
  }
}