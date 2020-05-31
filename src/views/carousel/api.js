import {Server} from '@/tools/servers';

export class CarouselApi{


  // 获取轮播图
  static getCarouselList(data = {}) {
    return Server.connection('GET', '/carousel/A01', data)
  }

  // 添加轮播图
  static addCarousel(data = {}, fileList = []) {
    return Server.connection('POST', '/carousel/A02', data,fileList, 'file')
  }


  // 删除轮播图
  static deleteCarousel(data = {}) {
    return Server.connection('POST', '/carousel/A03', data)
  }

  // 编辑轮播图
  static updateCarousel(data = {}, fileList = []) {
    return Server.connection('POST', '/carousel/A04', data,fileList, 'file')
  }

  // 获取轮播图
  static getCarousel(data = {}) {
    return Server.connection('GET', '/carousel/A05', data)
  }


}
