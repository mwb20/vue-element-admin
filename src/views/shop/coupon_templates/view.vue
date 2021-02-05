<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>StoreId：</label>{{ viewData.storeId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CouponType：</label>{{ viewData.couponType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UniqueName：</label>{{ viewData.uniqueName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DisplayName：</label>{{ viewData.displayName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Description：</label>{{ viewData.description }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UsableDuration：</label>{{ viewData.usableDuration }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UsableBeginTime：</label>{{ viewData.usableBeginTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UsableEndTime：</label>{{ viewData.usableEndTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ConditionAmount：</label>{{ viewData.conditionAmount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DiscountAmount：</label>{{ viewData.discountAmount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Currency：</label>{{ viewData.currency }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>IsUnscoped：</label>{{ viewData.isUnscoped }}</div>
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
