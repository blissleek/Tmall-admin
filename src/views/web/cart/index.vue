<template>
  <div class="tmall-web-cart">
    <a-list item-layout="vertical" size="large" :data-source="products">
      <a-list-item slot="renderItem" key="item.id" slot-scope="item, index">
        <div>
          <div class="product-image">
            <img
              width="150"
              alt="logo"
              :src="item.productImage"
            />
          </div>
          <div class="product-detail">
            <div class="product-detail-name">{{item.productBrand}}</div>
            <div class="product-detail-name">{{item.productName}}</div>
            <div class="product-detail-amount">
              <div style="color: red;float: left;margin-left: 60%;line-height: 30px">¥{{item.productPrice}}</div>
              <el-input-number size="small" style="float: left;margin-left: 100px"
                               @change="updateCart(item.id,item.productQuantity)" v-model="item.productQuantity"
                               :min="0"/>
            </div>
          </div>
        </div>
        <div style="clear: both"></div>
      </a-list-item>
      <el-divider v-if="products.length > 0"></el-divider>
      <a-button v-if="products.length > 0" type="danger" size="large" style="margin-left: 83%;margin-top: 1%;border-radius: unset !important;padding: 0 50px" @click="balance">
        立即结算
      </a-button>
    </a-list>
  </div>
</template>

<script>
  import db from "@/store/user/db";
  import {CartApi} from "./api";

  export default {
    name: "index",
    data() {
      return {
        products: [],
      }
    },

    created() {
      this.getCartList();
    },

    methods: {
      getCartList() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            page: 1,
            pageSize: 1000,
            userId: user.id
          }
          CartApi.getCartList(params).then((res) => {
            this.products = res.data
          }).catch((err) => {
            this.$message.error(err.message)
          })
        } else {
          this.$message.info("您还未登陆，请先登录")
          this.$router.push('/login').catch(err => {
            console.log(err)
          });
        }
      },
      updateCart(id, productQuantity) {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            productQuantity: productQuantity,
            userId: user.id,
            id: id
          };
          CartApi.updateCart(params).then(res => {
            this.$message.success(res.message);
            this.getCartList();
          }).catch(err => {
            this.$message.error(err.message)
          })
        } else {
          this.$message.info("您还未登陆，请先登录")
          this.$router.push('/login').catch(err => {
            console.log(err)
          });
        }
      },
      balance() {
        this.$router.push('/order/confirm_order').catch(err => err);
      },

    }
  }
</script>

<style scoped>
  .tmall-web-cart {
    margin-left: 15%;
    margin-right: 15%;
  }

  .product-image {
    float: left;
  }

  .product-detail {
    float: left;
    width: 80%;
  }

  .product-detail-name {
    padding-left: 10%;
    font-size: 16px;
    line-height: 30px;
  }

  .product-detail-amount {
    margin-top: 60px;
    /*margin-left: 60%;*/
  }

  .ant-list-item {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
</style>
