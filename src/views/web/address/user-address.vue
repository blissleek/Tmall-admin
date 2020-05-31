<template>
  <div class="app-container">
    <div class="address-table">
      <div class="address-web-head">
        <p>共 <span class="addres-total">{{totalCount}}</span> 条记录</p>
        <el-button class="address-link-btn" type="primary" size="small" icon="el-icon-plus" @click="addAddress">
          新增
        </el-button>
      </div>
      <el-table
        :data="address" border style="width: 100%" :header-cell-style="headerCellStyle"
        :header-row-style="headerRowStyle" :cell-style="headerColumnCellStyle">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          fixed
          prop="receiverName"
          align="center"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          prop="receiverPhone"
          label="电话"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="receiverDetailAddress"
          label="详细地址"
          align="center">
          <template slot-scope="{row}">
            <span>{{row.receiverProvince}}&nbsp;{{row.receiverCity}}&nbsp;{{row.receiverRegion}}&nbsp;{{row.receiverDetailAddress}}</span>
            <el-tag size="small" v-if="row.isDefault === 1">默认</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right" width="190px">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="updateAddress(row.id)">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirm(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="addressTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item label="姓名" prop="receiverName">
            <el-input v-model="form.receiverName"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="receiverPhone">
            <el-input v-model="form.receiverPhone"></el-input>
          </el-form-item>
          <el-form-item label="省份" prop="receiverProvince">
            <el-input v-model="form.receiverProvince"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="receiverCity">
            <el-input v-model="form.receiverCity"></el-input>
          </el-form-item>
          <el-form-item label="区县" prop="receiverRegion">
            <el-input v-model="form.receiverRegion"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="receiverDetailAddress">
            <el-input v-model="form.receiverDetailAddress"></el-input>
          </el-form-item>
          <el-form-item label="是否设为默认地址" prop="isDefault">
            <el-switch
              v-model="isDefaultAddress"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit">提 交</el-button>
        </span>
      </el-dialog>
      <div class="address-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 20,30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {AddressApi} from './AddressApi';
  import db from "@/store/user/db";

  export default {
    name: "user-address",
    data() {
      return {
        address: [],
        page: 1,
        pageSize: 5,
        totalCount: 0,

        form: {},
        isDefaultAddress: false,
        dialogVisible: false,
        addressTitle: '',
        addressType: '',
        rules: {
          receiverName: [{
            required: true,
            message: '收件人姓名不能为空',
            trigger: 'blur'
          }],
          receiverPhone: [{
            required: true,
            message: '收件人电话不能为空',
            trigger: 'blur'
          }],
          receiverDetailAddress: [{
            required: true,
            message: '详细地址不能为空',
            trigger: 'blur'
          }],
        },

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
      this.getAddressList();
    },

    methods: {
      getAddressList() {
        let user = db.get("user");
        if (user !== null && user !== undefined) {
          const params = {
            page: this.page,
            pageSize: this.pageSize,
            userId: user.id
          }
          AddressApi.getAddressList(params).then((res) => {
            this.address = res.data
            this.page = res.page
            this.pageSize = res.pageSize
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

      updateAddress(id) {
        this.dialogVisible = true;
        this.addressType = 'edit';
        this.addressTitle = '编辑收货地址';
        const params = {
          id: id
        };
        AddressApi.getAddress(params).then(res => {
          this.form = res.data;
          this.isDefaultAddress = this.form.isDefault === 1;
        })
      },

      addAddress() {
        this.dialogVisible = true;
        this.addressType = 'add';
        this.addressTitle = '添加收货地址';
      },

      openConfirm(id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteAddress(id)
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      deleteAddress(id) {
        const params = {
          id: id
        };
        AddressApi.deleteAddress(params).then(res => {
          this.getAddressList();
          this.$message.success(res.message);
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      onSubmit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            let user = db.get("user");
            if (user !== null && user !== undefined) {
              const params = {
                ...this.form,
                userId: user.id,
                isDefault: this.isDefaultAddress === true ? 1 : 0
              };
              if (this.addressType === 'add') {
                AddressApi.addAddress(params).then(res => {
                  if (res) {
                    this.getAddressList()
                    this.$message.success(res.message);
                    this.handleClose()
                  }
                })
              } else if (this.addressType === 'edit') {
                params.id = this.form.id;
                // params.userId = user.id;
                AddressApi.updateAddress(params).then(res => {
                  if (res) {
                    this.getAddressList();
                    this.$message.success(res.message);
                    this.handleClose()
                  }
                })
              }
            }
            else {
              this.$message.info("您还未登陆，请先登录")
              this.$router.push('/login').catch(err => {
                console.log(err)
              });
            }
          } else {
            return false;
          }
        });
      },

      handleClose() {
        this.dialogVisible = false
        this.$refs['form'].resetFields();
      },


      handleSizeChange(val) {
        this.pageSize = val;
        this.getAddressList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getAddressList()
      },

    }
  }
</script>

<style scoped>
  .address-pagination {
    margin-top: 10px;
  }

  .address-web-head {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .address-web-head p {
    font-size: 14px;
  }

  .address-link-btn {
    margin-bottom: 5px;
  }
</style>
