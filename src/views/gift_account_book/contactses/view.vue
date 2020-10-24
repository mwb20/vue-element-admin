<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>姓名：</label>{{ viewData.name }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>手机号：</label>{{ viewData.mobile }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>地址：</label>{{ address }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>关系：</label>{{ viewData.relevance }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>性别：</label>{{ viewData.gender }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>年龄：</label>{{ viewData.age }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>生日：</label>{{ birthday }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>备注：</label>{{ viewData.memo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>我送Ta的：</label>{{ viewData.sendHimMoney }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Ta送我的：</label>{{ viewData.sendMeMoney }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content difference"><label>我欠Ta的：</label>{{ iOweHim }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content difference"><label>Ta欠我的：</label>{{ himOweMe }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { contactses } from '@/api/module/giftAccountBook'
import { parseTime } from '@/utils'
export default {
  name: 'ContactsesView',
  data() {
    return {
      dialogVisible: false,
      viewData: {}
    }
  },
  computed: {
    birthday() {
      if (this.viewData.birthday) {
        return parseTime(this.viewData.birthday, '{y}-{m}-{d}')
      }
      return ''
    },
    address() {
      return this.viewData.province || '' + this.viewData.city || '' + this.viewData.county || '' + this.viewData.address || ''
    },
    iOweHim() {
      // 我欠他的
      const iOweHimVal = this.viewData.sendMeMoney - this.viewData.sendHimMoney
      if (iOweHimVal < 0) {
        return '我不欠他的'
      }
      return iOweHimVal
    },
    himOweMe() {
      // 他欠我的
      const himOweMeVal = this.viewData.sendHimMoney - this.viewData.sendMeMoney
      if (himOweMeVal < 0) {
        return '他不欠我的'
      }
      return himOweMeVal
    }
  },
  methods: {
    show(id) {
      const loading = this.$loading()
      contactses.getView(id).then((response) => {
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
<style scoped>
  .difference{
    color: #e64242;
  }
</style>
