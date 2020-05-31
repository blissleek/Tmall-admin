import {Server} from '@/tools/servers';

export class UserApi{


  // 获取用户
  static getUserList(data = {}) {
    return Server.connection('GET', '/user/A01', data)
  }

  // 添加用户
  static addUser(data = {}, fileList = []) {
    return Server.connection('POST', '/user/A02', data)
  }


  // 删除用户
  static deleteUser(data = {}) {
    return Server.connection('POST', '/user/A03', data)
  }

  // 编辑用户
  static updateUser(data = {}, fileList = []) {
    return Server.connection('POST', '/user/A04', data)
  }

  // 获取用户
  static getUser(data = {}) {
    return Server.connection('GET', '/user/A05', data)
  }


}
