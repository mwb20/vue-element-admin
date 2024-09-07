<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>PatientQueueId：</label>{{ viewData.patientQueueId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>BeforeSortNumber：</label>{{ viewData.beforeSortNumber }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>AfterSortNumber：</label>{{ viewData.afterSortNumber }}</div>
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
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { queueAdjustRecords } from '@/api/module/queueCall'
export default {
  name: 'AppQueueAdjustRecordsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      queueAdjustRecords.getQueueAdjustRecord(id).then((response) => {
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
