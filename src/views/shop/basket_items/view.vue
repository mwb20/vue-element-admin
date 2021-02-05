<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>BasketName：</label>{{ viewData.basketName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UserId：</label>{{ viewData.userId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>StoreId：</label>{{ viewData.storeId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ProductId：</label>{{ viewData.productId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ProductSkuId：</label>{{ viewData.productSkuId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Quantity：</label>{{ viewData.quantity }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>MediaResources：</label>{{ viewData.mediaResources }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ProductUniqueName：</label>{{ viewData.productUniqueName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ProductDisplayName：</label>{{ viewData.productDisplayName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SkuName：</label>{{ viewData.skuName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SkuDescription：</label>{{ viewData.skuDescription }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Currency：</label>{{ viewData.currency }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UnitPrice：</label>{{ viewData.unitPrice }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TotalPrice：</label>{{ viewData.totalPrice }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>TotalDiscount：</label>{{ viewData.totalDiscount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Inventory：</label>{{ viewData.inventory }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>IsInvalid：</label>{{ viewData.isInvalid }}</div>
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
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { basketItem } from '@/api/module/eshop'
export default {
  name: 'BasketItemsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      basketItem.getBasketItem(id).then((response) => {
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
