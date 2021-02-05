<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>CouponTemplateId：</label>{{ viewData.couponTemplateId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UserId：</label>{{ viewData.userId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>OrderId：</label>{{ viewData.orderId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ExpirationTime：</label>{{ viewData.expirationTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UsedTime：</label>{{ viewData.usedTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DiscountedAmount：</label>{{ viewData.discountedAmount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Currency：</label>{{ viewData.currency }}</div>
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
import { coupon } from '@/api/module/eshop'
export default {
  name: 'CouponsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      coupon.getCoupon(id).then((response) => {
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
