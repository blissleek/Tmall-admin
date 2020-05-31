<template>
  <div class="tmall-web-login-container">
    <div class="tmall-web-login">
      <el-card class="box-card" style="width: 400px;height:300px;margin: 200px 500px 300px;position: absolute">
        <el-form :model="formData" status-icon ref="formData" label-width="80px" style="padding-top: 50px">
          <el-form-item prop="userName" label="用户名:">
            <el-input
              v-model="formData.userName"
              placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码:">
            <el-input
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>

          <el-button
            style="width: 40%;margin-left: 120px"
            type="primary"
            @click="login">
            登录
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>

</template>

<script>
  import {UserApi} from './api'
  import db from "@/store/user/db";

  export default {
    name: "login",
    data() {
      return {
        formData: {
          userName: '',
          password: ''
        },
      }
    },

    methods: {
      login() {
        const params = {
          ...this.formData
        };
        UserApi.login(params).then(res => {
          db.set('user', res.data);
          this.$router.push('/').catch(err => {console.log(err)});
        }).catch((err) => {
          this.$message.error(err.message);
        })

      },


    }
  }
</script>

<style scoped>
  .tmall-web-login-container {
    background: url("../../../assets/background.jpeg") bottom center no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
</style>
