<template>
  <div>
    <div class="tmall-web-menu" style="position: center">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">全部商品</el-menu-item>
        <el-menu-item index="3">天天折扣</el-menu-item>
        <el-menu-item index="4">消息中心</el-menu-item>
        <el-menu-item index="5">售后服务</el-menu-item>
        <el-menu-item index="6">联系我们</el-menu-item>
      </el-menu>
    </div>
    <div class="block" style="padding-left: 10%;padding-right: 10%">
      <el-carousel height="500px" width="1200px">
        <el-carousel-item v-for="item in carouselData" :key="item.id">
          <el-image
            style="height: 500px"
            :src="item.image">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tmall-web-product" style="padding-top: 20px;padding-left: 10%;padding-right: 10%">
      <el-row :gutter="35">
        <el-col :span="6" v-for="item in products" :key="item.id">
          <el-card :body-style="{ padding: '0px'}" shadow="hover" style="margin-bottom: 15px;">
            <router-link :to="'/product/detail/' + item.id">
            <el-image
              :src="item.mainImage"
              :fit="'fill'">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div style="padding: 10px 0 0 0;font-size: 16px;text-align: center;color: black !important;">
              <span>{{item.title}}</span>
            </div>
            <div style="padding: 0 0;font-size: 16px;text-align: center;color: black !important;">
              <span>{{item.subTitle}}</span>
            </div>
            <div style="color: red;text-align: center;padding-top: 10px">
              <span>¥ {{item.price}}</span>
            </div>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  import {ProductSpuApi} from '../../product/spuApi';
  import {CarouselApi} from "@/views/carousel/api";

  export default {
    name: "index",
    data() {
      return {
        activeIndex: '1',
        products: [],
        carouselData: [],
        carousels: [
          {id: 1, imagePath: 'http://47.113.81.251:9000/tmall/tmall/20200518160247_TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg'},
          {id: 2, imagePath: 'http://47.113.81.251:9000/tmall/tmall/20200518160247_TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg'},
          {id: 3, imagePath: 'http://47.113.81.251:9000/tmall/tmall/20200518160247_TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg'}
        ],
      }
    },

    mounted() {
      this.getProductList();
      this.getCarouselList();
    },

    methods: {
      getProductList() {
        const params = {
          page: 1,
          pageSize: 12
        }
        ProductSpuApi.getProductSpuList(params).then((res) => {
          this.products = res.data
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      getCarouselList() {
        const params = {
          page: 1,
          pageSize: 10
        }
        CarouselApi.getCarouselList(params).then(res => {
          this.carouselData = res.data
          this.page = res.page
          this.pageSize = res.pageSize
          this.totalCount = res.totalCount
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

    },

  }
</script>

<style scoped>
  .tmall-web-menu {
    margin-left: 20%;
    margin-right: 20%;
  }
</style>
