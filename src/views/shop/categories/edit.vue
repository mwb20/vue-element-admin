<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item v-show="false" label="父id" prop="parentId">
        <el-input v-model="editForm.parentId" />
      </el-form-item>
      <el-form-item v-show="parentName!==undefined" label="父节点">
        <el-input v-model="parentName" autocomplete="off" readonly="readonly" />
      </el-form-item>
      <el-form-item label="编码" prop="uniqueName" verify>
        <el-input v-model="editForm.uniqueName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名称" prop="displayName" verify>
        <el-input v-model="editForm.displayName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="editForm.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="媒体资源" prop="mediaResources">
        <el-input v-model="editForm.mediaResources" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { category } from '@/api/module/eshop'
export default {
  name: 'CategoryEdit',
  data() {
    return {
      title: '新增',
      dialogVisible: false,
      parentName: undefined,
      editForm: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      category.getCategory(id).then((result) => {
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
            category.updateCategory(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success', this.editForm.parentId)
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            category.createCategory(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success', this.editForm.parentId)
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
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created(parentId, parentName) {
      this.title = '新增类别'
      this.editForm.parentId = parentId
      this.parentName = parentName
      this.dialogVisible = true
    }
  }
}
</script>
