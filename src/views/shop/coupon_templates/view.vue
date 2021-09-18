<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>店铺：</label>{{ viewData.storeId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>类型：</label>{{ viewData.couponType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>编码：</label>{{ viewData.uniqueName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>名称：</label>{{ viewData.displayName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>描述：</label>{{ viewData.description }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>持续时间：</label>{{ viewData.usableDuration }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>启用时间：</label>{{ viewData.usableBeginTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>有效期：</label>{{ viewData.usableEndTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>条件金额：</label>{{ viewData.conditionAmount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>优惠额：</label>{{ viewData.discountAmount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>货币：</label>{{ viewData.currency }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>是否通用：</label>{{ viewData.isUnscoped }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { couponTemplate } from '@/api/module/eshop'
export default {
  name: 'CouponTemplatesView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      couponTemplate.getCouponTemplate(id).then((response) => {
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
