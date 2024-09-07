<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>患者ID：</label>{{ viewData.patientId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>门诊号：</label>{{ viewData.outpatientNo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>姓名：</label>{{ viewData.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>性别：</label>{{ viewData.sex }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>年龄：</label>{{ viewData.age }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>手机号：</label>{{ viewData.phone }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>家庭地址：</label>{{ viewData.homeAddress }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>家庭电话：</label>{{ viewData.homePhone }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>联系人姓名：</label>{{ viewData.contactsName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>联系人关系：</label>{{ viewData.contactsRelation }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>联系人地址：</label>{{ viewData.contactsAddress }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>联系人电话：</label>{{ viewData.contactsPhone }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>职业：</label>{{ viewData.career }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>民族：</label>{{ viewData.nation }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>国籍：</label>{{ viewData.country }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { patient } from '@/api/module/queueCall'
export default {
  name: 'AppPatientsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      patient.getPatient(id).then((response) => {
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
