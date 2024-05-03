<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>结算ID：</label>{{ viewData.setlId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>结算时间：</label>{{ viewData.setlTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>清单流水号：</label>{{ viewData.setlListId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>错误消息：</label>{{ viewData.errMsg }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>状态：</label>{{ viewData.state }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>首次上传时间：</label>{{ viewData.creationTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>最后上传时间：</label>{{ viewData.lastModificationTime }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { uploadSettlementList } from '@/api/module/easyCHS'
export default {
  name: 'AppUploadSettlementListsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      uploadSettlementList.getUploadSettlementList(id).then((response) => {
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
