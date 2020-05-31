<template>
  <div class="tmall-web-personal">
    <div>
      <el-tabs tab-position="left" style="height: 100%">
        <el-tab-pane label="我的订单">
          <user-order></user-order>
        </el-tab-pane>
        <el-tab-pane label="地址管理">
          <user-address></user-address>
        </el-tab-pane>
        <el-tab-pane label="评价管理">评价管理</el-tab-pane>
        <el-tab-pane label="我的购物车">
          <cart></cart>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import userAddress from '../address/user-address'
  import userOrder from '../order/index'
  import cart from '../cart/index'

  export default {
    name: "personal",
    components: {
      userAddress,
      cart,
      userOrder
    },
    data() {
      return {}
    },

    mounted() {

    },

    methods: {}
  }
</script>

<style scoped>
  .tmall-web-personal {
    margin: 3% 7%;
  }
</style>
