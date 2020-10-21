<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>编码：</label>{{ viewData.code }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>名称：</label>{{ viewData.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>值：</label>{{ viewData.value }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>顺序：</label>{{ viewData.sort }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>说明：</label>{{ viewData.description }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>是否启用：</label>
          <el-tag :type="viewData.isActive? 'success':'info'" effect="dark">
            {{ viewData.isActive?'启用':'禁用' }}
          </el-tag>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { dictionaries } from '@/api/module/dataDictionary'
export default {
  name: 'DataDictionariesView',
  data() {
    return {
      dialogVisible: false,
      viewData: {}
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      dictionaries.getDictionarie(id).then((response) => {
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
