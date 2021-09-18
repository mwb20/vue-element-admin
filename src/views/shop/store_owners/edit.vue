<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
      <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
        <el-form-item label="用户" prop="ownerUserName" verify>
          <el-input v-model="editForm.ownerUserName" autocomplete="off" @focus="$refs.selectUserRef.show()" />
          <input v-model="editForm.ownerUserId" type="hidden">
        </el-form-item>
        <el-form-item label="店铺" prop="storeName" verify>
          <el-input v-model="editForm.storeName" autocomplete="off" @focus="$refs.selectStoreRef.show()" />
          <input v-model="editForm.storeId" type="hidden">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSave">确 定</el-button>
      </div>
    </el-dialog>
    <select-user ref="selectUserRef" @selection="selectionUserEvent" />
    <select-store ref="selectStoreRef" @selection="selectionStoreEvent" />
  </div>
</template>
<script>
import { storeOwner } from '@/api/module/eshop'
export default {
  name: 'StoresStoreOwnersEdit',
  components: {
    SelectStore: () => import('@/views/shop/stores/select_store.vue'),
    SelectUser: () => import('@/views/system_manage/users/select_user.vue')
  },
  data() {
    return {
      title: '新增',
      dialogVisible: false,
      editForm: {
        storeName: null,
        storeId: null,
        ownerUserName: null,
        ownerUserId: null
      }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      storeOwner.getStoreOwner(id).then((result) => {
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
            storeOwner.updateStoreOwner(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            storeOwner.createStoreOwner(this.editForm)
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
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created() {
      // 显示dialog
      this.dialogVisible = true
    },
    selectionUserEvent(userInfo) {
      this.editForm.ownerUserName = userInfo.userName
      this.editForm.ownerUserId = userInfo.id
    },
    selectionStoreEvent(storeInfo) {
      this.editForm.storeName = storeInfo.name
      this.editForm.storeId = storeInfo.id
    }
  }
}
</script>
