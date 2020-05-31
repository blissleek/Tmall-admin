<template>
  <div class="app-container">
    <div class="product-table">
      <div class="product-admin-head">
        <p>共 <span class="product-total">{{totalCount}}</span> 条记录</p>
        <el-button class="product-link-btn" size="small" @click="addProduct" type="primary" icon="el-icon-plus">
          新增
        </el-button>
      </div>
      <el-table
        :data="productData" border style="width: 100%" :header-cell-style="headerCellStyle"
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
          prop="mainImage"
          align="center"
          label="商品图片"
          width="200">
          <template slot-scope="{row}">
            <el-image
              style="width: 88px; height: 88px"
              :src="row.mainImage"
              :fit="'scale-down'">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="商品名称"
          align="center">
        </el-table-column>

        <el-table-column
          fixed
          prop="price"
          label="商品价格"
          align="center">
          <template slot-scope="{row}">
            <span >¥ <span style="color: red">{{row.price}}</span></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="商品状态"
          align="center"
          width="180">
          <template slot-scope="{row}">
            <el-tag v-if="row.status === 1" type="success">在售</el-tag>
            <el-tag v-if="row.status === 2" type="info">下架</el-tag>
            <el-tag v-if="row.status === 3" type="danger">已删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="productBrandId"
          label="商品品牌"
          align="center">
          <template slot-scope="{row}">
            <span>{{getBrand(row.productBrandId)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryId"
          label="商品分类"
          align="center">
          <template slot-scope="{row}">
            <span>{{getCategory(row.productCategoryId)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right" width="190px">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="getProduct(row.id)">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirm(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑商品信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" :step="1" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item prop='image' v-model="form.image" label="图片">
            <comp-upload ref="uploadImage" :limit="1"></comp-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="">提 交</el-button>
        </span>
      </el-dialog>
      <div class="product-pagination">
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
  import {ProductSpuApi} from './spuApi';
  import {CategoryApi} from '../category/api';
  import {BrandApi} from '../brand/api';
  import CompUpload from '../../components/uplocal-file'

  export default {
    name: "product-table",
    components: {
      CompUpload,
    },
    data() {
      return {
        productData: [],

        dialogVisible: false,
        form: {},
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
        pageSize: 10,
        totalCount: 0,

        productCateOptions: [],
        brandOptions: [],

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
      this.getBrandList()
      this.getProductList()
    },
    methods: {

      getProduct(id) {
        this.$router.push({
          path: '/admin/product/addProduct',
          query: {productId: id,type: 'edit'}
        });
      },

      getBrand(brandId) {
        for (let i = 0; i < this.brandOptions.length; i++) {
          if (this.brandOptions[i].id === brandId){
            return this.brandOptions[i].name
          }
        }
        return null;
      },

      getCategory(CategoryId) {
        for (let i = 0; i < this.productCateOptions.length; i++) {
          if (this.productCateOptions[i].id === CategoryId){
            return this.productCateOptions[i].name
          }
        }
        return null;
      },

      getCategoryList() {
        const params = {
          page: 1,
          pageSize: 1000
        }
        CategoryApi.getCategoryList(params).then((res) => {
          this.productCateOptions = res.data;
        }).catch((err) => {
          this.$message.error(err.message);
        });
      },

      getBrandList() {
        const params = {
          page: 1,
          pageSize: 100
        }
        BrandApi.getBrandList(params).then(res => {
          this.brandOptions = res.data;

        }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      getProductList() {
        const params = {
          ...this.params,
          page: this.page,
          pageSize: this.pageSize
        }
        ProductSpuApi.getProductSpuList(params).then((res) => {
          this.productData = res.data
          this.page = res.page
          this.pageSize = res.pageSize
          this.totalCount = res.totalCount
        }).catch((err) => {
          this.$message.error(err.data.message)
        })
      },

      addProduct() {
        this.$router.push({path: '/admin/product/addProduct'}).catch(err => {err})
      },


      updateProduct() {
        this.dialogVisible = true
      },

      deleteProduct(id) {
        const params = {
          id: id
        };
        ProductSpuApi.deleteProductSpu(params).then(res => {
          this.getProductList()
          this.$message.success(res.message);
        })
      },
      openConfirm(id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteProduct(id)
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
        this.getProductList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getProductList()
      },

    }
  }
</script>

<style scoped>
  .el-table-column {
    line-height: 16px !important;
  }

  .product-admin-head {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .product-admin-head p {
    font-size: 14px;
  }
</style>
