<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>MedListCodg：</label>{{ viewData.medListCodg }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>InsuAdmdvs：</label>{{ viewData.insuAdmdvs }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ListAttrCode：</label>{{ viewData.listAttrCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Begndate：</label>{{ viewData.begndate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Enddate：</label>{{ viewData.enddate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ExtraProperties：</label>{{ viewData.extraProperties }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CreationTime：</label>{{ viewData.creationTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CreatorId：</label>{{ viewData.creatorId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>LastModificationTime：</label>{{ viewData.lastModificationTime }}</div>
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
import { catalogSpecialAttributesInfo } from '@/api/module/easyCHS'
export default {
  name: 'AppCatalogSpecialAttributesInfosView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      catalogSpecialAttributesInfo.getCatalogSpecialAttributesInfo(id).then((response) => {
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
