<template>
  <div class="tools-table">
    <div class="app-container">
      <div class="filter-container" @keydown.enter="listQuery.page=1,getList()">
        <el-row :gutter="10">
          <el-col :span="12">
            <label class="title">搜索</label>
            <el-input v-model="listQuery.filter" placeholder="请输入搜索内容" class="input-with-select" size="small">
              <el-button slot="append" icon="el-icon-search" @click="listQuery.page=1,getList()" />
            </el-input>
          </el-col>
          <el-col :span="12" style="padding-right:15px;text-align:right;">
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
          <el-col :span="12">
            <div class="tools-container tools-inline right-align">
              <el-button type="primary" size="small" @click="$refs.edit.created()"><i class="el-icon-plus" />新增</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="tableData.items"
        tooltip-effect="dark"
        border
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
            <span v-html="col.formatter ? col.formatter(scope.row,col.key,scope.row[col.key]) : scope.row[col.key]" />
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
                <el-dropdown-item :command="{type:'view',row:scope.row}"><i class="el-icon-view" />查看</el-dropdown-item>
                <el-dropdown-item :command="{type:'edit',row:scope.row}"><i class="el-icon-edit" />编辑</el-dropdown-item>
                <el-dropdown-item :command="{type:'down',row:scope.row}"><i class="el-icon-edit" />下载</el-dropdown-item>
                <el-dropdown-item :command="{type:'del',row:scope.row}"><i class="el-icon-delete" />删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      <data-view ref="view" />
      <data-edit ref="edit" @save-success="getList" />
    </div>
  </div>
</template>
<script>
import { uploadDownloads } from '@/api/module/uploadDownload'
import { parseTime } from '@/utils'

export default {
  name: 'UploadDownload',
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
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      },
      cols: [
        {
          key: 'fileName',
          label: '文件名',
          showTooltip: true,
          show: true
        },
        {
          key: 'containerName',
          label: '容器名',
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'blobName',
          label: '对象名',
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'mimeType',
          label: '类型',
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'hash',
          label: 'Hash',
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'isActive',
          label: '是否启用',
          sortable: true,
          width: '120',
          formatter: this.formateYesOrNo,
          showTooltip: true,
          show: true
        },
        {
          key: 'creationTime',
          label: '上传时间',
          sortable: true,
          width: '160',
          formatter: this.formatDate,
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
    getList() {
      this.listLoading = true
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      uploadDownloads.getUploadDownloads(this.listQuery).then(response => {
        this.tableData = response
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    sortingChange(a) {
      if (a.order) {
        let sort = a.prop
        const lastIndexOf = sort.lastIndexOf('.')
        if (lastIndexOf > -1) {
          sort = sort.substr(lastIndexOf + 1) + ' ' + a.order.replace('ending', '')
        }
        this.listQuery.sorting = sort
      } else {
        this.listQuery.sorting = undefined
      }
      this.getList()
    },
    handleCommand(command) {
      switch (command.type) {
        case 'view':
          this.$refs.view.show(command.row.id)
          break
        case 'edit':
          this.$refs.edit.edit(command.row.id, command.row.fileName)
          break
        case 'down':
          uploadDownloads.download(command.row.id)
          break
        case 'del':
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            uploadDownloads.deleteUploadDownload(command.row.id).then((result) => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(() => {})
          }).catch(() => {})
          break
      }
    },
    formatDate(row, column, cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d} {h}:{i}:{s}')
      }
      return null
    },
    formateYesOrNo(row, column, cellValue) {
      if (cellValue) {
        return '<span class="el-tag el-tag--success el-tag--medium el-tag--dark">是</span>'
      }
      return '<span class="el-tag el-tag--warning el-tag--medium el-tag--dark">否</span>'
    }
  }
}
</script>
