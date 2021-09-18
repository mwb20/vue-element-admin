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
import { paymentRecord } from '@/api/module/eshop'
import { parseTime } from '@/utils'

export default {
  name: 'PaymentRecords',
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
          key: 'paymentId',
          label: '支付Id',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'returnCode',
          label: 'ReturnCode',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'returnMsg',
          label: 'ReturnMsg',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'appId',
          label: 'AppId',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'mchId',
          label: 'MchId',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'deviceInfo',
          label: '设备信息',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'resultCode',
          label: '结果码',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'errCode',
          label: 'ErrCode',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'errCodeDes',
          label: 'ErrCodeDes',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'openid',
          label: 'Openid',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'isSubscribe',
          label: '是否订阅',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'tradeType',
          label: '交易类型',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'bankType',
          label: '银行类型',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'totalFee',
          label: '总费用',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'settlementTotalFee',
          label: '结算总费用',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'feeType',
          label: '费用类型',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'cashFee',
          label: '现金',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'cashFeeType',
          label: '现金类型',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'couponFee',
          label: '总优惠',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'couponCount',
          label: '优惠券数',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'couponTypes',
          label: '优惠券类型',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'couponIds',
          label: '优惠券Id',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'couponFees',
          label: '优惠额',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'transactionId',
          label: '交易Id',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'outTradeNo',
          label: '流水号',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'attach',
          label: '属性',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'timeEnd',
          label: '终止时间',
          sortable: true,
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
      paymentRecord.getPaymentRecords(this.listQuery).then(response => {
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
          this.$refs.view.show(command.row.id, command.row.orderNumber)
          break
        case 'edit':
          this.$refs.edit.edit(command.row.id, command.row.orderNumber)
          break
        case 'del':
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            paymentRecord.deletePaymentRecord(command.row.id).then((result) => {
              if (result.success) {
                this.getList()
                this.$message.success('删除成功')
              } else {
                this.$message.error(result.error.details)
              }
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
    }
  }
}
</script>
