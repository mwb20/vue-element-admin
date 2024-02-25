<template>
  <div class="user-back">
    <div class="user-wrapper">
      <el-tabs tab-position="left">
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="password" /><span class="tab-pane-label">修改密码</span></span>
          <h4>修改密码</h4>
          <el-divider />
          <el-form ref="changePwdForm" :model="changePwdForm">
            <el-form-item label="当前密码" prop="currentPassword" verify>
              <el-input v-model="changePwdForm.currentPassword" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" verify loginpwd="6">
              <el-input v-model="changePwdForm.newPassword" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item
              label="确认新密码"
              prop="confirmNewPassword"
              :verify="verifyPassword"
            >
              <el-input v-model="changePwdForm.confirmNewPassword" type="password" autocomplete="off" />
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="changePwdSave">保 存</el-button>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="user" /><span class="tab-pane-label">个人设置</span></span>
          <h4>个人设置</h4>
          <el-divider />
          <el-form ref="profileForm" :model="profileForm">
            <el-form-item label="用户名称" prop="userName" verify>
              <el-input v-model="profileForm.userName" type="text" autocomplete="off" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名" prop="name">
                  <el-input v-model="profileForm.name" type="text" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓" prop="surname">
                  <el-input v-model="profileForm.surname" type="text" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="邮箱地址" prop="email" verify email>
              <el-input v-model="profileForm.email" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber" verify phone can-be-empty>
              <el-input v-model="profileForm.phoneNumber" type="text" autocomplete="off" />
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="profileSave">保 存</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { profile } from '@/api/abpFramework'
export default {
  name: 'ProfileIndex',
  data() {
    return {
      changePwdForm: {},
      profileForm: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    verifyPassword(rule, val, callback) {
      if (val !== this.changePwdForm.newPassword) callback(Error('两次输入密码不一致!'))
      else callback()
    },
    loadData() {
      const loading = this.$loading()
      profile.getMyProfile().then((res) => {
        loading.close()
        this.profileForm = res
      }).catch(() => {
        loading.close()
      })
    },
    changePwdSave() {
      this.$refs.changePwdForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          profile.changePassword(this.changePwdForm).then((res) => {
            loading.close()
            this.$message.success('保存成功')
          }).catch(() => {
            loading.close()
          })
        }
      })
    },
    profileSave() {
      this.$refs.profileForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          profile.updateMyProfile(this.profileForm).then((res) => {
            loading.close()
            this.$message.success('保存成功')
          }).catch(() => {
            loading.close()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-back{
    background-color: #f5f5f7;
    padding: 20px 30px;
    min-height: calc(100vh - 84px);
}
.user-wrapper{
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    h4{
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-weight: 500;
        line-height: 1.2;
        font-size: 1.3125rem;
        color: #686b6e;
    }
    .el-form{
        width: 60%;
        padding-bottom: 20px;
    }
    .tab-pane-label{
      margin: 0 10px;
    }
    .el-tab-pane{
      margin-left: 20px;
    }
}
</style>
