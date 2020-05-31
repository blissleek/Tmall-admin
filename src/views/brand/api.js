import {Server} from '@/tools/servers';

export class BrandApi{


  // 获取品牌列表
  static getBrandList(data = {}) {
    return Server.connection('GET', '/brand/A01', data)
  }

  // 添加品牌信息
  static addBrand(data = {}, fileList = []) {
    return Server.connection('POST', '/brand/A02', data, fileList, 'file')
  }

  // 删除品牌信息
  static deleteBrand(data = {}) {
    return Server.connection('POST', '/brand/A03', data)
  }

  // 编辑品牌信息
  static updateBrand(data = {}, fileList = []) {
    return Server.connection('POST', '/brand/A04', data, fileList, 'file')
  }

  // 获取品牌信息
  static getBrand(data = {}) {
    return Server.connection('GET', '/brand/A05', data)
  }


}
