'use strict';
import db from '../model'; // 数据库模型
import axios from 'axios'
import wechat from '../config/env/wechat'
import { CustomError } from '../utils/error_constructor';

export default class UserController {
  public async saveUserInfo(ctx: any) {
    const { avatarUrl, city, country, gender, language, nickName, province, jscode } = ctx.request.body
    if (!jscode) throw new CustomError('缺少参数', { msg: 'jscode缺少' });
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    // 获取远程的微信的openid
    const data = await axios('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: wechat.appId,
        secret: wechat.appSecret,
        js_code: jscode,
        grant_type: 'authorization_code'
      }
    })
    const { errcode, errmsg, openid, session_key } = data.data

    if (errcode) {
      throw new CustomError(errcode, { msg: errmsg });
    } else {
      const wechatUser = await db.WechatUserInfoModel.findOne({
        where: {
          openid
        }
      })
      if (wechatUser) {
        wechatUser.session_key = session_key
        ctx.result['data'] = wechatUser
      } else {
        const result = await db.WechatUserInfoModel.create({
          avatarUrl,
          city,
          country,
          gender,
          language,
          nickName,
          province,
          openid
        })
        // 返回
        result.session_key = session_key
        ctx.result['data'] = result
      }
    }
  }
}
