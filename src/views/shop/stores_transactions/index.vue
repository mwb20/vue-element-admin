<template>
  <div class="app-container">
    <div class="filter-container" @keydown.enter="listQuery.page=1,getList()">
      <el-row :gutter="10">
        <el-col :span="8">
          <label class="title">搜索</label>
          <el-input v-model="storeName" :readonly="true" placeholder="请选择一个店铺进行查看" class="input-with-select" size="small">
            <el-button slot="append" icon="el-icon-set-up" @click="$refs.selectionStore.show()" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <label class="title">&nbsp;</label>
          <el-input v-model="listQuery.filter" placeholder="请输入搜索内容" class="input-with-select" size="small">
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
    <select-store ref="selectionStore" @selection="selectionStoreEvent" />
  </div>
</template>
<script>
import { transaction, shopStore } from '@/api/module/eshop'
import store from '@/store'
import SelectStore from '../store_owners/select_store.vue'

export default {
  name: 'StoresTransactions',
  components: {
    Pagination: () => import('@/components/Pagination'),
    DataView: () => import('./view'),
    DataEdit: () => import('./edit'),
    SelectStore
  },
  data() {
    return {
      tableKey: 1,
      listLoading: false,
      tableData: { totalCount: 0, items: [] },
      storeName: null,
      listQuery: {
        filter: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10,
        storeId: store.getters.eshopStoreId
      },
      cols: [
        {
          key: 'orderId',
          label: '订单Id',
          sortable: true,
          width: '260',
          showTooltip: true,
          show: true
        },
        {
          key: 'transactionType',
          label: '交易类型',
          sortable: true,
          width: '160',
          showTooltip: true,
          formatter: this.formatTransactionType,
          show: true
        },
        {
          key: 'currency',
          label: '货币',
          sortable: true,
          width: '150',
          showTooltip: true,
          show: true
        },
        {
          key: 'amount',
          label: '金额',
          sortable: true,
          width: '160',
          showTooltip: true,
          show: true
        },
        {
          key: 'actionName',
          label: '动作名',
          showTooltip: true,
          show: true
        }
      ]
    }
  },
  mounted() {
    if (this.listQuery.storeId) {
      shopStore.getStore(this.listQuery.storeId).then(res => {
        this.storeName = res.name
      }).catch(() => {
        this.listLoading = false
      })
    }
    this.getList()
  },
  methods: {
    getList() {
      // 能获取到选中店铺id时获取店铺名和商品
      if (this.listQuery.storeId) {
        this.listLoading = true
        this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
        transaction.getEshopTransactions(this.listQuery).then(response => {
          this.tableData = response
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      } else {
        // 获取不到店铺id时弹出选择店铺
        this.$refs.selectionStore.show()
      }
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
            transaction.deleteTransaction(command.row.id).then((result) => {
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
    formatTransactionType(cellValue) {
      if (cellValue) {
        return '<span class="el-tag el-tag--success el-tag--medium el-tag--light">收</span>'
      }
      return '<span class="el-tag el-tag--medium el-tag--light">付</span>'
    },
    selectionStoreEvent(storeInfo) {
      this.$store.dispatch('eshop/setStoreId', storeInfo.storeId)
      this.listQuery.storeId = storeInfo.storeId
      this.storeName = storeInfo.storeName
      this.getList()
    }
  }
}
</script>
