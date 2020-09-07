<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="120px" class="lable-same-line">
      <el-form-item label="租户名称" prop="name" verify>
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="isCreated" label="管理员邮箱地址" prop="adminEmailAddress" verify email>
        <el-input v-model="editForm.adminEmailAddress" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="isCreated" label="管理员密码" prop="adminPassword" verify loginpwd="6">
        <el-input ref="password" v-model="editForm.adminPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item
        v-if="isCreated"
        label="核对密码"
        prop="passwordRepeat"
        :verify="verifyPassword"
        :watch="editForm.adminPassword"
      >
        <el-input ref="passwordRepeat" v-model="editForm.passwordRepeat" type="password" autocomplete="off" />
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
      title: '',
      isCreated: false,
      dialogVisible: false,
      editForm: {}
    }
  },
  methods: {
    verifyPassword(rule, val, callback) {
      if (val !== this.editForm.adminPassword) callback(Error('两次输入密码不一致!'))
      else callback()
    },
    loadData(id) {
      const loading = this.$loading()
      tenant.getTenant(id).then((result) => {
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
            tenant.updateTenant(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            tenant.createTenant(this.editForm)
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
      this.isCreated = false
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created() {
      this.isCreated = true
      // 显示dialog
      this.dialogVisible = true
    }
  }
}
</script>
