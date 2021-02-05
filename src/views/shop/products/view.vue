<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>StoreId：</label>{{ viewData.storeId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ProductGroupName：</label>{{ viewData.productGroupName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ProductDetailId：</label>{{ viewData.productDetailId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>UniqueName：</label>{{ viewData.uniqueName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DisplayName：</label>{{ viewData.displayName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>InventoryStrategy：</label>{{ viewData.inventoryStrategy }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>MediaResources：</label>{{ viewData.mediaResources }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DisplayOrder：</label>{{ viewData.displayOrder }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>IsPublished：</label>{{ viewData.isPublished }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>IsStatic：</label>{{ viewData.isStatic }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>IsHidden：</label>{{ viewData.isHidden }}</div>
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
import { product } from '@/api/module/eshop'
export default {
  name: 'ProductView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      product.getProduct(id).then((response) => {
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
