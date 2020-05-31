<template>
  <div class="app-container">
    <div class="category-table">
      <div slot="header" class="clear-fix">
        <div class="category-admin-head">
          <p>共 <span class="category-total">{{totalCount}}</span> 条记录</p>
          <el-button class="category-link-btn" size="small" type="primary" icon="el-icon-plus" @click="addCategory">
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
          <el-form-item label="父类ID" prop="parentId">
            <el-input-number v-model="form.parentId" :step="1" :min="0"></el-input-number>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading">提 交</el-button>
        </span>
      </el-dialog>
      <el-table :data="categoryData" border style="width: 100%" :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle" :cell-style="headerColumnCellStyle">
        <el-table-column prop="id" label="ID" align="center" width="100"/>
        <el-table-column prop="parentId" label="父类ID" align="center" width="150"/>
        <el-table-column prop="name" label="名称" align="center"/>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="{row}">
            <el-tag v-if="row.status === 1" type="success">正常</el-tag>
            <el-tag v-if="row.status === 0" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="150"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="updateCategory(row.id)">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirm(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="category-pagination">
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
  import {CategoryApi} from './api'

  export default {
    name: 'index',
    data() {
      return {
        categoryData: [],

        dialogVisible: false,
        form: {
        },
        formType: '',
        formTypeTitle: '',
        loading: false,
        rules: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          parentId: [{
            required: true,
            message: '请父类ID',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
        },
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
      this.getCategoryList()
    },
    methods: {
      getCategoryList() {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        CategoryApi.getCategoryList(params).then(res => {
          this.categoryData = res.data
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
            this.loading = !this.loading;
            const params = {
              ...this.form
            };
            if (this.formType === 'add') {
              CategoryApi.addCategory(params).then(res => {
                if (res) {
                  this.getCategoryList()
                  this.$message.success(res.message);
                  this.loading = !this.loading;
                  this.handleClose()
                }
              })
            } else if (this.formType === 'edit') {
              params.id = this.form.id;
              CategoryApi.updateCategory(params).then(res => {
                if (res) {
                  this.getCategoryList()
                  this.$message.success(res.message);
                  this.loading = !this.loading;
                  this.handleClose()
                }
              })
            }
          } else {
            return false;
          }
        });
      },

      handleClose() {
        this.dialogVisible = false
        this.$refs['form'].resetFields();
      }
      ,

      addCategory() {
        this.dialogVisible = true
        this.formType = 'add'
        this.formTypeTitle = '添加商品分类'
      }
      ,
      updateCategory(id) {
        this.dialogVisible = true
        this.formType = 'edit'
        this.formTypeTitle = '编辑商品分类'
        const params = {
          id: id
        };
        CategoryApi.getCategory(params).then(res => {
          this.form = res.data
        })
      },

      deleteCategory(id) {
        const params = {
          id: id
        };
        CategoryApi.deleteCategory(params).then(res => {
          this.getCategoryList()
          this.$message.success(res.message);
        })
      }
      ,
      openConfirm(id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCategory(id)
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getCategoryList()
      }
      ,
      handleCurrentChange(val) {
        this.page = val;
        this.getCategoryList()
      }
    }
  }
</script>

<style scoped>
  .category-pagination {
    margin-top: 15px;
  }
  .category-admin-head{
    justify-content:space-between;display: flex;align-items:center;
  }
  .category-admin-head p{
    font-size: 14px;
  }
</style>
