<template>
  <div class="app-container">
    <div class="carousel-table">
      <div slot="header" class="clear-fix">
        <div class="carousel-admin-head">
          <p>共 <span class="carousel-total">{{totalCount}}</span> 条记录</p>
          <el-button class="carousel-link-btn" size="small" type="primary" icon="el-icon-plus" @click="addCarousel">
            新增
          </el-button>
        </div>
      </div>
      <el-dialog :title="formTypeTitle" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form ref="form" :model="form"  label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="form.link" ></el-input>
          </el-form-item>
          <el-form-item prop='image' v-model="form.image" label="轮播图">
            <comp-upload ref="uploadImage" :limit="1"></comp-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit">提 交</el-button>
        </span>
      </el-dialog>
      <el-table :data="carouselData" border style="width: 100%"
                :header-cell-style="headerCellStyle"
                :header-row-style="headerRowStyle" :cell-style="headerColumnCellStyle">
        <el-table-column prop="id" label="ID" align="center" width="100"/>
        <el-table-column prop="title" label="标题" width="180" align="center"/>
        <el-table-column prop="link" label="链接" align="center" width="180"/>
        <el-table-column prop="image" label="轮播图" align="center">
          <template slot-scope="{row}">
            <el-image
              style="width: 220px; height: 100px"
              :src="row.image"
              :fit="'scale-down'"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="updateCarousel(row.id)">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirm(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="carousel-pagination">
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
  import {CarouselApi} from './api'

  export default {
    name: 'index',
    components: {
      CompUpload
    },
    data() {
      return {
        carouselData: [],

        dialogVisible: false,
        form: {},
        formType: '',
        formTypeTitle: '',
        // rules: {
        //   image: [{
        //     required: true,
        //     message: '请上传轮播图片',
        //     trigger: 'blur'
        //   }],
        // },
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
      this.getCarouselList()
    },
    methods: {
      getCarouselList() {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        }
        CarouselApi.getCarouselList(params).then(res => {
          this.carouselData = res.data
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
              const params = {
                ...this.form
              };
              if (this.formType === 'add') {
                CarouselApi.addCarousel(params, fileList).then(res => {
                  this.getCarouselList()
                  this.$message.success(res.data.message);
                })
              } else if (this.formType === 'edit') {
                params.id = this.form.id;
                CarouselApi.updateCarousel(params, fileList).then(res => {
                  this.getCarouselList()
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

      addCarousel() {
        this.dialogVisible = true
        this.formType = 'add'
        this.formTypeTitle = '添加轮播图'
      },
      updateCarousel(id) {
        this.dialogVisible = true
        this.formType = 'edit'
        this.formTypeTitle = '编辑轮播图'
        const params = {
          id: id
        };
        CarouselApi.getCarousel(params).then(res => {
          this.form = res.data
        })
      },

      deleteCarousel(id) {
        const params = {
          id: id
        };
        CarouselApi.deleteCarousel(params).then(res => {
          this.getCarouselList()
          this.$message.success(res.message);
        })
      },
      openConfirm: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCarousel(id)
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getCarouselList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getCarouselList()
      }
    }
  }
</script>

<style scoped>
  .carousel-pagination {
    margin-top: 15px
  }

  .carousel-admin-head {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .carousel-admin-head p {
    font-size: 14px;
  }
</style>
