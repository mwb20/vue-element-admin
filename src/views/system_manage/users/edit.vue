<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" class="card-dialog" @closed="closeHandle">
    <el-tabs v-model="tabsValue" type="border-card">
      <el-tab-pane label="用户信息" name="userInfo">
        <el-form ref="editForm" :model="editForm" status-icon>
          <el-form-item label="用户名" prop="userName" verify>
            <el-input v-model="editForm.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="姓" prop="surname">
            <el-input v-model="editForm.surname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password" verify loginpwd="6" :can-be-empty="isCreated?undefined:null">
            <el-input ref="password" v-model="editForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item
            v-if="isCreated || editForm.password&&editForm.password.length>0"
            label="核对密码"
            prop="passwordRepeat"
            :verify="verifyPassword"
            :watch="editForm.password"
          >
            <el-input ref="passwordRepeat" v-model="editForm.passwordRepeat" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱地址" prop="email" verify email>
            <el-input v-model="editForm.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber" verify phone can-be-empty>
            <el-input v-model="editForm.phoneNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="多次登录失败锁定账户">
            <el-switch v-model="editForm.lockoutEnabled" class="drawer-switch" />
          </el-form-item>
          <el-form-item label="二次认证">
            <el-switch v-model="editForm.twoFactorEnabled" class="drawer-switch" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="roles">
        <span slot="label">
          角色
          <el-tag
            slot="label"
            type="success"
            effect="dark"
            size="mini"
          >
            {{ selectRoleCount }}
          </el-tag>
        </span>
        <div v-for="roleItem in roles" :key="roleItem.name" class="role-item">
          <el-checkbox
            v-model="roleItem.isGranted"
          >{{ roleItem.name }}</el-checkbox>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style scoped>
.role-item{
  margin: 10px 0;
}
</style>
<script>
import { user, role } from '@/api/abpFramework'
export default {
  data() {
    return {
      isCreated: false,
      title: '',
      dialogVisible: false,
      tabsValue: 'userInfo',
      editForm: {},
      roles: []
    }
  },
  computed: {
    selectRoleCount() {
      return this.roles.filter(c => c.isGranted).length
    }
  },
  methods: {
    verifyPassword(rule, val, callback) {
      if (val !== this.editForm.password) callback(Error('两次输入密码不一致!'))
      else callback()
    },
    loadData(id) {
      this.loadRoles(id)
      const loading = this.$loading()
      user.getUser(id).then((response) => {
        loading.close()
        // 显示dialog
        this.dialogVisible = true
        if (response === null) {
          return
        }
        this.editForm = response
      }).catch(() => {
        loading.close()
        // 出现异常时调用关闭处理方法重置参数，否则导致无法触发监听
        this.closeHandle()
      })
    },
    loadRoles(id) {
      if (id) {
        user.getRole(id).then((userRoles) => {
          role.getAll().then((response) => {
            this.roles = response.items
            this.roles.forEach(c => {
              if (userRoles.items.find(u => u.name === c.name)) {
                this.$set(c, 'isGranted', true)
              } else {
                this.$set(c, 'isGranted', false)
              }
            })
          })
        })
      } else {
        role.getAll().then((response) => {
          this.roles = response.items
        })
      }
    },
    editSave() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.editForm.roleNames = []
          this.roles.filter(c => c.isGranted).forEach(u => {
            this.editForm.roleNames.push(u.name)
          })
          const loading = this.$loading()
          if (this.editForm.id !== null) {
            user.updateUser(this.editForm).then((result) => {
              loading.close()
              this.$emit('save-success')
              this.$message.success('保存成功')
              this.dialogVisible = false
            }).catch(() => {
              loading.close()
            })
          } else {
            user.createUser(this.editForm).then((result) => {
              loading.close()
              this.$emit('save-success')
              this.$message.success('保存成功')
              this.dialogVisible = false
            }).catch(() => {
              loading.close()
            })
          }
        } else {
          this.tabsValue = 'userInfo'
        }
      })
    },
    closeHandle() {
      this.tabsValue = 'userInfo'
      this.editForm = {}
      if (this.$refs.editForm) {
        this.$refs.editForm.resetFields()
      }
    },
    edit(id, title) {
      this.isCreated = false
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created() {
      this.isCreated = true
      this.title = '创建'
      // 显示dialog
      this.dialogVisible = true
      this.loadRoles(null)
    }
  }
}
</script>
