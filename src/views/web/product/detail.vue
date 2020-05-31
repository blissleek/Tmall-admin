<template>
  <div class="tmall-web-container">
    <div>
      <div class="tmall-web-product-detail">
        <el-image
          style="width: 300px; height: 300px"
          :src="product.mainImage"
          :preview-src-list="previewList">
        </el-image>
      </div>
      <div style="float:left;margin-left: 4%;">
        <div style="font-size: 16px;width: 550px;line-height: 25px">
          <span>{{brand}}&nbsp;/&nbsp;{{product.title}}&nbsp;&nbsp;{{product.subTitle}}</span>
        </div>
        <div style="background-color: #e9e9e9;margin-top: 5%;height: 40px;line-height: 40px">
          <span style="font-size: 12px;color: #999; margin-left: 10%">价格</span>
          <span style="color: red;margin-left: 35%;font-size: 18px;">¥{{product.price}}</span>
        </div>
        <div style="margin-top: 5%;height: 40px;">
          <span style="font-size: 12px;color: #999; margin-left: 10%">运费</span>
          <span style="margin-left: 5%;font-size: 13px;">成都 至 重庆<i class="el-icon-arrow-down"></i>万州区<i
            class="el-icon-arrow-down"></i> 快递: 0.00</span>
        </div>
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="80px">
          <div>
            <el-form-item label="数量" prop="productQuantity">
              <el-input-number size="small" v-model="form.productQuantity" :step="1" :min="1"></el-input-number>
            </el-form-item>
          </div>
          <div style="margin-left: 20%">
            <el-button type="danger" plain>立即购买</el-button>
            <el-button style="margin-left: 15%" type="danger" icon="el-icon-shopping-cart-2" @click="addToCart">加入购物车</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div style="clear: both;"></div>
    <el-divider></el-divider>
    <div class="tmall-web-product-detail-description" v-html="product.description">
      {{product.description}}
    </div>

  </div>
</template>

<script>
  import db from "@/store/user/db";
  import {CartApi} from '../cart/api';
  import {ProductSpuApi} from '../../product/spuApi';
  import {BrandApi} from '../../brand/api';

  export default {
    name: "detail",
    data() {
      return {
        product: {},
        previewList: [],
        brand: '',

        form: {
          productQuantity: 1
        },

      }
    },

    mounted() {
      this.getProductDetail()
    },

    methods: {
      getProductDetail() {
        const params = {
          id: this.$route.params.id
        }
        ProductSpuApi.getProductSpu(params).then(res => {
          this.product = res.data;
          this.form.productSpuId = res.data.id;
          this.previewList.push(res.data.mainImage);
          this.getBrandList();
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      getBrandList() {
        const params = {
          page: 1,
          pageSize: 1000
        }
        BrandApi.getBrandList(params).then(res => {
          let brandData = res.data;
          for (let i = 0; i < brandData.length; i++) {
            if (brandData[i].id === this.product.productBrandId) {
              this.brand = brandData[i].name
            }
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      addToCart() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            ...this.form,
            userId: user.id
          };
          CartApi.addCart(params).then(res => {
            this.$message.success(res.message);
            this.$router.push('/cart').catch(err => {console.log(err)});
          }).catch(err => {
            this.$message.error(err.message)
          })
        } else {
          this.$message.info("您还未登陆，请先登录")
          this.$router.push('/login').catch(err => {console.log(err)});
        }
      },
    }
  }
</script>

<style scoped>
  .tmall-web-container {
    margin: 5% 15% 0 15%;
    overflow-x: hidden;
  }

  .tmall-web-product-detail {
    float: left;
    padding: 0 2%;
  }

  .tmall-web-product-detail-description {
    text-align: center !important;
    padding: 0 10%;
  }
</style>
