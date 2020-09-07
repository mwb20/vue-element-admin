<template>
  <el-dialog title="修改租户" width="500px" :visible.sync="dialogVisible" :close-on-click-modal="false" class="card-dialog" @closed="closeHandle">
    <el-form ref="switchTenantForm" :model="switchTenantForm" label-width="100px">
      <el-form-item label="切换租户">
        <el-switch
          v-model="isSwitchTenant"
        />
      </el-form-item>
      <el-form-item label="租户名" prop="tenantName" verify>
        <el-input v-model="switchTenantForm.tenantName" autocomplete="off" :disabled="!isSwitchTenant" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="getTenantAvailable">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style scoped>
    .el-form{
        padding: 10px 20px 0px 20px;
        border-top: 1px solid #E0E0E0;
        border-bottom: 1px solid #E0E0E0;
    }
</style>

<script>
import { abpTenant } from '@/api/abpFramework'
import store from '@/store'

export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      isSwitchTenant: false,
      switchTenantForm: {}
    }
  },
  watch: {
    show: function(val) {
      if (val) {
        this.dialogVisible = val
        console.log(store.getters.currentTenant)
        if (store.getters.currentTenant.id) {
          this.isSwitchTenant = true
          this.$set(this.switchTenantForm, 'tenantName', store.getters.currentTenant.name)
        }
      }
    }
  },
  methods: {
    getTenantAvailable() {
      if (this.isSwitchTenant) {
        abpTenant.getAbpTenantByName(this.switchTenantForm.tenantName).then((response) => {
          if (response.tenantId) {
            store.dispatch('user/switchTenant', { id: response.tenantId, name: this.switchTenantForm.tenantName })
            this.dialogVisible = false
          } else {
            this.$message.error('租户 ' + this.switchTenantForm.tenantName + ' 不存在')
          }
        })
      } else {
        store.dispatch('user/switchTenant', { name: '未选择', id: null })
        this.dialogVisible = false
      }
    },
    closeHandle() {
      if (this.$refs['switchTenantForm']) {
        this.$refs['switchTenantForm'].resetFields()
      }
      this.$emit('update:show', false)
    }
  }
}
</script>
