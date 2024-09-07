<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-row class="el-form-item--medium">
        <el-col :span="12">
          <el-form-item label="编码" prop="code" verify>
            <el-input v-model="editForm.code" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name" verify>
            <el-input v-model="editForm.name" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工号" prop="userName" verify>
            <el-input v-model="editForm.userName" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="editForm.phone" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职称" prop="title">
            <el-input v-model="editForm.title" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业" prop="major">
            <el-input v-model="editForm.major" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资格证" prop="qualifications">
            <el-input v-model="editForm.qualifications" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="执业证" prop="license">
            <el-input v-model="editForm.license" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="简介" prop="introduce">
            <el-input v-model="editForm.introduce" type="textarea" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doctor } from '@/api/module/queueCall'
export default {
  name: 'AppDoctorsEdit',
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
      doctor.getDoctor(id).then((result) => {
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
            doctor.updateDoctor(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            doctor.createDoctor(this.editForm)
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
