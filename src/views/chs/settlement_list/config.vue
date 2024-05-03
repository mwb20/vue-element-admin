<template>
  <div class="config-wrap">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-row :gutter="20" class="el-form-item--medium">
        <el-col :span="12">
          <el-form-item label="数据源" prop="dataSource" verify>
            <el-select v-model="editForm.dataSource" style="width: 100%;" value-key="id" filterable placeholder="请选择">
              <el-option
                v-for="item in dataSourceOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" " prop="extraProperties.OnlyCatalogued">
            <el-checkbox v-model="editForm.extraProperties.OnlyCatalogued">自动上传时仅上传已编码数据</el-checkbox>
          </el-form-item>
        </el-col>
        <div v-if="(editForm.dataSource && editForm.dataSource.dataSourceType<4)" style="float: left;">
          <el-col :span="12">
            <el-form-item label="基础参数SQL" prop="extraProperties.BaseSQL" verify>
              <el-input v-model="editForm.extraProperties.BaseSQL" type="textarea" autocomplete="off" placeholder="返回字段必须包含setlTime，返回字段可作为后面SQL的参数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列表SQL" prop="extraProperties.ListSQL" verify>
              <el-input v-model="editForm.extraProperties.ListSQL" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清单信息SQL" prop="extraProperties.SetlinfoSQL" verify>
              <el-input v-model="editForm.extraProperties.SetlinfoSQL" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="慢病诊断SQL" prop="extraProperties.OpspdiseinfoSQL" verify>
              <el-input v-model="editForm.extraProperties.OpspdiseinfoSQL" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="诊断SQL" prop="extraProperties.DiseinfoSQL" verify>
              <el-input v-model="editForm.extraProperties.DiseinfoSQL" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手术SQL" prop="extraProperties.OprninfoSQL" verify>
              <el-input v-model="editForm.extraProperties.OprninfoSQL" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重症监护SQL" prop="extraProperties.IcuinfoSQL" verify>
              <el-input v-model="editForm.extraProperties.IcuinfoSQL" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="输血信息SQL" prop="extraProperties.BldinfoSQL" verify>
              <el-input v-model="editForm.extraProperties.BldinfoSQL" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人类型" prop="extraProperties.OpterType" verify>
              <el-select v-model="editForm.extraProperties.OpterType" style="width: 100%;" value-key="val" filterable placeholder="请选择">
                <el-option
                  v-for="item in opterTypes"
                  :key="item.val"
                  :label="item.name"
                  :value="item.val"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人编码" prop="extraProperties.OpterCode" verify>
              <el-input v-model="editForm.extraProperties.OpterCode" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人姓名" prop="extraProperties.OpterName" verify>
              <el-input v-model="editForm.extraProperties.OpterName" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top: 40px;text-align: center;">
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { moduleConfigures, dataSourceInfo } from '@/api/module/easyCHS'
export default {
  name: 'AppUploadSettlementListConfig',
  data() {
    return {
      title: null,
      dialogVisible: false,
      editForm: { dataSource: {}, extraProperties: {}},
      dataSourceOptions: [],
      opterTypes: [
        { name: '经办人', val: '1' },
        { name: '自助终端', val: '2' },
        { name: '移动终端', val: '3' }
      ]
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      const loading = this.$loading()
      // 先获取数据源再获取配置
      dataSourceInfo.getDataSourceInfoAll().then((dataSourceResult) => {
        this.dataSourceOptions = dataSourceResult
        moduleConfigures.getModuleConfigureByName('UploadSettlementList').then((result) => {
          loading.close()
          // 显示dialog
          this.dialogVisible = true
          this.editForm = result
        }).catch(() => {
          loading.close()
        })
      }).catch(() => {
        loading.close()
      })
    },
    editSave() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          // 设置模块名称，后端接受灵活传入直接在前端写固定
          this.editForm.moduleName = 'UploadSettlementList'
          this.editForm.dataSourceId = this.editForm.dataSource.id
          // id有值执行更新方法
          if (this.editForm.id !== undefined) {
            moduleConfigures.updateModuleConfigure(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            moduleConfigures.createModuleConfigure(this.editForm)
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
    }
  }
}
</script>
