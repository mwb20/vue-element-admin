<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="PaymentId" prop="paymentId" verify>
        <el-input v-model="editForm.paymentId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ReturnCode" prop="returnCode" verify>
        <el-input v-model="editForm.returnCode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ReturnMsg" prop="returnMsg" verify>
        <el-input v-model="editForm.returnMsg" autocomplete="off" />
      </el-form-item>
      <el-form-item label="AppId" prop="appId" verify>
        <el-input v-model="editForm.appId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="MchId" prop="mchId" verify>
        <el-input v-model="editForm.mchId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DeviceInfo" prop="deviceInfo" verify>
        <el-input v-model="editForm.deviceInfo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ResultCode" prop="resultCode" verify>
        <el-input v-model="editForm.resultCode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ErrCode" prop="errCode" verify>
        <el-input v-model="editForm.errCode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ErrCodeDes" prop="errCodeDes" verify>
        <el-input v-model="editForm.errCodeDes" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Openid" prop="openid" verify>
        <el-input v-model="editForm.openid" autocomplete="off" />
      </el-form-item>
      <el-form-item label="IsSubscribe" prop="isSubscribe" verify>
        <el-input v-model="editForm.isSubscribe" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TradeType" prop="tradeType" verify>
        <el-input v-model="editForm.tradeType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="BankType" prop="bankType" verify>
        <el-input v-model="editForm.bankType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TotalFee" prop="totalFee" verify>
        <el-input v-model="editForm.totalFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="SettlementTotalFee" prop="settlementTotalFee" verify>
        <el-input v-model="editForm.settlementTotalFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="FeeType" prop="feeType" verify>
        <el-input v-model="editForm.feeType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CashFee" prop="cashFee" verify>
        <el-input v-model="editForm.cashFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CashFeeType" prop="cashFeeType" verify>
        <el-input v-model="editForm.cashFeeType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponFee" prop="couponFee" verify>
        <el-input v-model="editForm.couponFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponCount" prop="couponCount" verify>
        <el-input v-model="editForm.couponCount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponTypes" prop="couponTypes" verify>
        <el-input v-model="editForm.couponTypes" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponIds" prop="couponIds" verify>
        <el-input v-model="editForm.couponIds" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponFees" prop="couponFees" verify>
        <el-input v-model="editForm.couponFees" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TransactionId" prop="transactionId" verify>
        <el-input v-model="editForm.transactionId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="OutTradeNo" prop="outTradeNo" verify>
        <el-input v-model="editForm.outTradeNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Attach" prop="attach" verify>
        <el-input v-model="editForm.attach" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TimeEnd" prop="timeEnd" verify>
        <el-input v-model="editForm.timeEnd" autocomplete="off" />
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
import { paymentRecord } from '@/api/module/eshop'
export default {
  name: 'PaymentRecordsEdit',
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
      paymentRecord.getPaymentRecord(id).then((result) => {
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
            paymentRecord.updatePaymentRecord(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            paymentRecord.createPaymentRecord(this.editForm)
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
