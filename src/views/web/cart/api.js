import {Server} from '@/tools/servers';

export class CartApi{


  // 获取购物车商品列表
  static getCartList(data = {}) {
    return Server.connection('GET', '/cart/A01', data)
  }

  // 添加购物车商品
  static addCart(data = {}) {
    return Server.connection('POST', '/cart/A02', data)
  }


  // 删除购物车商品
  static deleteCart(data = {}) {
    return Server.connection('POST', '/cart/A03', data)
  }

  // 编辑购物车商品
  static updateCart(data = {}) {
    return Server.connection('POST', '/cart/A04', data)
  }

  // 获取购物车商品
  static getCart(data = {}) {
    return Server.connection('GET', '/cart/A05', data)
  }


}
