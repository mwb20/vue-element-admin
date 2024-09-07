<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>编码：</label>{{ viewData.code }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>姓名：</label>{{ viewData.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>工号：</label>{{ viewData.userName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>手机号：</label>{{ viewData.phone }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>职称：</label>{{ viewData.title }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>资格证：</label>{{ viewData.qualifications }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>专业：</label>{{ viewData.major }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>执业证：</label>{{ viewData.license }}</div>
      </el-col>
      <el-col :span="24">
        <div class="details-content"><label>简介：</label>{{ viewData.introduce }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doctor } from '@/api/module/queueCall'
export default {
  name: 'AppDoctorsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      doctor.getDoctor(id).then((response) => {
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
