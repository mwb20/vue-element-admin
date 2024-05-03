<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>名称：</label>{{ viewData.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>数据源类型：</label>{{ dataSourceTypeOptions[viewData.dataSourceType] }}</div>
      </el-col>
      <el-col :span="24">
        <div class="details-content"><label>备注：</label>{{ viewData.memo }}</div>
      </el-col>
      <el-col :span="24">
        <div class="details-content"><label>配置内容：</label>{{ viewData.extraProperties }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { dataSourceInfo } from '@/api/module/easyCHS'
export default {
  name: 'AppDataSourceInfoView',
  data() {
    return {
      dialogVisible: false,
      viewData: { },
      dataSourceTypeOptions: [
        'Oracle',
        'MySql',
        'PostgreSQL',
        'Web'
      ]
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      dataSourceInfo.getDataSourceInfo(id).then((response) => {
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
