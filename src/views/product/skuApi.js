import {Server} from '@/tools/servers';

export class ProductSkuApi{


  // 获取商品分类列表
  static getProductSkuList(data = {}) {
    return Server.connection('GET', '/sku/A01', data)
  }

  // 添加商品分类
  static addProductSku(data = {}, fileList = []) {
    return Server.connection('POST', '/sku/A02', data, fileList, 'file')
  }


  // 删除商品分类
  static deleteProductSku(data = {}) {
    return Server.connection('POST', '/sku/A03', data)
  }

  // 编辑商品分类
  static updateProductSku(data = {}, fileList = []) {
    return Server.connection('POST', '/sku/A04', data,fileList, 'file')
  }

  // 获取商品分类
  static getProductSku(data = {}) {
    return Server.connection('GET', '/sku/A05', data)
  }


}
