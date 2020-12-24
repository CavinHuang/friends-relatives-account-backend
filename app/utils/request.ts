'use strict';

const request = require('request')
const query = require('qs')

type methodType = 'GET' | 'get' | 'POST' | 'post'

/**
 * http 请求封装
 * @param    {[string]}                     type   [请求类型]
 * @param    {[string]}                     url    [请求地址]
 * @param    {[json/array]}                 data   [请求数据]
 * @param    {[object]}                     header [请求header]
 * @param    {[bool]}                       debug  [是否打印请求信息]
 * @return   {[promise]}                            [promise]
 * @Author:  slade
 * @DateTime :2017-09-15T10:30:42+080
 */
export const httpRequest = (url: string, data: any = {}, type: methodType = 'GET', header: any = {}, debug: boolean = false) => {
  // 数据
  let options = {
    url: url,
    headers: header,
    method: type
  }
  if (type.toLowerCase() === 'post') {
    options = Object.assign(options, {
      form: data
    })
  } else if (type.toLowerCase() === 'get') {
    options.url = url + '?' + query.stringify(data)
  }
  console.log('请求参数', options)
  // 调用
  return new Promise((resolve, reject) => {
    request(options, (error: any, response: any, body: any) => {
      console.log(error, response, body)
      // if (debug) {
      //   console.log('请求返回\n', response)
      //   console.log('请求返回内容\n', body)
      //   console.error('请求错误\n', error)
      // }
      // if (!error && response.statusCode == 200) {
      //   try {
      //     var info = typeof body === 'object' ? body : JSON.parse(body)
      //     resolve(info)
      //   } catch (e) {
      //     console.log('请求返回内容\n', body)
      //     reject(e)
      //   }
      // } else {
      //   console.log('请求返回内容\n', body)
      //   reject(error)
      // }
    })
  })
}