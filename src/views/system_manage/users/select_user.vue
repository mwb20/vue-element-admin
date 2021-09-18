<template>
  <el-dialog title="选择用户" :visible.sync="dialogVisible" width="50%" top="5vh" :close-on-click-modal="false">
    <div>
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
              <span v-html="col.formatter ? col.formatter(scope.row[col.key]) : scope.row[col.key]" />
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="confirmSelection(scope.row)"><i class="el-icon-check" />选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { user } from '@/api/abpFramework'

export default {
  name: 'Stores',
  components: {
    Pagination: () => import('@/components/Pagination')
  },
  data() {
    return {
      dialogVisible: false,
      tableKey: 10,
      listLoading: false,
      tableData: { totalCount: 0, items: [] },
      listQuery: {
        filter: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10,
        sorting: undefined
      },
      cols: [
        {
          key: 'userName',
          label: '用户名',
          showTooltip: true,
          show: true
        },
        {
          key: 'name',
          label: '姓名',
          showTooltip: true,
          show: true
        },
        {
          key: 'phoneNumber',
          label: '手机号',
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
      user.getUsers(this.listQuery).then(response => {
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
    confirmSelection(selectionItem) {
      this.$emit('selection', selectionItem)
      this.dialogVisible = false
    },
    show() {
      this.dialogVisible = true
    }
  }
}
</script>
