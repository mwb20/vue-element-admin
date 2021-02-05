<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>PaymentId：</label>{{ viewData.paymentId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundPaymentMethod：</label>{{ viewData.refundPaymentMethod }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ExternalTradingCode：</label>{{ viewData.externalTradingCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Currency：</label>{{ viewData.currency }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundAmount：</label>{{ viewData.refundAmount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DisplayReason：</label>{{ viewData.displayReason }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CustomerRemark：</label>{{ viewData.customerRemark }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>StaffRemark：</label>{{ viewData.staffRemark }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CompletedTime：</label>{{ viewData.completedTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CanceledTime：</label>{{ viewData.canceledTime }}</div>
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
import { refund } from '@/api/module/eshop'
export default {
  name: 'RefundsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      refund.getRefund(id).then((response) => {
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
