import {Server} from '@/tools/servers';

export class AddressApi{



  // 获取地址列表
  static getAddressList(data = {}) {
    return Server.connection('GET', '/address/A01', data)
  }

  // 添加地址
  static addAddress(data = {}) {
    return Server.connection('POST', '/address/A02', data)
  }


  // 删除地址
  static deleteAddress(data = {}) {
    return Server.connection('POST', '/address/A03', data)
  }

  // 编辑地址
  static updateAddress(data = {}) {
    return Server.connection('POST', '/address/A04', data)
  }

  // 获取地址
  static getAddress(data = {}) {
    return Server.connection('GET', '/address/A05', data)
  }

  // 获取默认收货地址
  static getDefaultAddress(data = {}) {
    return Server.connection('GET', '/address/A06', data)
  }


}
