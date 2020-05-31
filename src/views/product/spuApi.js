import {Server} from '@/tools/servers';

export class ProductSpuApi{


  // 获取商品列表
  static getProductSpuList(data = {}) {
    return Server.connection('GET', '/spu/A01', data)
  }

  // 添加商品
  static addProductSpu(data = {}, fileList = []) {
    return Server.connection('POST', '/spu/A02', data, fileList, 'file')
  }


  // 删除商品
  static deleteProductSpu(data = {}) {
    return Server.connection('POST', '/spu/A03', data)
  }

  // 编辑商品
  static updateProductSpu(data = {}, fileList = []) {
    return Server.connection('POST', '/spu/A04', data,fileList, 'file')
  }

  // 获取商品
  static getProductSpu(data = {}) {
    return Server.connection('GET', '/spu/A05', data)
  }


}
