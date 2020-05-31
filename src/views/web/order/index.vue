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
            <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirm(row.id)">删除</el-button>
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
  import db from "@/store/user/db";
  import {OrderApi} from '../../order/api'
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
      this.getOrderList()
    },

    methods: {
      getOrder(id) {
        this.$router.push('/order/' + id).catch(err => err);
      },

      getOrderList() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            page: this.page,
            pageSize: this.pageSize,
            userId: user.id
          }
          OrderApi.getOrderList(params).then(res => {
            this.orderData = res.data;
            this.page = res.page;
            this.pageSize = res.pageSize;
            this.totalCount = res.totalCount
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

      openConfirm: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteOrder(id)
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      deleteOrder(id) {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            id: id
          }
          OrderApi.getOrderList(params).then(res => {
            this.getOrderList();
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
