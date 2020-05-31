import {Server} from '@/tools/servers';

export class UserApi{


  // 用户登陆
  static login(data = {}) {
    return Server.connection('POST', '/user/login', data)
  }


}
