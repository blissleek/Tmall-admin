<template>
  <div class="app-container">
    <div class="order-table">
      <div slot="header" class="clear-fix">
        <div class="order-admin-head">
          <p>共 <span class="order-total">{{totalCount}}</span> 条记录</p>
        </div>
      </div>
      <el-table :data="orderData" border style="width: 100%" :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle" :cell-style="headerColumnCellStyle">
        <el-table-column prop="id" label="ID" align="center" width="100"/>
        <el-table-column prop="orderNo" label="订单编号" align="center" width="300"/>
        <el-table-column prop="totalAmount" label="订单金额" align="center">
          <template slot-scope="{row}">
            <span style="color: red">¥&nbsp;&nbsp;{{row.totalAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="{row}">
            <el-tag v-if="row.status === 0" type="info">待付款</el-tag>
            <el-tag v-if="row.status === 1" type="warning">已付款、待发货</el-tag>
            <el-tag v-if="row.status === 2">已发货</el-tag>
            <el-tag v-if="row.status === 3" type="success">已完成</el-tag>
            <el-tag v-if="row.status === 4" type="danger">已关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" icon="el-icon-view" @click="getOrder(row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="order-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 40, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {OrderApi} from './api'
  export default {
    name: "index",
    data() {
      return {
        orderData: [],

        page: 1,
        pageSize: 10,
        totalCount: 0,

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

    mounted() {
      this.getOrderList();
    },

    methods: {

      getOrder(id) {
        this.$router.push('/admin/order/' + id).catch(err => err);
      },

      getOrderList() {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        OrderApi.getOrderList(params).then(res => {
          this.orderData = res.data;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getOrderList()
      }
      ,
      handleCurrentChange(val) {
        this.page = val;
        this.getOrderList()
      }

    },
  }
</script>

<style scoped>
.order-pagination {
  margin-top: 15px;
}
.order-admin-head{
  justify-content:space-between;display: flex;align-items:center;
}
.order-admin-head p{
  font-size: 14px;
}
</style>
