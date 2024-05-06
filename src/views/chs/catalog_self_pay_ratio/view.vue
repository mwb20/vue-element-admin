<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>医保目录编码：</label>{{ viewData.hilistCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>医保目录自付比例人员类别：</label>{{ viewData.selfpayPropPsnType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>开始日期：</label>{{ viewData.begndate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>参保所属医保区划：</label>{{ viewData.insuAdmdvs }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>目录自付比例类别：</label>{{ viewData.selfpayPropType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>结束日期：</label>{{ viewData.enddate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>自付比例：</label>{{ viewData.selfpayProp }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>下载时间：</label>{{ viewData.creationTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>最后更新时间：</label>{{ viewData.lastModificationTime }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { catalogSelfPayRatioInfo } from '@/api/module/easyCHS'
export default {
  name: 'AppCatalogSelfPayRatioInfosView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      catalogSelfPayRatioInfo.getCatalogSelfPayRatioInfo(id).then((response) => {
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
