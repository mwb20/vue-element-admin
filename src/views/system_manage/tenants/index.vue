<template>
  <div class="tools-table">
    <div class="tools-container right-align">
      <el-button type="primary" size="small" @click="$refs.edit.created()"><i class="el-icon-plus" />新增</el-button>
    </div>
    <div class="app-container">
      <div class="filter-container" @keydown.enter="listQuery.page=1,getList()">
        <el-row :gutter="10">
          <el-col :span="12">
            <label class="title">搜索</label>
            <el-input v-model="listQuery.filter" placeholder="请输入搜索内容" class="input-with-select" size="small">
              <el-button slot="append" icon="el-icon-search" @click="listQuery.page=1,getList()" />
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.items"
        tooltip-effect="dark"
        border
      >
        <el-table-column
          prop="name"
          label="租户名"
          show-overflow-tooltip
        />
        <el-table-column
          width="120"
          label="操作"
        >
          <template slot-scope="scope">
            <el-dropdown size="medium" type="primary" trigger="click" @command="handleCommand">
              <el-button type="primary" size="small">
                <i class="el-icon-setting" />操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type:'edit',row:scope.row}"><i class="el-icon-edit" />编辑</el-dropdown-item>
                <el-dropdown-item :command="{type:'db_connection',row:scope.row}"><i class="el-icon-set-up" />管理连接字符串</el-dropdown-item>
                <el-dropdown-item :command="{type:'features',row:scope.row}"><i class="el-icon-setting" />管理功能</el-dropdown-item>
                <el-dropdown-item :command="{type:'del',row:scope.row}"><i class="el-icon-delete" />删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      <data-edit ref="edit" @save-success="getList" />
      <db-conn-edit ref="connEdit" />
      <features-edit ref="features" />
    </div>
  </div>
</template>

<script>
import { tenant } from '@/api/abpFramework'
import Pagination from '@/components/Pagination'

export default {
  name: 'Tenants',
  components: {
    Pagination,
    DataEdit: () => import('./edit'),
    DbConnEdit: () => import('./db_connection'),
    FeaturesEdit: () => import('@/components/FeaturesEdit')
  },
  data() {
    return {
      listLoading: false,
      tableData: { totalCount: 0, items: [] },
      listQuery: {
        filter: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10,
        sorting: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      tenant.getTenants(this.listQuery).then(response => {
        this.tableData = response
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleCommand(command) {
      switch (command.type) {
        case 'edit':
          this.$refs.edit.edit(command.row.id, command.row.name)
          break
        case 'db_connection':
          this.$refs.connEdit.edit(command.row.id, command.row.name)
          break
        case 'features':
          this.$refs.features.edit(command.row.id, 'T', command.row.name)
          break
        case 'del':
          this.$confirm('租户 ' + command.row.name + ' 将被删除，你确定吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            tenant.deleteTenant(command.row.id).then((result) => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(() => {})
          }).catch(() => {})
          break
      }
    }
  }
}
</script>
