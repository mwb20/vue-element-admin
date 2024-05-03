<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="名称" prop="name" verify>
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="数据类型" prop="dataSourceType" verify>
        <el-select v-model="editForm.dataSourceType" placeholder="请选择">
          <el-option
            v-for="item in dataSourceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- Oracle配置开始 -->
      <el-row v-if="editForm.dataSourceType<4" class="el-form-item--medium">
        <el-col :span="24">
          <el-form-item label="地址(IP)" prop="extraProperties.Address" verify>
            <el-input v-model="editForm.extraProperties.Address" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="端口" prop="extraProperties.Port" verify>
            <el-input v-model="editForm.extraProperties.Port" autocomplete="off" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实例名" prop="extraProperties.ServiceName" verify>
            <el-input v-model="editForm.extraProperties.ServiceName" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="extraProperties.UserName" verify>
            <el-input v-model="editForm.extraProperties.UserName" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="extraProperties.Password" verify>
            <el-input v-model="editForm.extraProperties.Password" autocomplete="off" type="password" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小连接池" prop="extraProperties.MinPoolSize" verify>
            <el-input v-model="editForm.extraProperties.MinPoolSize" autocomplete="off" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大连接池" prop="extraProperties.MaxPoolSize" verify>
            <el-input v-model="editForm.extraProperties.MaxPoolSize" autocomplete="off" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- Oracle配置结束 -->

      <el-form-item label="备注" prop="memo">
        <el-input v-model="editForm.memo" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" style="float: left;" @click="editSave">校 验</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { dataSourceInfo } from '@/api/module/easyCHS'
export default {
  name: 'AppDataSourceInfoEdit',
  data() {
    return {
      title: null,
      dialogVisible: false,
      editForm: { extraProperties: {}},
      dataSourceTypeOptions: [
        { value: 0, label: 'Oracle' },
        { value: 1, label: 'MySql' },
        { value: 3, label: 'PostgreSQL' },
        { value: 4, label: 'Web' }
      ]
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      dataSourceInfo.getDataSourceInfo(id).then((result) => {
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
            dataSourceInfo.updateDataSourceInfo(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            dataSourceInfo.createDataSourceInfo(this.editForm)
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
      this.editForm = { extraProperties: {}}
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
