<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>分组：</label>{{ viewData.bookGroup }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>联系人：</label>{{ viewData.contactPerson }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>礼物类型：</label>{{ viewData.gift }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>金额：</label>{{ viewData.amount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>送礼方式：</label>{{ viewData.giveWay }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>送礼日期：</label>{{ giveDate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>添加时间：</label>{{ creationTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>备注：</label>{{ viewData.memo }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { acceptGifts } from '@/api/module/giftAccountBook'
import { parseTime } from '@/utils'
export default {
  name: 'AcceptGiftsView',
  data() {
    return {
      dialogVisible: false,
      viewData: {}
    }
  },
  computed: {
    giveDate() {
      if (this.viewData.giveDate) {
        return parseTime(this.viewData.giveDate, '{y}-{m}-{d}')
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
      acceptGifts.getAcceptGiftsById(id).then((response) => {
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
