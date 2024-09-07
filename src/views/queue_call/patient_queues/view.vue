<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>QueueInfoId：</label>{{ viewData.queueInfoId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>RegistrationRecordsId：</label>{{ viewData.registrationRecordsId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SortNumber：</label>{{ viewData.sortNumber }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>State：</label>{{ viewData.state }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>CallCount：</label>{{ viewData.callCount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SignTime：</label>{{ viewData.signTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Memo：</label>{{ viewData.memo }}</div>
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
import { patientQueue } from '@/api/module/queueCall'
export default {
  name: 'AppPatientQueuesView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      patientQueue.getPatientQueue(id).then((response) => {
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
