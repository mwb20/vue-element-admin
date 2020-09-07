<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <div class="grant-all-permisions">
      <el-checkbox :value="checkAll" :indeterminate="isCheckAllIndeterminate" @change="handleCheckAllChange">授予所有权限</el-checkbox>
    </div>
    <el-tabs v-model="currentGroup" tab-position="left">
      <el-tab-pane v-for="group in editForm" :key="group.name" :name="group.name" :label="group.displayName">
        <div class="grant-all-permisions">
          <el-checkbox
            :value="group.permissions.every(c=>c.isGranted)"
            :indeterminate="!group.permissions.every(c=>c.isGranted)&&!group.permissions.every(c=>!c.isGranted)"
            @change="handleCheckGroupAllChange(group)"
          >全选</el-checkbox>
        </div>
        <div v-for="permission in group.permissions.filter(c=>c.parentName===null)" :key="permission.name" class="permission-item">
          <el-checkbox
            v-model="permission.isGranted"
            :disabled="permission.isGranted
              &&permission.grantedProviders.filter(c=>c.providerName!==providerName).length>0"
            @change="permissionCheckChange(group.name,permission)"
          >{{ permission.displayName }}
            <span v-if="providerName==='U'">
              <el-tag
                v-for="rolePer in permission.grantedProviders.filter(c=>c.providerName==='R')"
                :key="rolePer.providerKey"
                size="mini"
                type="info"
              >{{ '角色:'+rolePer.providerKey }}</el-tag>
            </span>
          </el-checkbox>
          <div
            v-for="childPermission in group.permissions.filter(c=>c.parentName===permission.name)"
            :key="childPermission.name"
            class="permission-item"
            style="margin-left:20px"
          >
            <el-checkbox
              v-model="childPermission.isGranted"
              :disabled="childPermission.isGranted
                &&childPermission.grantedProviders.filter(c=>c.providerName!==providerName).length>0"
              @change="permissionCheckChange(group.name,childPermission)"
            >{{ childPermission.displayName }}
              <span v-if="providerName==='U'">
                <el-tag
                  v-for="rolePer in permission.grantedProviders.filter(c=>c.providerName==='R')"
                  :key="rolePer.providerKey"
                  size="mini"
                  type="info"
                >{{ '角色:'+rolePer.providerKey }}</el-tag>
              </span>
            </el-checkbox>
          </div>
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
.grant-all-permisions{
    padding: 10px 0;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 10px;
}
.permission-item{
  margin: 10px 0;
}
</style>
<script>
import { permissions } from '@/api/abpFramework'
export default {
  data() {
    return {
      title: null,
      providerKey: null,
      providerName: null,
      currentGroup: null,
      dialogVisible: false,
      originalPermissions: {},
      editForm: [],
      changePermissions: []
    }
  },
  computed: {
    isCheckAllIndeterminate() {
      return !this.editForm.every(c => c.permissions.every(p => p.isGranted)) &&
       !this.editForm.every(c => c.permissions.every(p => !p.isGranted))
    },
    checkAll() {
      return this.editForm.every(c => c.permissions.every(p => p.isGranted))
    }
  },
  methods: {
    loadData() {
      const loading = this.$loading()
      permissions.getPermissions({ providerName: this.providerName, providerKey: this.providerKey }).then((result) => {
        loading.close()
        // 显示dialog
        this.dialogVisible = true
        this.editForm = result.groups
        this.originalPermissions = JSON.parse(JSON.stringify(result.groups))
        if (this.editForm.length > 0) {
          // 设置默认选择第一个分组
          this.currentGroup = this.editForm[0].name
        }
      }).catch(() => {
        loading.close()
        // 出现异常时调用关闭处理方法重置参数，否则导致无法触发监听，
        // 因为此时出现异常dialog还没有被打开，不能通过设置dialogVisible变量来触发closeHandle方法，只能直接调用使其重置变量
        this.closeHandle()
      })
    },
    editSave() {
      // --------------获取发生改变的选项------------------
      this.changePermissions = []
      for (let i = 0, len = this.originalPermissions.length; i < len; i++) {
        for (let j = 0, jLen = this.originalPermissions[i].permissions.length; j < jLen; j++) {
          const originalPermission = this.originalPermissions[i].permissions[j]
          const changePermissionItem = this.editForm.find(c => c.name === this.originalPermissions[i].name)
            .permissions
            .find(c => c.name === originalPermission.name && c.isGranted !== originalPermission.isGranted)
          if (changePermissionItem != null) {
            this.changePermissions.push({ name: changePermissionItem.name, isGranted: changePermissionItem.isGranted })
          }
        }
      }
      // --------------./获取发生改变的选项------------------
      if (this.changePermissions.length === 0) {
        this.dialogVisible = false
        return
      }
      const loading = this.$loading()
      permissions.updatePermissions({ providerName: this.providerName, providerKey: this.providerKey, permissions: this.changePermissions }).then((result) => {
        loading.close()
        this.$message.success('保存成功')
        this.dialogVisible = false
      }).catch(() => {
        loading.close()
      })
    },
    handleCheckGroupAllChange(group) {
      // 获取当前分组全选状态，所有权限都被选中时要执行反选，否则继续执行选中操作
      const currentGroupCheckAllState = !group.permissions.every(c => c.isGranted)
      let changeCount = 0
      group.permissions.forEach(c => {
        // 赋予状态不等于需要改变的状态，且没有没有被赋予或所属角色也没有被赋予时才修改状态
        // 设置角色权限时grantedProviders数组下的providerName基本上都是R，所以用this.providerName来判断可以达到通用的作用
        if (c.isGranted !== currentGroupCheckAllState &&
        (!c.isGranted || c.grantedProviders.filter(c => c.providerName !== this.providerName).length === 0)) {
          c.isGranted = currentGroupCheckAllState
          changeCount++
        }
      })
      if (changeCount === 0) {
        this.$message.warning('当前分组所有权限都继承自角色权限，若要取消请通过角色设置或联系管理员')
      }
    },
    handleCheckAllChange(val) {
      let changeCount = 0
      for (let i = 0, len = this.editForm.length; i < len; i++) {
        this.editForm[i].permissions
          .forEach((e) => {
            if (e.isGranted !== val &&
             (!e.isGranted || e.grantedProviders.filter(c => c.providerName !== this.providerName).length === 0)) {
              e.isGranted = val
              changeCount++
            }
          })
      }
      if (changeCount === 0) {
        this.$message.warning('当前所有权限都继承自角色权限，若要取消请通过角色设置或联系管理员')
      }
    },
    permissionCheckChange(groupName, permision) {
      // 取消选择的同时把他的子权限取消掉
      if (permision.isGranted === false) {
        this.editForm.find(c => c.name === groupName)
          .permissions
          .filter(c => c.parentName === permision.name)
          .forEach(c => {
            if (c.isGranted) {
              c.isGranted = false
              this.permissionCheckChange(groupName, c)
            }
          })
      } else if (permision.parentName !== null) {
        // 子权限选择时把他父权限选上，否则只选子权限没有意义
        this.editForm.find(c => c.name === groupName)
          .permissions
          .find(c => c.name === permision.parentName).isGranted = true
      }
    },
    closeHandle() {
      this.changePermissions.length = 0
      this.originalPermissions.length = 0
      this.editForm.length = 0
    },
    edit(providerKey, providerName, title) {
      this.providerKey = providerKey
      this.providerName = providerName
      this.title = '权限 - ' + title
      this.loadData()
    }
  }
}
</script>
