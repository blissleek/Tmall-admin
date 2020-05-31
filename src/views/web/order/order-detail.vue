<template>
  <div class="app-container">
    <div class="order-detail">
      <div class="order-step">
        <el-steps :active="formatStepStatus(order.status)" finish-status="success" align-center>
          <el-step title="提交订单" :description="formatTime(order.createdAt)"></el-step>
          <el-step title="支付订单" :description="formatTime(order.paymentTime)"></el-step>
          <el-step title="平台发货" :description="formatTime(order.deliveryTime)"></el-step>
          <el-step title="确认收货" :description="formatTime(order.receiveTime)"></el-step>
          <el-step title="完成评价" :description="formatTime(order.commentTime)"></el-step>
        </el-steps>
      </div>
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger" v-if="order.status === 0" type="info">当前订单状态：待付款</span>
        <span class="color-danger" v-if="order.status === 1" type="warning">当前订单状态：已付款、待发货</span>
        <span class="color-danger" v-if="order.status === 2">当前订单状态：已发货</span>
        <span class="color-danger" v-if="order.status === 3" type="success">当前订单状态：已完成</span>
        <span class="color-danger" v-if="order.status === 4" type="danger">当前订单状态：已关闭</span>
        <div class="operate-button-container" v-show="order.status===0">
          <el-button size="mini" @click="payOrder">立即付款</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===2">
          <el-button size="mini" @click="updateOrder">确认收货</el-button>
        </div>
      </div>

      <div style="margin-top: 20px">
        <i class="el-icon-collection-tag"></i>
        <span style="font-size: 16px;font-weight: 500;">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">订单编号</el-col>
          <el-col :span="4" class="table-cell-title">创建时间</el-col>
          <el-col :span="4" class="table-cell-title">订单金额</el-col>
          <el-col :span="4" class="table-cell-title">支付方式</el-col>
          <el-col :span="4" class="table-cell-title">支付时间</el-col>
          <el-col :span="4" class="table-cell-title">订单来源</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.orderNo}}</el-col>
          <el-col :span="4" class="table-cell">{{order.createdAt}}</el-col>
          <el-col :span="4" class="table-cell">¥&nbsp;{{order.totalAmount}}</el-col>
          <el-col :span="4" class="table-cell">
            <span v-if="order.paymentType === 1">支付宝</span>
            <span v-if="order.paymentType === 2">微信</span>
            <span v-if="order.paymentType === 3">银行卡</span>
          </el-col>
          <el-col :span="4" class="table-cell">{{order.paymentTime}}</el-col>
          <el-col :span="4" class="table-cell">网页订单</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">配送物流</el-col>
          <el-col :span="4" class="table-cell-title">物流单号</el-col>
          <el-col :span="4" class="table-cell-title">配送时间</el-col>
          <el-col :span="4" class="table-cell-title">确认收货时间</el-col>
          <el-col :span="4" class="table-cell-title">评价时间</el-col>
          <el-col :span="4" class="table-cell-title">订单备注</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.deliveryCompany}}</el-col>
          <el-col :span="4" class="table-cell">{{order.deliveryNo}}</el-col>
          <el-col :span="4" class="table-cell">{{order.deliveryTime}}</el-col>
          <el-col :span="4" class="table-cell">{{order.receiveTime}}</el-col>
          <el-col :span="4" class="table-cell"></el-col>
          <el-col :span="4" class="table-cell"></el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <i class="el-icon-collection-tag"></i>
        <span style="font-size: 16px;font-weight: 500;">收货人信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="14" class="table-cell-title">详细地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order_address.receiverName}}</el-col>
          <el-col :span="6" class="table-cell">{{order_address.receiverPhone}}</el-col>
          <el-col :span="14" class="table-cell">
            {{order_address.receiverProvince}}&nbsp;{{order_address.receiverCity}}&nbsp;
            {{order_address.receiverRegion}}&nbsp;{{order_address.receiverDetailAddress}}&nbsp;
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <i class="el-icon-collection-tag"></i>
        <span style="font-size: 16px;font-weight: 500;">商品信息</span>
      </div>
      <div class="order-detail-item">
        <el-table
          :data="orderItem"
          border
          style="width: 100%; margin-top: 20px;" :header-cell-style="headerCellStyle"
          :header-row-style="headerRowStyle" :cell-style="headerColumnCellStyle">
          <el-table-column
            prop="productImage"
            label="商品图片"
            width="120"
            align="center">
            <template slot-scope="{row}">
              <el-image
                style="width: 88px; height: 88px"
                :src="row.productImage"
                :fit="'scale-down'">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="商品名称"
            width="500"
            align="center">
            <template slot-scope="{row}">
              <div>{{row.productName}}</div>
              <div><span>品牌:&nbsp;&nbsp;</span>{{row.productBrand}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="商品价格"
            align="center">
            <template slot-scope="{row}">
              <div>¥&nbsp;{{row.productPrice}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="productQuantity"
            label="商品数量"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productAmount"
            label="小计"
            align="center">
            <template slot-scope="{row}">
              <div>¥&nbsp;{{row.productAmount}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div style="float: right;font-size: 16px;font-weight: 500;padding: 20px 40px">合计:&nbsp;&nbsp;&nbsp;&nbsp; <span
          style="color: red">¥&nbsp;{{order.totalAmount}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {orderItemApi} from './orderItemApi'
  import {AddressApi} from '../address/AddressApi'
  import {OrderApi} from '../../order/api'
  import {formatDate} from "@/tools/date";

  export default {
    name: "order-detail",
    data() {
      return {
        orderId: null,
        order: {},
        order_address: {},
        orderItem: [],


        headerCellStyle: {
          backgroundColor: '#f2f2f2',
          color: '#434343',
          height: '36px',
          padding: '6px 0',
          fontSize: '14px',
          fontFamily: 'Arial Normal',
          fontWeight: '400',
        },
        headerRowStyle: {
          color: 'black',
          border: '1px solid black',
        },
        headerColumnCellStyle: {
          backgroundColor: '#ffffff',
          height: '36px',
          padding: '6px 0',
          color: 'black',
        },


      }
    },

    created() {
      this.orderId = this.$route.params.id;
      this.getOrder();
    },

    methods: {

      formatTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },

      formatStepStatus(value) {
        if (value === 0) {
          //待发货
          return 0;
        } else if (value === 1) {
          //待发货
          return 1;
        } else if (value === 2) {
          //已发货
          return 2;
        } else if (value === 3) {
          //已完成
          return 3;
        } else {
          //待付款、已关闭、无限订单
          return 0;
        }
      },

      getLocalTime() {
        let timezone = 8;
        let offset_GMT = new Date().getTimezoneOffset();
        let nowDate = new Date().getTime();

        let today = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
        let date = today.getFullYear() + "-" + this.twoDigits(today.getMonth() + 1) + "-" + this.twoDigits(today.getDate());
        let time = this.twoDigits(today.getHours()) + ":" + this.twoDigits(today.getMinutes()) + ":" + this.twoDigits(today.getSeconds());
        return date + " " + time;
      },
      twoDigits(val) {
        if (val < 10) return "0" + val;
        return val;
      },
      payOrder() {
        this.$router.push({
          path: '/order/confirm_order',
          query: {active: this.order.status + 1, orderId: this.orderId}
        });
      },
      updateOrder() {
        const params = {
          id: this.orderId,
          status: 3,
          receiveTime: this.getLocalTime(),
        }
        OrderApi.updateOrder(params).then(res => {
          this.$message.success(res.message);
          this.getOrder();
        }).catch(err => {
          this.$message.err(err.message);

        })
      },
      getOrder() {
        const params = {
          id: this.orderId,
        }
        OrderApi.getOrder(params).then(res => {
          this.order = res.data;
          this.getOrderItem();
          this.getAddress(this.order.addressId);
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      getOrderItem() {
        const params = {
          orderId: this.orderId,
        }
        orderItemApi.getItemList(params).then(res => {
          this.orderItem = res.data;
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      getAddress(id) {
        const params = {
          id: id,
        }
        AddressApi.getAddress(params).then(res => {
          this.order_address = res.data;
        }).catch((err) => {
          this.$message.error(err.message)
        })
      }

    }
  }
</script>

<style scoped>
  .app-container {
    margin: 1% 10%;
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    line-height: 80px;
  }

  .color-danger {
    color: red;
    font-size: 16px;

  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .order-step {
    margin: 3% 4%;
  }
</style>
