<template>
  <div class="app-container">
    <div class="brand-table">
      <div slot="header" class="clear-fix">
        <div class="brand-admin-head">
          <p>共 <span class="brand-total">{{totalCount}}</span> 条记录</p>
          <el-button class="brand-link-btn" size="small" type="primary" icon="el-icon-plus" @click="addBrand">
            新增
          </el-button>
        </div>
      </div>
      <el-dialog :title="formTypeTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" :step="1" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item prop='image' v-model="form.image" label="图标">
            <comp-upload ref="uploadImage" :limit="1"></comp-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading">提 交</el-button>
        </span>
      </el-dialog>
      <el-table :data="brandData" border style="width: 100%" :default-sort="{prop: 'sort', order: 'ascending'}"
                :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle" :cell-style="headerColumnCellStyle">
        <el-table-column prop="id" label="ID" align="center" width="100"/>
        <el-table-column prop="name" label="名称" width="180" align="center"/>
        <el-table-column prop="image" label="品牌商标" align="center">
          <template slot-scope="{row}">
            <el-image
              style="width: 88px; height: 88px"
              :src="row.image"
              :fit="'scale-down'"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="sort" sortable label="排序" align="center" width="180"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="updateBrand(row.id)">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirm(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="brand-pagination">
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
  import CompUpload from '../../components/uplocal-file'
  import {BrandApi} from './api'
  import { MessageBox } from 'element-ui'
  import { PackagesMessage } from 'element-ui'

  export default {
    name: 'index',
    components: {
      CompUpload
    },
    data() {
      return {
        brandData: [],

        dialogVisible: false,
        form: {},
        formType: '',
        formTypeTitle: '',
        loading: false,
        rules: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
        },
        page: 1,
        pageSize: 5,
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
      this.getBrandList()
    },
    methods: {
      getBrandList() {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        BrandApi.getBrandList(params).then(res => {
          this.brandData = res.data
          this.page = res.page
          this.pageSize = res.pageSize
          this.totalCount = res.totalCount
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      onSubmit() {
        this.$refs['uploadImage'].submitUpload().then(fileList => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.loading = !this.loading;
              const params = {
                ...this.form
              };
              if (this.formType === 'add') {
                BrandApi.addBrand(params, fileList).then(res => {
                  this.loading = !this.loading;
                  this.getBrandList()
                  this.$message.success(res.data.message);
                })
              } else if (this.formType === 'edit') {
                params.id = this.form.id;
                BrandApi.updateBrand(params, fileList).then(res => {
                  this.loading = !this.loading;
                  this.getBrandList()
                  this.$message.success(res.data.message);
                })
              }
            } else {
              return false;
            }
          });
          this.handleClose()
        })

      },

      handleClose() {
        this.dialogVisible = false
        this.$refs['form'].resetFields();
      },

      addBrand() {
        this.dialogVisible = true
        this.formType = 'add'
        this.formTypeTitle = '添加品牌'
      },
      updateBrand(id) {
        this.dialogVisible = true
        this.formType = 'edit'
        this.formTypeTitle = '编辑品牌'
        const params = {
          id: id
        };
        BrandApi.getBrand(params).then(res => {
          this.form = res.data
        })
      },

      deleteBrand(id) {
        const params = {
          id: id
        };
        BrandApi.deleteBrand(params).then(res => {
          this.getBrandList()
          this.$message.success(res.message);
        })
      },
      openConfirm: function (id) {
        MessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteBrand(id)
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getBrandList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getBrandList()
      }
    }
  }
</script>

<style scoped>
  .brand-pagination {
    margin-top: 15px
  }

  .brand-admin-head {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .brand-admin-head p {
    font-size: 14px;
  }
</style>
