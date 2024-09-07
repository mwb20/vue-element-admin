<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="PatientId" prop="patientId" verify>
        <el-input v-model="editForm.patientId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="No" prop="no" verify>
        <el-input v-model="editForm.no" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DepartmentId" prop="departmentId" verify>
        <el-input v-model="editForm.departmentId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DoctorId" prop="doctorId" verify>
        <el-input v-model="editForm.doctorId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="VisitTime" prop="visitTime" verify>
        <el-date-picker
          v-model="editForm.visitTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="EmgSign" prop="emgSign" verify>
        <el-switch v-model="editForm.emgSign" class="drawer-switch" />
      </el-form-item>
      <el-form-item label="SerNum" prop="serNum" verify>
        <el-input v-model="editForm.serNum" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Source" prop="source" verify>
        <el-input v-model="editForm.source" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Price" prop="price" verify>
        <el-input v-model="editForm.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ResourceType" prop="resourceType" verify>
        <el-input v-model="editForm.resourceType" autocomplete="off" />
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
import { registrationRecords } from '@/api/module/queueCall'
export default {
  name: 'AppRegistrationRecordsEdit',
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
      registrationRecords.getRegistrationRecord(id).then((result) => {
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
            registrationRecords.updateRegistrationRecord(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            registrationRecords.createRegistrationRecord(this.editForm)
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
