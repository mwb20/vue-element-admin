<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>名称：</label>{{ viewData.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>日期：</label>{{ groupDate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>省：</label>{{ viewData.province }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>市：</label>{{ viewData.city }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>县：</label>{{ viewData.county }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>详细地址：</label>{{ viewData.address }}</div>
      </el-col>
      <el-col :span="24">
        <div class="details-content"><label>备注：</label>{{ viewData.memo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>总收金额：</label>{{ viewData.amountOfIncome }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>送礼人数：</label>{{ viewData.numberOfPeople }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>创建时间：</label>{{ creationTime }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { bookGroup } from '@/api/module/giftAccountBook'
import { parseTime } from '@/utils'
export default {
  name: 'BookGroupView',
  data() {
    return {
      dialogVisible: false,
      viewData: {}
    }
  },
  computed: {
    groupDate() {
      if (this.viewData.groupDate) {
        return parseTime(this.viewData.groupDate, '{y}-{m}-{d}')
      }
      return ''
    },
    creationTime() {
      if (this.viewData.creationTime) {
        return parseTime(this.viewData.creationTime)
      }
      return ''
    }
  },
  methods: {
    show(id) {
      const loading = this.$loading()
      bookGroup.getView(id).then((response) => {
        loading.close()
        this.viewData = response
        // 显示dialog
        this.dialogVisible = true
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>
