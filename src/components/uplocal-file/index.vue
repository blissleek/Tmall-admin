<template>
  <el-upload
    class="mh_upload_file"
    action=""
    :on-remove="handleRemove"
    :on-change="change"
    :disabled="isDisabled"
    :file-list="fileList"
    :on-preview="onPreview"
    :auto-upload="false">
    <el-button slot="trigger" size="mini" type="primary" :disabled="isDisabled">
      <i class="el-icon-upload el-icon--right"></i>
      上传
    </el-button>
    <span slot="tip" class="el-upload__tip">{{label || '请上传大小不超过5M的图片或压缩文件'}}</span>
  </el-upload>
</template>

<script>

  import './index.css'

  export default {
    name: 'sc-upload',
    data() {
      return {
        fileList: [],
        isDisabled: false,
        removeFile: []
      }
    },
    props: {
      msg: null,
      label: null
    },
    methods: {
      submitUpload() {
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
