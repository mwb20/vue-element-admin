<template>
  <div class="content-container">
    <div class="login-container">
      <el-form ref="emailActivationForm" :model="emailActivationForm" class="login-form" autocomplete="on" label-position="left">
        <div class="select-tenant">当前租户：<span>{{ tenant.name }}</span>（<a href="javascript:;" @click="showSwitchTenant=true">修改</a>）</div>
        <div class="title-container">
          <h3 class="title">发送激活邮件</h3>
          <p style="color:#fff;">系统在几十秒内向您发送一封邮件,用于激活您的用户账号，请接收并点击邮件内容中的激活链接。如果在2分钟内还没收到这封邮件，请重试。</p>
        </div>
        <el-form-item prop="emailAddress" verify email>
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input
            v-model="emailActivationForm.emailAddress"
            placeholder="邮箱地址"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <router-link to="/login">
              <el-button type="info" to="/login" style="width:100%;margin-bottom:30px;">返 回</el-button>
            </router-link>
          </el-col>
          <el-col :span="12">
            <el-button :loading="emailActivationLoading" type="primary" style="width:100%;margin-bottom:30px;" @click.native="sendEmailActivation">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <switch-tenant :show.sync="showSwitchTenant" />
  </div>
</template>

<script>
import { account } from '@/api/abpFramework'
import SwitchTenant from './components/SwitchTenant'
import { mapGetters } from 'vuex'

export default {
  components: { SwitchTenant },
  data() {
    return {
      showSwitchTenant: false,
      emailActivationForm: {},
      emailActivationLoading: false
    }
  },
  computed: {
    ...mapGetters(['tenant'])
  },
  methods: {
    sendEmailActivation() {
      this.$refs['emailActivationForm'].validate((valid) => {
        if (valid) {
          this.emailActivationLoading = true
          account.sendEmailActivationLink(this.emailActivationForm.emailAddress).then((response) => {
            this.emailActivationLoading = false
            if (response.success) {
              this.$alert('<div style="text-align: center;"><div style="font-size:5em;color:#67c23a;"><i class="el-icon-success"></i></div>已向您的邮箱发送了一封邮箱地址验证邮件，请查收！</div>', '邮件已发送', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                callback: () => {
                  this.$router.push({ path: '/login' })
                }
              })
            }
          }).catch(() => {
            this.emailActivationLoading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-form-item{
  margin-bottom: 22px
}
.el-divider{
  background-color: #909399;
}
.select-tenant{
  text-align: center;
  color:#fff;
  padding-bottom: 20px;
}
.select-tenant a{
  color: #74bcff;
}
</style>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.content-container{
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
}
.login-container {
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 120px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
