'use strict';
import db from '../model'; // 数据库模型
import axios from 'axios'
import wechat from '../config/env/wechat'

export default class UserController {
  async saveUserInfo(ctx: any) {
    const { avatarUrl, city, country, gender, language, nickName, province, jscode } = ctx.request.body

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
      ctx.body = {
        msg: errmsg
      }
    } else {
      db.WechatUserInfo.create({
        avatarUrl,
        city,
        country,
        gender,
        language,
        nickName,
        province,
        openid
      })
      ctx.body = {
        code: 1,
        msg: '成功'
      }
    }

  }
}
