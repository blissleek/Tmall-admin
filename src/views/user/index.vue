<template>
<div>
  <div>
    <div slot="header" class="clear-fix">
      <div class="user-admin-head">
        <p>共 <span class="user-total">{{totalCount}}</span> 条记录</p>
        <el-button class="user-link-btn" size="small" type="primary" icon="el-icon-plus" @click="addUser">
          新增
        </el-button>
      </div>
    </div>
    <el-dialog :title="dialogTypeTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password ></el-input>
        </el-form-item>
        <el-form-item prop='email' v-model="form.email" label="邮箱">
          <el-input v-model="form.email" ></el-input>
        </el-form-item>
        <el-form-item prop='phone' v-model="form.phone" label="电话">
          <el-input v-model="form.phone" ></el-input>
        </el-form-item>
        <el-form-item prop='role' v-model="form.role" label="角色">
          <el-radio v-model="form.role" :label="1">普通用户</el-radio>
          <el-radio v-model="form.role" :label="0">管理员</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit">提 交</el-button>
        </span>
    </el-dialog>
    <el-table :data="userList" border style="width: 100%"
              :header-cell-style="headerCellStyle"
              :header-row-style="headerRowStyle" :cell-style="headerColumnCellStyle">
      <el-table-column prop="id" label="ID" align="center" width="100"/>
      <el-table-column prop="userName" label="用户名" width="180" align="center"/>
      <el-table-column prop="password" label="密码" align="center">
        <template slot-scope="{row}">
          <span>**********</span>
        </template>
      </el-table-column>
      <el-table-column prop="email"  label="邮箱" align="center" width="180"/>
      <el-table-column prop="phone"  label="电话" align="center" width="180"/>
      <el-table-column prop="role"  label="角色" align="center" width="180">
        <template slot-scope="{row}">
          <span v-if="row.role === 1">普通用户</span>
          <span v-if="row.role === 0">管理员</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="updateUser(row.id)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirm(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="user-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>

  </div>
</div>
</template>

<script>
  import {UserApi} from "@/views/user/api";

  export default {
    name: "index",
    data() {
      return {
        userList: [],
        form: {},
        rules: {
          userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
        dialogVisible: false,

        dialogType: '',
        dialogTypeTitle: '',
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

    created() {
      this.getUserList();
    },

    methods: {

      getUserList() {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        UserApi.getUserList(params).then(res => {
          this.userList = res.data
          this.page = res.page
          this.pageSize = res.pageSize
          this.totalCount = res.totalCount
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      onSubmit() {
          this.$refs['form'].validate(valid => {
            if (valid) {
              const params = {
                ...this.form
              };
              if (this.dialogType === 'add') {
                UserApi.addUser(params).then(res => {
                  this.getUserList()
                  this.$message.success(res.message);
                })
              } else if (this.dialogType === 'edit') {
                params.id = this.form.id;
                UserApi.updateUser(params).then(res => {
                  this.getUserList()
                  this.$message.success(res.message);
                })
              }
            } else {
              return false;
            }
          });
          this.handleClose()
      },

      addUser() {
        this.dialogVisible = true
        this.dialogType = 'add';
        this.dialogTypeTitle = '添加用户'
      },

      updateUser(id) {
        this.dialogVisible = true
        this.dialogType = 'edit';
        this.dialogTypeTitle = '添加用户'
        const params = {
          id: id
        };
        UserApi.getUser(params).then(res => {
          this.form = res.data
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      deleteUser(id) {
        const params = {
          id: id
        };
        UserApi.deleteUser(params).then(res => {
          this.getUserList()
          this.$message.success(res.message);
        })
      },

      openConfirm: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser(id)
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      handleClose() {
        this.dialogVisible = false
        this.$refs['form'].resetFields();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getUserList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUserList()
      }

    }
  }
</script>

<style scoped>
  .user-pagination {
    margin-top: 15px
  }

  .user-admin-head {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .user-admin-head p {
    font-size: 14px;
  }
</style>
