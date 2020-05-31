import {Server} from '@/tools/servers';

export class orderItemApi{


  // 获取订单商品列表
  static getItemList(data = {}) {
    return Server.connection('GET', '/orderItem/A01', data)
  }


}
