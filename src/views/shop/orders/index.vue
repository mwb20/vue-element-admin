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
                <el-dropdown-item :command="{type:'cancel',row:scope.row}"><i class="el-icon-delete" />取消订单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      <data-view ref="view" />
      <data-edit ref="edit" @save-success="getList" />
    </div>
    <el-dialog title="取消订单" :visible.sync="dialogCanceledVisible" :destroy-on-close="true">
      <el-form ref="canceledForm" :model="canceledForm" status-icon style="margin-bottom:25px">
        <el-form-item label="取消原因" prop="cancellationReason" verify>
          <el-input v-model="canceledForm.cancellationReason" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCanceledVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { order } from '@/api/module/eshop'
import { parseTime } from '@/utils'

export default {
  name: 'Order',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DataView: () => import('./view'),
    DataEdit: () => import('./edit')
  },
  data() {
    return {
      tableKey: 1,
      dialogCanceledVisible: false,
      canceledForm: { cancellationReason: null, id: null },
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
          key: 'orderNumber',
          label: '订单号',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'orderStatus',
          label: '状态',
          sortable: true,
          width: '80',
          showTooltip: true,
          formatter: this.formatStatus,
          show: true
        },
        {
          key: 'productTotalPrice',
          label: '总价',
          sortable: true,
          width: '80',
          showTooltip: true,
          show: true
        },
        {
          key: 'totalDiscount',
          label: '优惠金额',
          sortable: true,
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'totalPrice',
          label: '总金额',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'actualTotalPrice',
          label: '实付金额',
          sortable: true,
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'refundAmount',
          label: '退款金额',
          sortable: true,
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'customerRemark',
          label: '客户备注',
          sortable: true,
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'staffRemark',
          label: '备注',
          sortable: true,
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'paidTime',
          label: '支付时间',
          sortable: true,
          width: '120',
          showTooltip: true,
          formatter: this.formatDate,
          show: true
        },
        {
          key: 'completionTime',
          label: '完成时间',
          sortable: true,
          width: '120',
          showTooltip: true,
          formatter: this.formatDate,
          show: true
        },
        {
          key: 'canceledTime',
          label: '取消时间',
          sortable: true,
          width: '120',
          showTooltip: true,
          formatter: this.formatDate,
          show: true
        },
        {
          key: 'cancellationReason',
          label: '取消原因',
          sortable: true,
          width: '120',
          showTooltip: true,
          show: true
        },
        {
          key: 'creationTime',
          label: '创建时间',
          sortable: false,
          width: '120',
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
      order.getOrders(this.listQuery).then(response => {
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
        case 'cancel':
          this.canceledForm.id = command.row.id
          this.dialogCanceledVisible = true
          break
      }
    },
    cancelOrder() {
      this.$refs.canceledForm.validate((valid) => {
        if (valid) {
          order.cancel(this.canceledForm).then((result) => {
            this.$message.success('取消成功')
            this.dialogCanceledVisible = false
            this.getList()
          }).catch((err) => {
            this.$message.error(err)
          })
        }
      })
    },
    formatDate(cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d}')
      }
      return null
    },
    formatStatus(cellValue) {
      if (cellValue === 1) {
        return '<span class="el-tag el-tag--medium el-tag--light">待付款</span>'
      }
      if (cellValue === 2) {
        return '<span class="el-tag el-tag--warning el-tag--medium el-tag--light">待发货</span>'
      }
      if (cellValue === 4) {
        return '<span class="el-tag el-tag--success el-tag--medium el-tag--light">已完成</span>'
      }
      if (cellValue === 8) {
        return '<span class="el-tag el-tag--info el-tag--medium el-tag--light">已取消</span>'
      }
    }
  }
}
</script>
