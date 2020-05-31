<template>
  <el-menu default-active="0"
           class="tmall-admin-menu"
           :collapse="isCollapse"
           background-color="#304156"
           text-color="#fff"
           active-text-color="#409EFF">
    <router-link :to="'/admin/dashboard'">
      <el-menu-item index="0">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </template>
      <router-link :to="'/admin/product'">
        <el-menu-item index="1-1">
          <i class="el-icon-s-operation"></i>
          <span slot="title">商品列表</span>
        </el-menu-item>
      </router-link>
      <router-link :to="'/admin/product/addProduct'">
        <el-menu-item index="1-2">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">添加商品</span>
        </el-menu-item>
      </router-link>
      <router-link :to="'/admin/category'">
        <el-menu-item index="1-3">
          <i class="el-icon-s-grid"></i>
          <span slot="title">商品分类</span>
        </el-menu-item>
      </router-link>
      <router-link :to="'/admin/brand'">
        <el-menu-item index="1-4">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">品牌管理</span>
        </el-menu-item>
      </router-link>
    </el-submenu>
    <router-link :to="'/admin/order'">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/carousel'">
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">轮播管理</span>
      </el-menu-item>
    </router-link>
    <router-link :to="'/admin/user'">
      <el-menu-item index="4">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </router-link>
  </el-menu>

</template>

<script>
  export default {
    name: "SliderBarMenu",
    // props: ['isCollapse'],
    data() {
      return {
        isCollapse: false
      }
    },

  }
</script>

<style scoped>
  .el-menu-item {
    width: 199px !important;
  }

  a {
    text-decoration: none
  }

</style>

