<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>定点医药机构编号：</label>{{ viewData.fixmedinsCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>定点医药机构名称：</label>{{ viewData.fixmedinsName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>医保目录限价类型：</label>{{ viewData.hilistLmtpricType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>医保目录编码：</label>{{ viewData.hilistCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>医保目录名称：</label>{{ viewData.hilistName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>参保所属医保区划：</label>{{ viewData.insuAdmdvs }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>开始日期：</label>{{ viewData.begndate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>结束日期：</label>{{ viewData.enddate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>医保目录超限处理方式：</label>{{ viewData.overlmtDspoWay }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>医保目录定价上限金额：</label>{{ viewData.hilistPricUplmtAmt }}</div>
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
import { catalogPublicRestLimitInfo } from '@/api/module/easyCHS'
export default {
  name: 'AppCatalogPublicRestLimitInfosView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      catalogPublicRestLimitInfo.getCatalogPublicRestLimitInfo(id).then((response) => {
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
