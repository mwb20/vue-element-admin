<template>
  <div class="app-container">
    <div class="filter-container" @keydown.enter="listQuery.page=1,getList()">
      <el-row :gutter="10">
        <el-col :span="6">
          <label class="title">时间范围</label>
          <el-date-picker
            v-model="listQuery.queryDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            size="small"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="4">
          <label class="title">医生</label>
          <el-input v-model="listQuery.doctorName" placeholder="请输入搜索内容" class="input-with-select" size="small" />
        </el-col>
        <el-col :span="4">
          <label class="title">科室</label>
          <el-input v-model="listQuery.departmentName" placeholder="请输入搜索内容" class="input-with-select" size="small" />
        </el-col>
        <el-col :span="4">
          <label class="title">&nbsp;</label>
          <el-button type="primary" icon="el-icon-search" size="small" @click="listQuery.page=1,getList()">查询</el-button>
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
              <el-dropdown-item :command="{type:'del',row:scope.row}"><i class="el-icon-delete" />删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
    <data-view ref="view" />
  </div>
</template>
<script>
import { doctorScheduling } from '@/api/module/queueCall'
import { parseTime } from '@/utils'

export default {
  name: 'AppDoctorSchedulings',
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
        queryDate: [parseTime(new Date(), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
        filter: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      cols: [
        {
          key: 'doctor.name',
          label: '医生',
          width: '160',
          showTooltip: true,
          show: true
        },
        {
          key: 'department.name',
          label: '科室',
          showTooltip: true,
          show: true
        },
        {
          key: 'startTime',
          label: '开始时间',
          sortable: true,
          width: '160',
          formatter: this.formatDate,
          showTooltip: true,
          show: true
        },
        {
          key: 'endTime',
          label: '结束时间',
          sortable: true,
          width: '160',
          formatter: this.formatDate,
          showTooltip: true,
          show: true
        },
        {
          key: 'timeSlot',
          label: '午别',
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'isExpert',
          label: '专家号',
          width: '120',
          formatter: this.formateYesOrNo,
          showTooltip: true,
          show: true
        },
        {
          key: 'price',
          label: '价格',
          width: '100',
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
      if (this.listQuery.queryDate && this.listQuery.queryDate.length === 2) {
        this.listQuery.startTime = this.listQuery.queryDate[0]
        this.listQuery.endTime = this.listQuery.queryDate[1]
      }
      doctorScheduling.getDoctorSchedulings(this.listQuery).then(response => {
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
        case 'del':
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            doctorScheduling.deleteDoctorScheduling(command.row.id).then((result) => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(() => {})
          }).catch(() => {})
          break
      }
    },
    formatDate(row, column, cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d} {hh}:{mi}:{ss}')
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
