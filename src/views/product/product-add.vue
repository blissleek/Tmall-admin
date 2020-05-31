<template>
  <div class="app-container">
    <div class="product-table" style="padding-left: 10%">
      <!--<el-steps :active="active" finish-status="success" simple style="margin-top: 20px">-->
        <!--<el-step title="填写商品信息" icon="el-icon-edit"></el-step>-->
        <!--<el-step title="填写商品属性" icon="el-icon-upload"></el-step>-->
      <!--</el-steps>-->
      <el-form v-if="active === 0" class="product-apu-info" ref="form" :rules="rules" :model="form" label-width="120px"
               style="width: 1000px">
        <el-form-item label="商品分类:" prop="productCategoryId">
          <el-cascader :options="productCateOptions" v-model="selectProductCateValue" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="商品品牌:" prop="productBrandId">
          <el-select
            v-model="form.productBrandId"
            placeholder="请选择品牌">
            <el-option
              v-for="item in brandOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称:" prop="title" style="width: 500px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品副标题:" prop="subTitle" style="width: 500px">
          <el-input v-model="form.subTitle"></el-input>
        </el-form-item>

        <el-form-item label="商品价格:" prop="price" style="width: 500px">
          <el-input type="number" v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品库存:" prop="stock" style="width: 500px">
          <el-input type="number" v-model.number="form.stock" :min="0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片:" v-model="form.file" prop="file">
          <comp-image-upload ref="uploadImage" :limit="5"></comp-image-upload>
          <!--<comp-upload ref="uploadImage" :limit="5"></comp-upload>-->
        </el-form-item>
        <el-form-item label="商品介绍:" prop="description" style="width: 100%">
          <CompEditor ref="detail_editor" v-model="description" ></CompEditor>
        </el-form-item>
        <el-form-item style="text-align: center">
          <!--<el-button type="primary" size="medium" @click="nextStep">下一步，填写商品属性</el-button>-->
          <el-button type="primary" size="medium" @click="addSpuProduct">提交商品信息</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="active === 1" class="product-apu-info" ref="form1" :rules="rules1" :model="form1"
               label-width="120px"
               style="width: 600px">
        <el-form-item label="商品价格:" prop="price">
          <el-input type="number" v-model.number="form1.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品库存:" prop="stock">
          <el-input type="number" v-model.number="form1.stock" :min="0" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品参数:" prop="productProperty">
          <vue-json-editor
            v-model="productProperty"
            :mode="'code'"
            lang="zh"
            @json-change="onJsonChange">
          </vue-json-editor>

        </el-form-item>
        <el-form-item label="商品图片:" v-model="form1.file" prop="file">
          <comp-image-upload ref="uploadImage1" :limit="1"></comp-image-upload>
          <!--<comp-upload ref="uploadImage1" :limit="1"></comp-upload>-->
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button size="medium" @click="previousStep">上一步，填写商品信息</el-button>
          <el-button type="primary" size="medium" @click="addSpuProduct">提交商品信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {ProductSpuApi} from './spuApi';
  import {ProductSkuApi} from './skuApi';
  import CompImageUpload from '../../components/upload-image';
  import CompUpload from '../../components/uplocal-file'
  import {CategoryApi} from '../category/api';
  import {BrandApi} from '../brand/api';
  import vueJsonEditor from 'vue-json-editor';
  import CompEditor from '../../components/editor';


  export default {
    name: "product-add-spu",
    components: {
      CompImageUpload,
      CompUpload,
      vueJsonEditor,
      CompEditor
    },
    data() {
      return {
        uploadImage: {},
        active: 0,
        type: 'add',
        form: {
          // productCategoryId: '',
          // subTitle: '',
          // title: '',
          // productBrandId: '',
          // description: '',
          // stock: '',
          // mainImage: ''
        },
        description: '',
        form1: {},
        productProperty: {
          参数1: '配置1',
          参数2: '配置2'
        },
        selectProductCateValue: [],
        productCateOptions: [],
        brandOptions: [],

        rules: {
          title: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
          productBrandId: [{required: false, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          stock: [
            {required: true, message: '请输入库存', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入商品价格', trigger: 'blur'},
            {type: 'number', message: '价格必须为数字值', trigger: 'blur'}
          ],
        },
        rules1: {
          price: [
            {required: true, message: '请输入商品价格', trigger: 'blur'},
            {type: 'number', message: '价格必须为数字值', trigger: 'blur'}
          ],
          productProperty: [{required: true, message: '请输入商品参数', trigger: 'blur'}],
          stock: [
            {required: true, message: '库存必须为数字值', trigger: 'blur'},
            {type: 'number', message: '库存必须为数字值', trigger: 'blur'}
          ]
        },

      }
    },

    created() {
      this.getCategoryListWithChildren()
      this.getBrandList()
      this.form.id  = this.$route.query.productId;
      this.type = this.$route.query.type;
      if (this.$route.query.productId !== null && this.$route.query.productId !== undefined) {
        this.getProduct();
      }

    },

    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.form.productCategoryId = newValue[1];
        } else {
          this.form.productCategoryId = null;
        }
      }
    },

    methods: {
      getProduct() {
        if (this.form.id !== null && this.form.id !== undefined) {
          const params = {
            id: this.form.id,
          }
          ProductSpuApi.getProductSpu(params).then(res => {
            this.form = res.data;

          }).catch((err) => {
            this.$message.error(err.message)
          })
        }
      },

      onJsonChange(value) {
        this.form1.productProperty = value;
      },

      getCategoryListWithChildren() {
        CategoryApi.getCategoryListWithChildren().then((res) => {
          let list = res.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
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
          let brandList = res.data;
          for (let i = 0; i < brandList.length; i++) {
            this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
          }
        }).catch((err) => {
          this.$message.error(err.message)
        })
      },

      addSpuProduct() {
        this.$refs['uploadImage'].submitUpload2().then(fileList => {
          const params = {
            ...this.form,
            description: this.$refs['detail_editor'].getEditorContent(),
          };
          ProductSpuApi.addProductSpu(params, fileList).then((res) => {
            this.$message.success(res.data.message)
            this.$router.push({path: '/admin/product'}).catch(err => {err})
            // this.form1.productSpuId = res.data.data.id

            // this.$refs['uploadImage1'].submitUpload2().then(fileList => {
            //
            //   const params = {
            //     ...this.form1,
            //     productProperty: JSON.stringify(this.productProperty)
            //   }
            //   ProductSkuApi.addProductSku(params, fileList).then((res) => {
            //     // this.$message.success(res.data.message)
            //     this.$router.push({path: '/admin/product'}).catch(err => {
            //       err
            //     })
            //   }).catch((err) => {
            //     this.$message.error(err.data.message)
            //   })
            // })

          }).catch((err) => {
            this.$message.error(err.message)
          })

        })
      },

      addSkuProduct() {
        this.$refs['uploadImage1'].submitUpload2().then(fileList => {
          this.$refs['form1'].validate(valid => {
            if (valid) {
              const params = {
                ...this.form1,
                productProperty: JSON.stringify(this.productProperty)
              }
              ProductSkuApi.addProductSku(params, fileList).then((res) => {
                this.$message.success(res.message)
              }).catch((err) => {
                this.$message.error(err.message)
              })
            } else {
              return false;
            }
          })
        })
      },

      previousStep() {
        if (this.active-- < 0) this.active = 0;
      },
      nextStep() {
        this.uploadImage = this.$refs['uploadImage']
        if (this.active++ > 1) this.active = 0;
      }

    }
  }
</script>

<style scoped>
  .product-apu-info {
    margin-top: 20px;
  }
</style>
