<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>编码：</label>{{ viewData.uniqueName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>名称：</label>{{ viewData.displayName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>描述：</label>{{ viewData.description }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>媒体资源：</label>{{ viewData.mediaResources }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content">
          <label>是否隐藏：</label>
          <el-tag :type="viewData.isHidden? 'warning':'success'" effect="dark">
            {{ viewData.isHidden?'是':'否' }}
          </el-tag>
        </div></el-col>
      <el-col :span="12">
        <div class="details-content"><label>创建时间：</label>{{ formatDate(viewData.creationTime) }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>最后修改时间：</label>{{ formatDate(viewData.lastModificationTime) }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { category } from '@/api/module/eshop'
import { parseTime } from '@/utils'

export default {
  name: 'CategoryView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      category.getCategory(id).then((response) => {
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
    formatDate(cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d} {h}:{i}:{s}')
      }
      return null
    }
  }
}
</script>
