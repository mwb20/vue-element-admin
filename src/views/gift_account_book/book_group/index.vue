<template>
  <div class="tools-table">
    <div class="tools-container right-align">
      <el-button type="primary" size="small" @click="$refs.edit.created()"><i class="el-icon-plus" />创建</el-button>
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
        </el-row>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.items"
        tooltip-effect="dark"
        border
        @sort-change="sortingChange"
      >
        <el-table-column
          prop="name"
          label="名称"
          sortable
          show-overflow-tooltip
        />
        <el-table-column
          prop="amountOfIncome"
          label="总收金额"
          show-overflow-tooltip
        />
        <el-table-column
          prop="numberOfPeople"
          label="送礼人数"
          show-overflow-tooltip
        />
        <el-table-column
          prop="groupDate"
          label="日期"
          sortable
          :formatter="formatDate"
          show-overflow-tooltip
        />
        <el-table-column
          prop="address"
          label="地址"
          sortable
          :formatter="formatAddress"
          show-overflow-tooltip
        />
        <el-table-column
          prop="memo"
          label="备注"
          sortable
          show-overflow-tooltip
        />
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
                <el-dropdown-item :command="{type:'view',id:scope.row.id}"><i class="el-icon-view" />查看</el-dropdown-item>
                <el-dropdown-item :command="{type:'edit',id:scope.row.id}"><i class="el-icon-edit" />编辑</el-dropdown-item>
                <el-dropdown-item :command="{type:'acceptgifts',id:scope.row.id}"><i class="el-icon-edit" />收礼记账</el-dropdown-item>
                <el-dropdown-item :command="{type:'del',row:scope.row}"><i class="el-icon-delete" />删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="tableData.totalCount>0" :total="tableData.totalCount" :page.sync="listQuery.page" :limit.sync="listQuery.maxResultCount" @pagination="getList" />
      <data-view ref="view" />
      <data-edit ref="edit" @save-success="getList" />
      <agift-edit ref="agiftEdit" @save-success="saveAcceptGifts" />
    </div>
  </div>
</template>

<script>

import { bookGroup } from '@/api/module/giftAccountBook'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
  name: 'BookGroup',
  components: {
    Pagination,
    dataView: () => import('./view'),
    dataEdit: () => import('./edit'),
    agiftEdit: () => import('../accept_gifts/edit')
  },
  data() {
    return {
      listLoading: false,
      tableData: { totalCount: 0, items: [] },
      listQuery: {
        filter: undefined,
        page: 1,
        skipCount: 0,
        maxResultCount: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      bookGroup.getBookGroup(this.listQuery).then(response => {
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
          this.$refs.view.show(command.id)
          break
        case 'edit':
          this.$refs.edit.edit(command.id)
          break
        case 'acceptgifts':
          this.$refs.agiftEdit.created(undefined, command.id)
          break
        case 'del':
          this.$confirm('删除分组会删除分组下的收礼记录，你确定要删除（' + command.row.name + '）吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            bookGroup.deleteBookGroup(command.row.id).then((result) => {
              this.getList()
              this.$message.success('删除成功')
            }).catch(() => {})
          }).catch(() => {})
          break
      }
    },
    formatAddress(row, column, cellValue) {
      return (row.province || '') + (row.city || '') + (row.county || '') + (cellValue || '')
    },
    formatDate(row, column, cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d}')
      }
      return null
    },
    saveAcceptGifts() {
      this.$router.push('/giftAccountBook/acceptGifts')
    }
  }
}
</script>
