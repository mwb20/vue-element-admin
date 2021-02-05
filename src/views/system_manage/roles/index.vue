<template>
  <div class="tools-table">
    <div class="tools-container right-align">
      <el-button type="primary" size="small" @click="$refs.edit.created()"><i class="el-icon-plus" />新增</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="tableData.items"
        tooltip-effect="dark"
        border
      >
        <el-table-column
          label="名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
            <el-tag v-show="scope.row.isDefault" size="mini" type="success" effect="dark">默认</el-tag>
            <el-tag v-show="scope.row.isPublic" size="mini" effect="dark">公开</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          label="操作"
        >
          <template slot-scope="scope">
            <el-dropdown size="medium" type="primary" trigger="click" @command="handleCommand">
              <el-button type="primary" size="small">
                <i class="el-icon-setting" />操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type:'edit',row:scope.row}"><i class="el-icon-edit" />编辑</el-dropdown-item>
                <el-dropdown-item :command="{type:'permissions',row:scope.row}"><i class="el-icon-unlock" />权限</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.name!='admin'" :command="{type:'del',row:scope.row}"><i class="el-icon-delete" />删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      <data-edit ref="edit" @save-success="getList" />
      <permissions ref="permissions" />
    </div>
  </div>
</template>
<script>
import { role } from '@/api/abpFramework'
import Pagination from '@/components/Pagination'

export default {
  name: 'Roles',
  components: {
    Pagination,
    DataEdit: () => import('./edit'),
    Permissions: () => import('@/components/PermissionsEdit')
  },
  data() {
    return {
      listLoading: false,
      tableData: { totalCount: 0, items: [] },
      listQuery: {
        sorting: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      role.getRoles(this.listQuery).then(response => {
        this.tableData.items = response.items
        this.tableData.totalCount = response.totalCount
        this.listLoading = false
      }).catch(() => {
        this.$message.error('获取角色列表失败！')
        this.listLoading = false
      })
    },
    handleCommand(command) {
      switch (command.type) {
        case 'edit':
          this.$refs.edit.edit(command.row.id, command.row.name)
          break
        case 'del':
          this.$confirm('角色 ' + command.row.name + ' 将被删除，你确定吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            role.deleteRole(command.row.id).then(() => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(() => {})
          }).catch(() => {})
          break
        case 'permissions':
          this.$refs.permissions.edit(command.row.name, 'R', command.row.name)
          break
      }
    }
  }
}
</script>
