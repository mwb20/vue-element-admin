<template>
  <div class="tools-table">
    <div class="tools-container right-align">
      <el-button v-if="checkPermission(['EasyCHSCatalog.CatalogBaseInfo.Download'])" type="primary" size="small" @click="download(0)"><i class="el-icon-s-grid" />全量下载</el-button>
      <el-button v-if="checkPermission(['EasyCHSCatalog.CatalogBaseInfo.Download'])" type="success" size="small" @click="download(1)"><i class="el-icon-menu" />增量下载</el-button>
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
          width="80"
          label="操作"
        >
          <template slot-scope="scope">
            <el-dropdown size="medium" type="primary" trigger="click" @command="handleCommand">
              <el-button type="primary" size="small">
                <i class="el-icon-setting" />操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type:'view',row:scope.row}"><i class="el-icon-view" />查看</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      <data-view ref="view" />
    </div>
  </div>
</template>
<script>
import { catalogBaseInfo } from '@/api/module/easyCHS'
import { parseTime } from '@/utils'
import checkPermission from '@/utils/permission'

export default {
  name: 'AppCatalogBaseInfos',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DataView: () => import('./view')
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
          key: 'hilistCode',
          label: '医保目录编码',
          width: '160',
          showTooltip: true,
          show: true
        },
        {
          key: 'hilistName',
          label: '医保目录名称',
          showTooltip: true,
          show: true
        },
        {
          key: 'spec',
          label: '规格',
          width: '150',
          showTooltip: true,
          show: true
        },
        {
          key: 'updtTime',
          label: '目录更新时间',
          sortable: true,
          width: '160',
          formatter: this.formatDate,
          showTooltip: true,
          show: true
        },
        {
          key: 'medChrgitmType',
          label: '大类编码',
          sortable: true,
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'chrgitmLv',
          label: '统计类型',
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'pinyin',
          label: '拼音助记码',
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'wubi',
          label: '五笔助记码',
          width: '120',
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
    checkPermission,
    getList() {
      this.listLoading = true
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      catalogBaseInfo.getCatalogBaseInfos(this.listQuery).then(response => {
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
          sort = sort.substr(lastIndexOf + 1)
        }
        sort = sort + ' ' + a.order.replace('ending', '')
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
          this.$refs.edit.edit(command.row.id, command.row.displayName)
          break
        case 'del':
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            catalogBaseInfo.deleteCatalogBaseInfo(command.row.id).then((result) => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(() => {})
          }).catch(() => {})
          break
      }
    },
    formatDate(row, column, cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d}')
      }
      return null
    },
    /**
     * 下载
     * @param {int} mode 模式：0-全量下载、1-增量下载
     */
    download(mode) {
      if (mode === 0) {
        this.$confirm('全量下载会更新已存在的目录，但下载速度慢<br />确定要全量下载吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          })
        })
        return
      }
    }
  }
}
</script>
