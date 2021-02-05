<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="StoreId" prop="storeId" verify>
        <el-input v-model="editForm.storeId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="OrderNumber" prop="orderNumber" verify>
        <el-input v-model="editForm.orderNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CustomerUserId" prop="customerUserId" verify>
        <el-input v-model="editForm.customerUserId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="OrderStatus" prop="orderStatus" verify>
        <el-input v-model="editForm.orderStatus" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Currency" prop="currency" verify>
        <el-input v-model="editForm.currency" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ProductTotalPrice" prop="productTotalPrice" verify>
        <el-input v-model="editForm.productTotalPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TotalDiscount" prop="totalDiscount" verify>
        <el-input v-model="editForm.totalDiscount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TotalPrice" prop="totalPrice" verify>
        <el-input v-model="editForm.totalPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ActualTotalPrice" prop="actualTotalPrice" verify>
        <el-input v-model="editForm.actualTotalPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RefundAmount" prop="refundAmount" verify>
        <el-input v-model="editForm.refundAmount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CustomerRemark" prop="customerRemark" verify>
        <el-input v-model="editForm.customerRemark" autocomplete="off" />
      </el-form-item>
      <el-form-item label="StaffRemark" prop="staffRemark" verify>
        <el-input v-model="editForm.staffRemark" autocomplete="off" />
      </el-form-item>
      <el-form-item label="PaymentId" prop="paymentId" verify>
        <el-input v-model="editForm.paymentId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="PaidTime" prop="paidTime" verify>
        <el-date-picker
          v-model="editForm.paidTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="CompletionTime" prop="completionTime" verify>
        <el-date-picker
          v-model="editForm.completionTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="CanceledTime" prop="canceledTime" verify>
        <el-date-picker
          v-model="editForm.canceledTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="CancellationReason" prop="cancellationReason" verify>
        <el-input v-model="editForm.cancellationReason" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ReducedInventoryAfterPlacingTime" prop="reducedInventoryAfterPlacingTime" verify>
        <el-date-picker
          v-model="editForm.reducedInventoryAfterPlacingTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="ReducedInventoryAfterPaymentTime" prop="reducedInventoryAfterPaymentTime" verify>
        <el-date-picker
          v-model="editForm.reducedInventoryAfterPaymentTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
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
      <el-form-item label="LastModifierId" prop="lastModifierId" verify>
        <el-input v-model="editForm.lastModifierId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DeleterId" prop="deleterId" verify>
        <el-input v-model="editForm.deleterId" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { order } from '@/api/module/eshop'
export default {
  name: 'OrderEdit',
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
      order.getOrder(id).then((result) => {
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
            order.createOrder(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            order.createOrder(this.editForm)
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
