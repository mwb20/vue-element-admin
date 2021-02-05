<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>PaymentId：</label>{{ viewData.paymentId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ReturnCode：</label>{{ viewData.returnCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ReturnMsg：</label>{{ viewData.returnMsg }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>AppId：</label>{{ viewData.appId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>MchId：</label>{{ viewData.mchId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TransactionId：</label>{{ viewData.transactionId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>OutTradeNo：</label>{{ viewData.outTradeNo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundId：</label>{{ viewData.refundId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>OutRefundNo：</label>{{ viewData.outRefundNo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TotalFee：</label>{{ viewData.totalFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SettlementTotalFee：</label>{{ viewData.settlementTotalFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundFee：</label>{{ viewData.refundFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SettlementRefundFee：</label>{{ viewData.settlementRefundFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>FeeType：</label>{{ viewData.feeType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CashFee：</label>{{ viewData.cashFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CashFeeType：</label>{{ viewData.cashFeeType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CashRefundFee：</label>{{ viewData.cashRefundFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponRefundFee：</label>{{ viewData.couponRefundFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponRefundCount：</label>{{ viewData.couponRefundCount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponTypes：</label>{{ viewData.couponTypes }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponIds：</label>{{ viewData.couponIds }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponRefundFees：</label>{{ viewData.couponRefundFees }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundStatus：</label>{{ viewData.refundStatus }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SuccessTime：</label>{{ viewData.successTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundRecvAccout：</label>{{ viewData.refundRecvAccout }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundAccount：</label>{{ viewData.refundAccount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RefundRequestSource：</label>{{ viewData.refundRequestSource }}</div>
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
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { refundRecord } from '@/api/module/eshop'
export default {
  name: 'RefundRecordsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      refundRecord.getRefundRecord(id).then((response) => {
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
