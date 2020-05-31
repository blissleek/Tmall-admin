<template>
  <el-container>
    <el-header class="tmall-web-header">
      <div style="height: 60px;background-color: black">
        <router-link :to="'/'">
          <img src="../../assets/fly.jpg" height="60px" width="60px" style="margin-left: 26%;float: left;"/>
        </router-link>
        <h2 style="color: #ffff;float: left;padding-left:15px;line-height: 50px">Tmall</h2>
        <el-dropdown class="avatar-container" trigger="hover" v-if="this.user !== null && this.user !== undefined">
          <a-avatar v-if="this.user !== null && this.user !== undefined"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    style="margin-left: 45%;float: left;margin-top: 7px"/>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/personal">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link :to="'/login'">
          <a-button v-if="this.user == null && this.user !== undefined" shape="circle" icon="user"
                    style="margin-left: 45%;float: left;margin-top: 10px"/>
        </router-link>
        <router-link :to="'/cart'">
          <a-button type="primary" shape="circle" icon="shopping-cart"
                    style="margin-left: 35px;float: left;margin-top: 10px"/>
        </router-link>
      </div>

    </el-header>
    <el-main>
      <router-view></router-view>
      <div style="clear: both"></div>
    </el-main>
    <el-footer class="web-container-footer">
      <span> Tmall ©2020</span>
    </el-footer>
  </el-container>
</template>

<script>
  import db from "@/store/user/db";
  import {ProductSpuApi} from '../../views/product/spuApi';

  export default {
    name: "WebContainer",
    components: {},
    data() {
      return {
        activeIndex: '1',
        products: [],
        user: {},
        carousels: [
          {id: 1, imagePath: 'http://47.113.81.251:9000/tmall/tmall/20200518160247_TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg'},
          {id: 2, imagePath: 'http://47.113.81.251:9000/tmall/tmall/20200518160247_TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg'},
          {id: 3, imagePath: 'http://47.113.81.251:9000/tmall/tmall/20200518160247_TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg'}
        ],
      }
    },
    created() {
      this.user = db.get("user");
      // this.getProductList();
    },

    methods: {
      getProductList() {
        const params = {
          // ...this.params,
          page: 1,
          pageSize: 12
        }
        ProductSpuApi.getProductSpuList(params).then((res) => {
          this.products = res.data
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      logout() {
        if (db.get("user") !== null && db.get("user") !== undefined) {
          db.remove("user");
          location.reload();
        }
      },

      goHome() {
        this.$router.push({path: '/'}).catch(err => {
          err
        })
      }

    }
  }
</script>

<style scoped>
  .el-menu {
    padding: 0 25%;
    border-bottom: none !important;
  }

  .el-header {
    /*background-color: #545c64;*/
    /*height: 120px !important;*/
    line-height: 47px;
    /*border-bottom: 1px #e6e6e6 solid;*/
    color: #333;
  }

  .el-main {
    color: #333;
    /*height: 100%;*/
    padding: 0 0;

    overflow: unset;
  }

  .el-container {
    margin: 0;
    height: 100%;
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

  .tmall-web-header {
    padding: unset !important;
  }

  .avatar-container {
    margin-left: 45%;
    float: left;
  }

  .web-container-footer {
    margin-top: 5%;
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 30px !important;
    height: 30px !important;
  }

</style>
