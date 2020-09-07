<template>
  <div class="tools-table">
    <div class="tools-container right-align">
      <el-button type="primary" size="small" @click="$refs.edit.created()"><i class="el-icon-plus" />创建根节点</el-button>
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
        ref="mainTable"
        v-loading="listLoading"
        :data="tableData.items"
        tooltip-effect="dark"
        border
        lazy
        row-key="id"
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="code"
          label="编码"
          show-overflow-tooltip
        />
        <el-table-column
          prop="name"
          label="名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="value"
          label="值"
          show-overflow-tooltip
        />
        <el-table-column
          prop="sort"
          label="顺序"
          show-overflow-tooltip
        />
        <el-table-column
          label="是否启用"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.isActive? 'success':'info'" effect="dark">
              {{ scope.row.isActive?'启用':'禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-dropdown size="medium" type="primary" trigger="click" @command="handleCommand">
              <el-button type="primary" size="small">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type:'view',row:scope.row}">查看</el-dropdown-item>
                <el-dropdown-item :command="{type:'edit',row:scope.row}">编辑</el-dropdown-item>
                <el-dropdown-item :command="{type:'addChildren',row:scope.row}">添加子节点</el-dropdown-item>
                <el-dropdown-item :command="{type:'del',row:scope.row}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      <data-view ref="view" />
      <data-edit ref="edit" @save-success="saveSuccess" />
    </div>
  </div>
</template>

<script>

import { dictionaries } from '@/api/module/dataDictionary'
import Pagination from '@/components/Pagination'

export default {
  name: 'CommonDictionaries',
  components: {
    Pagination,
    dataView: () => import('./view'),
    dataEdit: () => import('./edit')
  },
  data() {
    return {
      previousParentId: undefined,
      listLoading: false,
      tableData: { totalCount: 0, items: [] },
      listQuery: {
        filter: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      },
      treeMap: new Map()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    load(tree, treeNode, resolve) {
      const pid = tree.id
      this.treeMap.set(pid, { tree, treeNode, resolve })
      dictionaries.getChildren(pid).then(response => {
        resolve(response)
      })
    },
    getList() {
      this.listLoading = true
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      dictionaries.getDictionaries(this.listQuery).then(response => {
        this.$set(this.$refs.mainTable.store.states.lazyTreeNodeMap, null, [])
        this.tableData = response
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    saveSuccess(parentId) {
      this.updateNode(parentId)
    },
    updateNode(parentId) {
      // 更新节点，当修改子节点时只更新子节点树，提升性能
      let tMap
      if (parentId) {
        tMap = this.treeMap.get(parentId)
      }
      if (tMap === undefined && this.previousParentId) {
        tMap = this.treeMap.get(this.previousParentId)
      }
      if (tMap) {
        const { tree, treeNode, resolve } = tMap
        this.$set(this.$refs.mainTable.store.states.lazyTreeNodeMap, parentId, [])
        this.load(tree, treeNode, resolve)
      } else {
        this.getList()
      }
    },
    handleCommand(command) {
      switch (command.type) {
        case 'addChildren':
          this.previousParentId = command.row.parentId
          this.$refs.edit.created(command.row.id, command.row.name)
          break
        case 'view':
          this.$refs.view.show(command.row.id)
          break
        case 'edit':
          this.$refs.edit.edit(command.row.id)
          break
        case 'del':
          this.$confirm('此操作将会删除该字典以及所有下级字典, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            dictionaries.deleteDictionaries(command.row.id).then((result) => {
              this.$message.success('删除成功')
              this.updateNode(command.row.parentId)
            }).catch(() => {})
          }).catch(() => {})
          break
      }
    }
  }
}
</script>
