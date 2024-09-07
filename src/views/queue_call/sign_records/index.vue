<template>
  <el-dialog class="table-dialog" :title="title" :visible.sync="dialogVisible" @closed="closeHandle">
    <div class="table-container">
      <el-table
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
            <el-button type="primary" size="small" :command="{type:'sign',row:scope.row}" @command="handleCommand"><i class="el-icon-plus" />重签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { signRecord } from '@/api/module/queueCall'
import { parseTime } from '@/utils'

export default {
  name: 'AppSignRecords',
  components: {
    Pagination: () => import('@/components/Pagination')
  },
  data() {
    return {
      title: '签到记录',
      dialogVisible: false,
      tableData: { totalCount: 0, items: [] },
      listQuery: {
        registrationRecordsId: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      },
      cols: [
        {
          key: 'queueName',
          label: '签到队列',
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'departmentName',
          label: '科室',
          showTooltip: true,
          show: true
        },
        {
          key: 'doctorName',
          label: '医生',
          width: '150',
          showTooltip: true,
          show: true
        },
        {
          key: 'creationTime',
          label: '签到时间',
          width: '120',
          formatter: this.formatDate,
          showTooltip: true,
          show: true
        },
        {
          key: 'creatorName',
          label: '操作员',
          width: '80',
          showTooltip: true,
          show: true
        }
      ]
    }
  },
  methods: {
    getList(registrationRecordsId) {
      const loading = this.$loading()
      if (registrationRecordsId) {
        this.listQuery.registrationRecordsId = registrationRecordsId
      }
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      signRecord.getSignRecords(this.listQuery).then(response => {
        this.tableData = response
        loading.close()
        this.dialogVisible = true
      }).catch(() => {
        loading.close()
        this.closeHandle()
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
        case 'sign':
          signRecord.createSignRecord('').then((res) => {
            // 重签成功
          }).catch(() => {
            // 重签失败
          })
          break
      }
    },
    formatDate(row, column, cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d} {hh}:{mi}:{ss}')
      }
      return null
    },
    closeHandle() {
      this.listQuery = {
        registrationRecordsId: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      }
    }
  }
}
</script>
