<template>
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
</template>
<script>
import { basketItem } from '@/api/module/eshop'

export default {
  name: 'BasketItems',
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
        maxResultCount: 10,
        basketName: 'Default',
        userId: null
      },
      cols: [
        {
          key: 'basketName',
          label: '购物车名',
          sortable: true,
          width: '130',
          showTooltip: true,
          show: true
        },
        {
          key: 'userId',
          label: '用户',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'quantity',
          label: '数量',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'productUniqueName',
          label: '商品编码',
          sortable: true,
          width: '130',
          showTooltip: true,
          show: true
        },
        {
          key: 'productDisplayName',
          label: '商品名',
          sortable: true,
          width: '160',
          showTooltip: true,
          show: true
        },
        {
          key: 'skuName',
          label: 'Sku',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'skuDescription',
          label: 'Sku描述',
          sortable: true,
          width: '130',
          showTooltip: true,
          show: true
        },
        {
          key: 'currency',
          label: '货币',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'unitPrice',
          label: '单价',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'totalPrice',
          label: '总价',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'totalDiscount',
          label: '折扣',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'inventory',
          label: '库存',
          sortable: true,
          width: '100',
          showTooltip: true,
          show: true
        },
        {
          key: 'isInvalid',
          label: '是否失效',
          sortable: true,
          width: '130',
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
      basketItem.getBasketItems(this.listQuery).then(response => {
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
        case 'del':
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            basketItem.deleteBasketItem(command.row.id).then((result) => {
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
    }
  }
}
</script>
