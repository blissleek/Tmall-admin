<template>
  <el-container>
    <el-aside width="200px">
      <SliderBar :is-Collapse="isCollapse" class="sidebar-container"></SliderBar>
      <!--<el-menu default-active="0"-->
               <!--class="sidebar-container"-->
               <!--mode="vertical"-->
               <!--:collapse="isCollapse"-->
               <!--background-color="#304156"-->
               <!--text-color="#fff"-->
               <!--active-text-color="#409EFF">-->
        <!--<router-link :to="'/admin/dashboard'">-->
          <!--<el-menu-item index="0">-->
            <!--<i class="el-icon-s-home"></i>-->
            <!--<span slot="title">首页</span>-->
          <!--</el-menu-item>-->
        <!--</router-link>-->
        <!--<el-submenu index="1">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-s-goods"></i>-->

            <!--<span slot="title">商品管理</span>-->
          <!--</template>-->
          <!--<router-link :to="'/admin/product'">-->
            <!--<el-menu-item index="1-1">-->
              <!--<i class="el-icon-s-operation"></i>-->
              <!--<span slot="title">商品列表</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
          <!--<router-link :to="'/admin/product/addProduct'">-->
            <!--<el-menu-item index="1-2">-->
              <!--<i class="el-icon-circle-plus"></i>-->
              <!--<span slot="title">添加商品</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
          <!--<router-link :to="'/admin/category'">-->
            <!--<el-menu-item index="1-3">-->
              <!--<i class="el-icon-s-grid"></i>-->
              <!--<span slot="title">商品分类</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
          <!--<router-link :to="'/admin/brand'">-->
            <!--<el-menu-item index="1-4">-->
              <!--<i class="el-icon-s-cooperation"></i>-->
              <!--<span slot="title">品牌管理</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="2">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">订单管理</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="3">-->
          <!--<i class="el-icon-document"></i>-->
          <!--<span slot="title">轮播管理</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="4">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span slot="title">权限管理</span>-->
        <!--</el-menu-item>-->
      <!--</el-menu>-->

    </el-aside>
    <el-container>
      <el-header>
        <!--<el-button v-if="isCollapse === false"  type="primary" size="mini" icon="el-icon-s-fold"  @click="isCollapse = true"></el-button>-->
        <!--<el-button v-if="isCollapse === true" type="primary" size="mini" icon="el-icon-s-unfold"  @click="isCollapse = false"></el-button>-->
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import SliderBar from './SliderBar';

  export default {
    name: "AdminContainer",
    components: {
      SliderBar
    },
    data() {
      return {
        isCollapse: false,
      }
    }
  }
</script>

<style scoped>

  .sidebar-container {
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
  }
  .el-menu-item {
    width: 199px !important;
  }

  a {
    text-decoration: none
  }
  .sidebar-container:not(.el-menu--collapse) {
    width: 201px;
    min-height: 400px;
  }
</style>
