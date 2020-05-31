<template>
  <div class="app-container">
    <div class="confirm-order">
      <div class="order-step">
        <el-steps :space="200" :active="active" finish-status="success">
          <el-step title="查看购物车"></el-step>
          <el-step title="拍下商品"></el-step>
          <el-step title="确认收货"></el-step>
          <el-step title="评价"></el-step>
        </el-steps>
      </div>
      <div v-if="active === 0">
        <div class="confirm-order-step">
          <div style="margin-left: 5px;margin-top: 10px;">选择收货地址</div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{defaultAddress.receiverProvince}}&nbsp;{{defaultAddress.receiverCity}}&nbsp;&nbsp;&nbsp;({{ defaultAddress.receiverName }}收)</span>
              <el-tag style="float: right; margin: 0 3px " type="text" size="small"
                      v-if="defaultAddress.isDefault === 1">默认地址
              </el-tag>
            </div>
            <div>
                <span>{{defaultAddress.receiverProvince}}&nbsp;{{defaultAddress.receiverCity}}&nbsp;{{defaultAddress.receiverRegion}}&nbsp;
                  {{defaultAddress.receiverDetailAddress}}&nbsp;{{defaultAddress.receiverPhone}}</span>
            </div>
          </el-card>
          <el-link type="primary" @click="goToAddressManage" :underline="false" style="float: right;">管理收货地址</el-link>
        </div>
        <el-divider></el-divider>
        <div>
          <el-table
            :data="products"
            style="width: 100%"
            show-summary>
            <el-table-column
              prop="productImage"
              label="商品信息"
              width="180">
              <template slot-scope="{row}">
                <el-image
                  style="width: 88px; height: 88px"
                  :src="row.productImage"
                  :fit="'scale-down'">
                </el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="productPrice"
              label="单价"
              width="180">
            </el-table-column>
            <el-table-column
              prop="productQuantity"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="productAmount"
              label="小计">
              <template slot-scope="{row}">
                <span
                  style="font-weight: bold;font-style: normal; color: rgb(255, 0, 54);font-size: 14px;min-width: 100px">
                  {{row.productAmount}}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-divider></el-divider>
        <el-card class="box-card1">
          <div style="float: right">
            <span style="font-weight: 700;">实付款: </span>
            <span style="font-size: 26px; margin-right: 4px;color: #999">¥</span>&nbsp;
            <span style="font: 700 26px tahoma;color: rgb(255, 0, 54);">{{totalAmount}}</span></div>
          <div style="float: right;font-size: 12px">
            <span style="font-weight: 700;">寄送至:</span>
            <span>{{defaultAddress.receiverProvince}}&nbsp;{{defaultAddress.receiverCity}}&nbsp;{{defaultAddress.receiverRegion}}&nbsp;
                  {{defaultAddress.receiverDetailAddress}}</span>
          </div>
          <div style="float: right;font-size: 12px">
            <span style="font-weight: 700;">收货人:</span>
            <span>{{defaultAddress.receiverName}}&nbsp;{{defaultAddress.receiverPhone}}</span>
          </div>
        </el-card>
        <div style="clear: both"></div>
        <div style="float: right;">
          <el-link style="margin-right: 20px" icon="el-icon-back" @click="goToCart" :underline="false" type="primary">
            返回购物车
          </el-link>
          <a-button @click="addOrder" type="danger" size="large"
                    style="border-radius: unset !important;padding: 0 50px;">
            提交订单
          </a-button>
        </div>
      </div>
      <div v-if="active === 1" class="confirm-order-pay">
        <el-alert
          title="请在 15 分钟内完成支付"
          type="error"
          center>
        </el-alert>
        <a-list item-layout="horizontal" style="margin-top: 5%">
          <a-list-item>
            <el-radio v-model="radio" :label="1"><span>支付宝</span><img src="../../../assets/alipay.jpeg" height="60px"
                                                                      width="140px" style="margin-left: 10px"/>
            </el-radio>
          </a-list-item>
          <a-list-item>
            <el-radio v-model="radio" :label="2"><span>微信</span> <img src="../../../assets/wechat.jpg" height="60px"
                                                                      width="100px" style="margin-left: 30px"/>
            </el-radio>
          </a-list-item>
          <a-list-item>
            <el-radio v-model="radio" :label="3"><span>银行卡</span> <img src="../../../assets/union.png" height="60px"
                                                                       width="120px" style="margin-left: 10px"/>
            </el-radio>
          </a-list-item>
        </a-list>
        <el-divider></el-divider>
        <a-button type="danger" size="large" style="margin-left: 74%;margin-top: 1%;border-radius: unset !important;padding: 0 50px" @click="payOrder">
          立即付款
        </a-button>

      </div>
    </div>
  </div>
</template>

<script>
  import db from "@/store/user/db";
  import {AddressApi} from '../address/AddressApi';
  import {CartApi} from "../cart/api";
  import {OrderApi} from '../../order/api'

  export default {
    name: "confirm-order",
    data() {
      return {
        active: 0,
        defaultAddress: '',

        products: [],
        totalAmount: 0,
        radio: 1,
        orderId: null,

      }
    },

    mounted() {
      this.active = this.$route.query.active || 0
      this.orderId = this.$route.query.orderId
      this.getDefaultAddress();
      this.getCartList();
    },

    methods: {
      getCartList() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            page: 1,
            pageSize: 10000,
            userId: user.id
          }
          CartApi.getCartList(params).then((res) => {
            this.products = res.data;
            for (let i = 0; i < this.products.length; i++) {
              this.totalAmount += this.products[i].productAmount;
            }
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
      getDefaultAddress() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            userId: user.id
          }
          AddressApi.getDefaultAddress(params).then(res => {
            this.defaultAddress = res.data
          }).catch(err => {
            this.$message.err(err.message)
          })
        } else {
          this.$message.info("您还未登陆，请先登录")
          this.$router.push('/login').catch(err => {
            console.log(err)
          });
        }
      },

      payOrder() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            id: this.orderId,
            paymentType: this.radio,
          }
          OrderApi.payOrder(params).then(res => {
            this.$message.success(res.message);
            this.next();
            this.$router.push('/personal').catch(err => err);
          }).catch(err => {
            this.$message.err(err.message);

          })
        } else {
          this.$message.info("您还未登陆，请先登录")
          this.$router.push('/login').catch(err => {
            console.log(err)
          });
        }
      },

      goToAddressManage() {
        this.$router.push('/personal').catch(err => err);
      },

      goToCart() {
        this.$router.push('/cart').catch(err => err);
      },
      next() {
        if (this.active++ > 3) this.active = 0;
      },

      addOrder() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            userId: user.id,
            addressId: this.defaultAddress.id,
            totalAmount: this.totalAmount
          }
          OrderApi.addOrder(params).then(res => {
            this.$message.success(res.message);
            this.orderId = res.data.id;
            this.next();
          }).catch(err => {
            this.$message.err(err.message)
          })
        } else {
          this.$message.info("您还未登陆，请先登录")
          this.$router.push('/login').catch(err => {
            console.log(err)
          });
        }
      },
    },

  }
</script>

<style scoped>
  .app-container {
    height: 100%;
    margin: 3% 16%;
  }

  .order-step {
    padding-left: 16%;
    /*color: #666 !important;*/
  }

  .box-card {
    width: 300px;
    color: #666;
    margin-top: 5px;
  }

  .box-card1 {
    border: 1px solid red;
    width: 300px;
    float: right;
    border-radius: unset !important;
  }

  .confirm-order-pay {
    margin: 5% 17%;
  }
</style>
