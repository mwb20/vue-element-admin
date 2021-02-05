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
          <el-col :span="6">
            <label class="title" />
            <el-switch
              v-model="listQuery.showHidden"
              active-text="获取已隐藏类别"
              @change="getList"
            />
          </el-col>
          <el-col :span="6" style="padding-right:15px;text-align:right;">
            <label class="title" />
            <el-popover
              placement="right"
              width="160"
              trigger="click"
            >
              <div>
                <el-checkbox v-for="col in cols" :key="col.key" v-model="col.show" :label="col.label" @change="tableKey++" />
              </div>
              <el-button slot="reference" icon="el-icon-s-operation" circle />
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <el-table
        ref="mainTable"
        :key="tableKey"
        v-loading="listLoading"
        :data="tableData.items"
        tooltip-effect="dark"
        border
        lazy
        row-key="id"
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @sort-change="sortingChange"
      >
        <el-table-column
          v-for="col in cols.filter(c=>c.show)"
          :key="col.key"
          :prop="col.key"
          :label="col.label"
          :sortable="col.sortable"
          :width="col.width"
          :show-overflow-tooltip="col.showTooltip"
        >
          <template slot-scope="scope">
            <span v-html="col.formatter ? col.formatter(scope.row,scope.row[col.key]) : scope.row[col.key]" />
          </template>
        </el-table-column>
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
                <el-dropdown-item :command="{type:'add',row:scope.row}"><i class="el-icon-view" />新增下级</el-dropdown-item>
                <el-dropdown-item :command="{type:'view',row:scope.row}"><i class="el-icon-view" />查看</el-dropdown-item>
                <el-dropdown-item :command="{type:'edit',row:scope.row}"><i class="el-icon-edit" />编辑</el-dropdown-item>
                <el-dropdown-item :command="{type:'del',row:scope.row}"><i class="el-icon-delete" />删除</el-dropdown-item>
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
import { category } from '@/api/module/eshop'

export default {
  name: 'ProductsCategories',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DataView: () => import('./view'),
    DataEdit: () => import('./edit')
  },
  data() {
    return {
      tableKey: 1,
      listLoading: false,
      tableData: { totalCount: 0, items: [] },
      listQuery: {
        filter: undefined,
        showHidden: false,
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      },
      treeMap: new Map(),
      cols: [
        {
          key: 'uniqueName',
          label: '编码',
          sortable: true,
          width: '260',
          showTooltip: true,
          show: true
        },
        {
          key: 'displayName',
          label: '名称',
          sortable: false,
          width: '260',
          showTooltip: true,
          show: true
        },
        {
          key: 'description',
          label: '描述',
          sortable: false,
          showTooltip: true,
          show: true
        },
        {
          key: 'mediaResources',
          label: '媒体资源',
          sortable: false,
          width: '160',
          showTooltip: true,
          show: true
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    load(tree, treeNode, resolve) {
      const pid = tree.id
      this.treeMap.set(pid, { tree, treeNode, resolve })
      category.getCategorys({ parentId: pid }).then(response => {
        for (let i = 0, len = response.items.length; i < len; i++) {
          response.items[i].hasChildren = response.items[i].children.length > 0
        }
        resolve(response.items)
      })
    },
    getList() {
      this.listLoading = true
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      category.getCategorys(this.listQuery).then(response => {
        for (let i = 0, len = response.items.length; i < len; i++) {
          response.items[i].hasChildren = response.items[i].children.length > 0
        }
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
    sortingChange(a) {
      if (a.order) {
        let sort = a.prop
        const lastIndexOf = sort.lastIndexOf('.')
        if (lastIndexOf > -1) {
          sort = sort.substr(lastIndexOf + 1)
        }
        sort += ' ' + a.order.replace('ending', '')
        this.listQuery.sorting = sort
      } else {
        this.listQuery.sorting = undefined
      }
      this.getList()
    },
    handleCommand(command) {
      switch (command.type) {
        case 'add':
          this.$refs.edit.created(command.row.id, command.row.displayName + '(' + command.row.uniqueName + ')')
          break
        case 'view':
          this.$refs.view.show(command.row.id, command.row.uniqueName)
          break
        case 'edit':
          this.$refs.edit.edit(command.row.id, command.row.uniqueName)
          break
        case 'del':
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            category.deleteCategory(command.row.id).then((result) => {
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
