<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>医生：</label>{{ viewData.doctor.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>科室：</label>{{ viewData.department.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>开始时间：</label>{{ viewData.startTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>结束时间：</label>{{ viewData.endTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>午别：</label>{{ viewData.timeSlot }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>专家号：</label>{{ formateYesOrNo(viewData.isExpert) }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>价格：</label>{{ viewData.price }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doctorScheduling } from '@/api/module/queueCall'
export default {
  name: 'AppDoctorSchedulingsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { doctor: {}, department: {}}
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      doctorScheduling.getDoctorScheduling(id).then((response) => {
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
    },
    formateYesOrNo(cellValue) {
      if (cellValue) {
        return '<span class="el-tag el-tag--success el-tag--medium el-tag--dark">是</span>'
      }
      return '<span class="el-tag el-tag--warning el-tag--medium el-tag--dark">否</span>'
    }
  }
}
</script>
