<template>
  <div class="tools-table">
    <div class="tools-container right-align">
      <el-button type="primary" size="small" :disabled="listLoading" @click="uploadAll"><i class="el-icon-upload2" />上传所有</el-button>
      <el-button type="primary" size="small" :disabled="listLoading" @click="uploadSelection"><i class="el-icon-check" />上传勾选</el-button>
      <el-button type="warning" size="small" :disabled="listLoading" @click="updateStateAll"><i class="el-icon-upload2" />提交所有</el-button>
      <el-button type="warning" size="small" :disabled="listLoading" @click="updateStateSelection"><i class="el-icon-check" />提交勾选</el-button>
    </div>
    <div class="app-container">
      <div class="filter-container" @keydown.enter="listQuery.page=1,getList()">
        <el-row :gutter="10">
          <el-col :span="7">
            <label class="title">结算时间</label>
            <el-date-picker
              v-model="listQuery.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            />
          </el-col>
          <el-col :span="4">
            <label class="title">状态</label>
            <el-select v-model="listQuery.state" size="small" placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="5">
            <label class="title">结算流水号</label>
            <el-input v-model="listQuery.setlId" placeholder="请输入搜索内容" class="input-with-select" size="small">
              <el-button slot="append" icon="el-icon-search" @click="listQuery.page=1,getList()" />
            </el-input>
          </el-col>
          <el-col :span="8" style="padding-right:15px;text-align:right;">
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
        ref="upSetlListTable"
        v-loading="listLoading"
        :data="tableData.items"
        tooltip-effect="dark"
        :height="tableHeight"
        border
      >
        <el-table-column
          type="selection"
          width="39"
        />
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
      <data-edit ref="edit" @save-success="getList" />
    </div>
  </div>
</template>
<script>
import { uploadSettlementList } from '@/api/module/easyCHS'
import { parseTime } from '@/utils'

export default {
  name: 'AppUploadSettlementList',
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
      tableHeight: window.innerHeight - 235,
      stateOptions: [{ label: '全部', value: null },
        { label: '上传失败', value: -1 },
        { label: '待上传', value: 0 },
        { label: '待提交', value: 1 },
        { label: '已提交', value: 2 }],
      pickerOptions: {
        shortcuts: [{
          text: '测试',
          onClick: (picker) => {
            picker.$emit('pick', ['2017-08-01', '2017-08-01'])
          }
        }, {
          text: '本月',
          onClick: (picker) => {
            picker.$emit('pick', [this.getStartDate(), this.getEndDate()])
          }
        }, {
          text: '最近一周',
          onClick: (picker) => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick: (picker) => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick: (picker) => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      listQuery: {
        date: [this.getStartDate(), this.getEndDate()],
        state: null
      },
      cols: [
        {
          key: 'setlId',
          label: '结算ID',
          width: '160',
          showTooltip: true,
          show: true
        },
        {
          key: 'iptNo',
          label: '住院号',
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'name',
          label: '姓名',
          width: '80',
          showTooltip: true,
          show: true
        },
        {
          key: 'gender',
          label: '性别',
          width: '50',
          showTooltip: true,
          show: true
        },
        {
          key: 'setlTime',
          label: '结算时间',
          sortable: true,
          width: '105',
          formatter: this.formatDate,
          showTooltip: true,
          show: true
        },
        {
          key: 'catalogued',
          label: '是否编目',
          width: '80',
          formatter: this.formatCatalogued,
          showTooltip: true,
          show: true
        },
        {
          key: 'setlListId',
          label: '清单流水号',
          width: '160',
          showTooltip: true,
          show: true
        },
        {
          key: 'state',
          label: '状态',
          sortable: true,
          width: '95',
          formatter: this.formatState,
          showTooltip: true,
          show: true
        },
        {
          key: 'lastModificationTime',
          label: '最后上传时间',
          sortable: true,
          width: '130',
          formatter: this.formatDate,
          showTooltip: true,
          show: true
        },
        {
          key: 'errMsg',
          label: '错误消息',
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
      if (this.listQuery.date) {
        this.listQuery.startDate = this.listQuery.date[0]
        this.listQuery.endDate = this.listQuery.date[1]
      }
      uploadSettlementList.getUploadSettlementLists(this.listQuery).then(response => {
        this.tableData.items = response
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    uploadAll() {
      this.upload(this.tableData.items)
    },
    uploadSelection() {
      this.upload(this.$refs.upSetlListTable.selection)
    },
    updateStateAll() {
      this.updateState(this.tableData.items, 1)
    },
    updateStateSelection() {
      this.updateState(this.$refs.upSetlListTable.selection, 1)
    },
    updateState(list, state) {
      this.listLoading = true

      uploadSettlementList.updateState({ settls: list.map(item => item.setlId), state }).then(response => {
        this.listLoading = false
        this.getList()
        this.$message({
          showClose: true,
          message: response,
          type: 'success',
          duration: 10000
        })
      }).catch(() => {
        this.listLoading = false
      })
    },
    upload(list) {
      this.listLoading = true

      uploadSettlementList.upload({ settls: list.map(item => item.setlId) }).then(response => {
        this.listLoading = false
        this.getList()
        this.$message({
          showClose: true,
          message: response,
          type: 'success',
          duration: 10000
        })
      }).catch(() => {
        this.listLoading = false
      })
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
            uploadSettlementList.deleteUploadSettlementList(command.row.id).then((result) => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(() => {})
          }).catch(() => {})
          break
      }
    },
    formatDate(row, column, cellValue) {
      if (cellValue && cellValue[0] !== '0') {
        return parseTime(cellValue, '{y}-{m}-{d}')
      }
      return null
    },
    formatCatalogued(row, column, cellValue) {
      if (cellValue) {
        return '是'
      }
      return '否'
    },
    formatState(row, column, cellValue) {
      switch (cellValue) {
        case -2:
          return '<i class="el-icon-circle-close icon-purple">提交失败</i>'
        case -1:
          return '<i class="el-icon-circle-close icon-red">上传失败</i>'
        case 0:
          return '<i class="el-icon-remove icon-default">待传</i>'
        case 1:
          return '<i class="el-icon-circle-plus icon-yellow" />待提交'
        case 2:
          return '<i class="el-icon-success icon-green" />已提交'
      }
      return '未知'
    },
    getStartDate() {
      const nowDate = new Date()
      return nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1).toString().padStart(2, '0') + '-01'
    },
    getEndDate() {
      const nowDate = new Date()
      return nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1).toString().padStart(2, '0') + '-' + nowDate.getDate().toString().padStart(2, '0')
    }
  }
}
</script>
