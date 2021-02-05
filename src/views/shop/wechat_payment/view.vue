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
        <div class="details-content"><label>DeviceInfo：</label>{{ viewData.deviceInfo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ResultCode：</label>{{ viewData.resultCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ErrCode：</label>{{ viewData.errCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ErrCodeDes：</label>{{ viewData.errCodeDes }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Openid：</label>{{ viewData.openid }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>IsSubscribe：</label>{{ viewData.isSubscribe }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TradeType：</label>{{ viewData.tradeType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>BankType：</label>{{ viewData.bankType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TotalFee：</label>{{ viewData.totalFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SettlementTotalFee：</label>{{ viewData.settlementTotalFee }}</div>
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
        <div class="details-content"><label>CouponFee：</label>{{ viewData.couponFee }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponCount：</label>{{ viewData.couponCount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponTypes：</label>{{ viewData.couponTypes }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponIds：</label>{{ viewData.couponIds }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponFees：</label>{{ viewData.couponFees }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TransactionId：</label>{{ viewData.transactionId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>OutTradeNo：</label>{{ viewData.outTradeNo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Attach：</label>{{ viewData.attach }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TimeEnd：</label>{{ viewData.timeEnd }}</div>
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
import { paymentRecord } from '@/api/module/eshop'
export default {
  name: 'PaymentRecordsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      paymentRecord.getPaymentRecord(id).then((response) => {
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
