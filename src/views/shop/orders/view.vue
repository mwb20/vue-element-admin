<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>StoreId：</label>{{ viewData.storeId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>OrderNumber：</label>{{ viewData.orderNumber }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CustomerUserId：</label>{{ viewData.customerUserId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>OrderStatus：</label>{{ viewData.orderStatus }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Currency：</label>{{ viewData.currency }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ProductTotalPrice：</label>{{ viewData.productTotalPrice }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TotalDiscount：</label>{{ viewData.totalDiscount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TotalPrice：</label>{{ viewData.totalPrice }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ActualTotalPrice：</label>{{ viewData.actualTotalPrice }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundAmount：</label>{{ viewData.refundAmount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CustomerRemark：</label>{{ viewData.customerRemark }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>StaffRemark：</label>{{ viewData.staffRemark }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>PaymentId：</label>{{ viewData.paymentId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>PaidTime：</label>{{ viewData.paidTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CompletionTime：</label>{{ viewData.completionTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CanceledTime：</label>{{ viewData.canceledTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CancellationReason：</label>{{ viewData.cancellationReason }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ReducedInventoryAfterPlacingTime：</label>{{ viewData.reducedInventoryAfterPlacingTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ReducedInventoryAfterPaymentTime：</label>{{ viewData.reducedInventoryAfterPaymentTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ExtraProperties：</label>{{ viewData.extraProperties }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ConcurrencyStamp：</label>{{ viewData.concurrencyStamp }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CreatorId：</label>{{ viewData.creatorId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>LastModifierId：</label>{{ viewData.lastModifierId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DeleterId：</label>{{ viewData.deleterId }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { order } from '@/api/module/eshop'
export default {
  name: 'OrderView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      order.getOrder(id).then((response) => {
        loading.close()
        this.viewData = response
        // 显示dialog
        this.dialogVisible = true
      }).catch(() => {
        loading.close()
      })
    },
    show(id) {
      this.loadData(id)
    }
  }
}
</script>
