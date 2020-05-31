import {Server} from '@/tools/servers';

export class CategoryApi{


  // 获取商品分类列表
  static getCategoryList(data = {}) {
    return Server.connection('GET', '/category/A01', data)
  }

  // 添加商品分类
  static addCategory(data = {}) {
    return Server.connection('POST', '/category/A02', data)
  }


  // 删除商品分类
  static deleteCategory(data = {}) {
    return Server.connection('POST', '/category/A03', data)
  }

  // 编辑商品分类
  static updateCategory(data = {}) {
    return Server.connection('POST', '/category/A04', data)
  }

  // 获取商品分类
  static getCategory(data = {}) {
    return Server.connection('GET', '/category/A05', data)
  }

  // 获取商品分类列表（获取分级目录）
  static getCategoryListWithChildren(data = {}) {
    return Server.connection('GET', '/category/A06', data)
  }


}
