import {Server} from '@/tools/servers';

export class OrderApi{


  // 获取订单列表
  static getOrderList(data = {}) {
    return Server.connection('GET', '/order/A01', data)
  }

  // 添加订单
  static addOrder(data = {}) {
    return Server.connection('POST', '/order/A02', data)
  }

  // 删除订单
  static deleteOrder(data = {}) {
    return Server.connection('POST', '/order/A03', data)
  }

  // 编辑订单
  static updateOrder(data = {}) {
    return Server.connection('POST', '/order/A04', data)
  }

  // 获取订单
  static getOrder(data = {}) {
    return Server.connection('GET', '/order/A05', data)
  }

  // 订单支付
  static payOrder(data = {}) {
    return Server.connection('POST', '/order/A06', data)
  }

}
