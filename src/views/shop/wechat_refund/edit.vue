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
      <el-form-item label="TransactionId" prop="transactionId" verify>
        <el-input v-model="editForm.transactionId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="OutTradeNo" prop="outTradeNo" verify>
        <el-input v-model="editForm.outTradeNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RefundId" prop="refundId" verify>
        <el-input v-model="editForm.refundId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="OutRefundNo" prop="outRefundNo" verify>
        <el-input v-model="editForm.outRefundNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="TotalFee" prop="totalFee" verify>
        <el-input v-model="editForm.totalFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="SettlementTotalFee" prop="settlementTotalFee" verify>
        <el-input v-model="editForm.settlementTotalFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RefundFee" prop="refundFee" verify>
        <el-input v-model="editForm.refundFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="SettlementRefundFee" prop="settlementRefundFee" verify>
        <el-input v-model="editForm.settlementRefundFee" autocomplete="off" />
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
      <el-form-item label="CashRefundFee" prop="cashRefundFee" verify>
        <el-input v-model="editForm.cashRefundFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponRefundFee" prop="couponRefundFee" verify>
        <el-input v-model="editForm.couponRefundFee" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponRefundCount" prop="couponRefundCount" verify>
        <el-input v-model="editForm.couponRefundCount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponTypes" prop="couponTypes" verify>
        <el-input v-model="editForm.couponTypes" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponIds" prop="couponIds" verify>
        <el-input v-model="editForm.couponIds" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponRefundFees" prop="couponRefundFees" verify>
        <el-input v-model="editForm.couponRefundFees" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RefundStatus" prop="refundStatus" verify>
        <el-input v-model="editForm.refundStatus" autocomplete="off" />
      </el-form-item>
      <el-form-item label="SuccessTime" prop="successTime" verify>
        <el-input v-model="editForm.successTime" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RefundRecvAccout" prop="refundRecvAccout" verify>
        <el-input v-model="editForm.refundRecvAccout" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RefundAccount" prop="refundAccount" verify>
        <el-input v-model="editForm.refundAccount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RefundRequestSource" prop="refundRequestSource" verify>
        <el-input v-model="editForm.refundRequestSource" autocomplete="off" />
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
import { refundRecord } from '@/api/module/eshop'
export default {
  name: 'RefundRecordsEdit',
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
      refundRecord.getRefundRecord(id).then((result) => {
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
            refundRecord.updateRefundRecord(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            refundRecord.createRefundRecord(this.editForm)
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
