<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item v-if="isEdit" label="容器名" prop="containerName" verify>
        <el-input v-model="editForm.containerName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="文件名" prop="fileName" verify>
        <el-input v-model="editForm.fileName" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="isEdit" label="类型" prop="mimeType" verify>
        <el-input v-model="editForm.mimeType" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="isEdit" label="对象名" prop="blobName" verify>
        <el-input v-model="editForm.blobName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用" prop="isActive" verify>
        <el-switch v-model="editForm.isActive" class="drawer-switch" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { uploadDownloads } from '@/api/module/uploadDownload'
export default {
  name: 'UploadDownloadEdit',
  data() {
    return {
      isEdit: false,
      title: '新增',
      dialogVisible: false,
      editForm: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      uploadDownloads.getUploadDownload(id).then((result) => {
        loading.close()
        // 显示dialog
        this.dialogVisible = true
        this.editForm = result
      }).catch(() => {
        loading.close()
        // 出现异常时调用关闭处理方法重置参数，否则导致无法触发监听
        this.closeHandle()
      })
    },
    editSave() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          // id有值执行更新方法
          if (this.editForm.id !== undefined) {
            uploadDownloads.updateUploadDownload(this.editForm.id, this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            uploadDownloads.createUploadDownload(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          }
        }
      })
    },
    closeHandle() {
      this.editForm = { }
      // 这里必须先判断$refs中是否存在表单，否则在打开dialog获取数据出错调用时会出现异常
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
    },
    edit(id, title) {
      this.isEdit = true
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created() {
      this.isEdit = false
      // 显示dialog
      this.dialogVisible = true
    }
  }
}
</script>
