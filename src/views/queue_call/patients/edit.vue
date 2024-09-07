<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="PatientId" prop="patientId" verify>
        <el-input v-model="editForm.patientId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="OutpatientNo" prop="outpatientNo" verify>
        <el-input v-model="editForm.outpatientNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Name" prop="name" verify>
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Sex" prop="sex" verify>
        <el-input v-model="editForm.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Age" prop="age" verify>
        <el-input v-model="editForm.age" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Phone" prop="phone" verify>
        <el-input v-model="editForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="HomeAddress" prop="homeAddress" verify>
        <el-input v-model="editForm.homeAddress" autocomplete="off" />
      </el-form-item>
      <el-form-item label="HomePhone" prop="homePhone" verify>
        <el-input v-model="editForm.homePhone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ContactsName" prop="contactsName" verify>
        <el-input v-model="editForm.contactsName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ContactsRelation" prop="contactsRelation" verify>
        <el-input v-model="editForm.contactsRelation" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ContactsAddress" prop="contactsAddress" verify>
        <el-input v-model="editForm.contactsAddress" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ContactsPhone" prop="contactsPhone" verify>
        <el-input v-model="editForm.contactsPhone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Career" prop="career" verify>
        <el-input v-model="editForm.career" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Nation" prop="nation" verify>
        <el-input v-model="editForm.nation" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Country" prop="country" verify>
        <el-input v-model="editForm.country" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { patient } from '@/api/module/queueCall'
export default {
  name: 'AppPatientsEdit',
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
      patient.getPatient(id).then((result) => {
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
            patient.updatePatient(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            patient.createPatient(this.editForm)
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
