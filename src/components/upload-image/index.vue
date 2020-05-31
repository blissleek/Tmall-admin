<template>
  <div>
    <el-upload
      action=""
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="change"
      :disabled="isDisabled"
      :file-list="fileList"
      :auto-upload="false">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'sc-image-upload',
    data() {
      return {
        fileList: [],
        isDisabled: false,
        removeFile: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    props: {
      msg: null,
      label: null
    },
    methods: {
      submitUpload2() {
        return new Promise((resolve, reject) => {
          let flag = false
          this.fileList.forEach(file => {
            if (!file.flex) {
              const isJPG = ['image/jpeg', 'image/png', 'application/zip']
                .indexOf(file.raw.type) >= 0 || /\.rar$/.test(file.raw.name)
              const isLt2M = file.size / 1024 / 1024 < 5
              if (!isLt2M || !isJPG) {
                this.$message.error(this.msg || '只能上传图片/文件，且不超过5M!')
                flag = true
              }
            }
          })
          if (!flag) {
            const data = []
            this.fileList.forEach(file => {
              if (!file.flex) data.push(file.raw)
            })
            resolve(data)
          } else {
            reject(flag)
          }
        })
      },
      resetUpload() {
        this.fileList = []
        this.removeFile = []
      },
      handleRemove(file, fileList) {
        if (file.flex) {
          this.removeFile = [...this.removeFile, file.uid]
        }
        this.fileList = fileList
      },
      change(file, fileList) {
        this.fileList = fileList
      },
      setFileList(fileList) {
        this.fileList = fileList
        this.removeFile = []
      },
      setDisabled(isDisabled) {
        this.isDisabled = isDisabled
      },
      onPreview(file) {
        window.open(file.url);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
<style scoped>
  .mh_upload_file button {

    margin-right: 15px;
  }

  .mh_upload_file span {
    font-size: 14px;
    text-indent: 15px;
  }

</style>
