<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="120px" class="lable-same-line">
      <el-form-item label="使用共享数据库">
        <el-switch v-model="useSharedDatabase" class="drawer-switch" />
      </el-form-item>
      <el-form-item v-if="!useSharedDatabase" label="默认连接字符串" prop="defaultConnectionString" verify>
        <el-input v-model="editForm.defaultConnectionString" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { tenant } from '@/api/abpFramework'
export default {
  data() {
    return {
      id: null,
      title: null,
      dialogVisible: false,
      useSharedDatabase: true,
      editForm: {}
    }
  },
  methods: {
    loadData() {
      const loading = this.$loading()
      tenant.getDefaultConnectionString(this.id).then((result) => {
        loading.close()
        // 显示dialog
        this.dialogVisible = true
        if (result) {
          this.useSharedDatabase = false
        }
        this.$set(this.editForm, 'defaultConnectionString', result)
      }).catch(() => {
        loading.close()
        // 出现异常时调用关闭处理方法重置参数，否则导致无法触发监听
        this.closeHandle()
      })
    },
    editSave() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          if (this.useSharedDatabase) {
            tenant.deleteDefaultConnectionString(this.id).then(() => {
              loading.close()
              this.$message.success('保存成功')
              this.dialogVisible = false
            }).catch(() => {
              loading.close()
            })
          } else {
            tenant.updateDefaultConnectionString({ id: this.id, defaultConnectionString: this.editForm.defaultConnectionString })
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
      this.useSharedDatabase = true
      this.editForm = { }
      // 这里必须先判断$refs中是否存在表单，否则在打开dialog获取数据出错调用时会出现异常
      if (this.$refs.editForm) {
        this.$refs.editForm.resetFields()
      }
    },
    edit(id, title) {
      this.id = id
      this.title = '连接字符串 - ' + title
      this.loadData()
    }
  }
}
</script>
