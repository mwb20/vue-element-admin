<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="QueueInfoId" prop="queueInfoId" verify>
        <el-input v-model="editForm.queueInfoId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="RegistrationRecordsId" prop="registrationRecordsId" verify>
        <el-input v-model="editForm.registrationRecordsId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="SortNumber" prop="sortNumber" verify>
        <el-input v-model="editForm.sortNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="State" prop="state" verify>
        <el-input v-model="editForm.state" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CallCount" prop="callCount" verify>
        <el-input v-model="editForm.callCount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="SignTime" prop="signTime" verify>
        <el-date-picker
          v-model="editForm.signTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="Memo" prop="memo" verify>
        <el-input v-model="editForm.memo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="LastModifierId" prop="lastModifierId" verify>
        <el-input v-model="editForm.lastModifierId" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { patientQueue } from '@/api/module/queueCall'
export default {
  name: 'AppPatientQueuesEdit',
  data() {
    return {
      title: null,
      dialogVisible: false,
      editForm: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      patientQueue.getPatientQueue(id).then((result) => {
        loading.close()
        // 显示dialog
        this.dialogVisible = true
        this.editForm = result
      }).catch(() => {
        loading.close()
        // 出现异常时调用关闭处理方法重置参数，否则导致无法触发监听
        this.closeHandle()
      })
    },
    editSave() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          // id有值执行更新方法
          if (this.editForm.id !== undefined) {
            patientQueue.updatePatientQueue(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            patientQueue.createPatientQueue(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          }
        }
      })
    },
    closeHandle() {
      this.editForm = { }
      // 这里必须先判断$refs中是否存在表单，否则在打开dialog获取数据出错调用时会出现异常
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
    },
    edit(id, title) {
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created() {
      this.title = '新增'
      // 显示dialog
      this.dialogVisible = true
    }
  }
}
</script>
