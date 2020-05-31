import axios from 'axios'
import qs from 'qs'
// import db from '../store/user/db';
import {version} from '../../package'

/**
 * 请求类
 */
export class BaseApi {
  servers;
  hot;

  /**
   * 初始化servers
   */
  constructor(hot) {
    this.hot = hot;
    this.servers = axios.create({
      baseURL: hot,
      headers: {
        'App-Version': version,
      },
      timeout: 600000,
      // withCredentials: true
    });
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error || '网络繁忙，请稍候再试！');
    });
    this.servers.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      return Promise.reject(error.response || '网络繁忙，请稍候再试！');
    })
  }

  /**
   * fetch2
   * @param method
   * @param url
   * @param body
   * @param fileList
   * @param fileKey
   * @returns {Promise<any>} 直接返回数据data
   */
  connection(method = 'GET', url, body, fileList, fileKey = 'files') {
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/ruleForm-data'};
      const param = new window.FormData();
      for (const key in body) {
        if ({}.hasOwnProperty.call(body, key)) param.append(key, body[key]);
      }
      fileList.forEach(file => param.append(fileKey, file));
      return Promise.resolve(this.servers[method](url, param, {headers}))
    }
    if (method === 'get') {
      url = url + (url.indexOf('?') > 0 ? '&' : '?' + qs.stringify(body));
      body = {}
    }
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await this.servers[method](url, body);
        resolve(data)
      } catch (e) {
        reject(e.data)
      }
    })
  }

}


export const Server = new BaseApi(process.env.BASE_API);
