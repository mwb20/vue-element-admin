<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>编码：</label>{{ viewData.code }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>名称：</label>{{ viewData.name }}</div>
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
import { department } from '@/api/module/queueCall'
export default {
  name: 'AppDepartmentsView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      department.getDepartment(id).then((response) => {
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
