<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="StoreId" prop="storeId" verify>
        <el-input v-model="editForm.storeId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="OrderId" prop="orderId" verify>
        <el-input v-model="editForm.orderId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TransactionType" prop="transactionType" verify>
        <el-input v-model="editForm.transactionType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ActionName" prop="actionName" verify>
        <el-input v-model="editForm.actionName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Currency" prop="currency" verify>
        <el-input v-model="editForm.currency" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Amount" prop="amount" verify>
        <el-input v-model="editForm.amount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ExtraProperties" prop="extraProperties" verify>
        <el-input v-model="editForm.extraProperties" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ConcurrencyStamp" prop="concurrencyStamp" verify>
        <el-input v-model="editForm.concurrencyStamp" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CreatorId" prop="creatorId" verify>
        <el-input v-model="editForm.creatorId" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { transaction } from '@/api/module/eshop'
export default {
  name: 'StoresTransactionsEdit',
  data() {
    return {
      title: '新增',
      dialogVisible: false,
      editForm: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      transaction.getTransaction(id).then((result) => {
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
            transaction.updateTransaction(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            transaction.createTransaction(this.editForm)
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
    }
  }
}
</script>
