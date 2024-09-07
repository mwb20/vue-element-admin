<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>PatientId：</label>{{ viewData.patientId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>No：</label>{{ viewData.no }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DepartmentId：</label>{{ viewData.departmentId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>DoctorId：</label>{{ viewData.doctorId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>VisitTime：</label>{{ viewData.visitTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>EmgSign：</label>{{ viewData.emgSign }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>SerNum：</label>{{ viewData.serNum }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Source：</label>{{ viewData.source }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Price：</label>{{ viewData.price }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>ResourceType：</label>{{ viewData.resourceType }}</div>
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
import { registrationRecords } from '@/api/module/queueCall'
export default {
  name: 'AppRegistrationRecordsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      registrationRecords.getRegistrationRecord(id).then((response) => {
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
