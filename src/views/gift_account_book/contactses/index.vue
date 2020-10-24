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
          label="姓名"
          sortable
          show-overflow-tooltip
        />
        <el-table-column
          prop="relevance"
          label="关系"
          sortable
          show-overflow-tooltip
        />
        <el-table-column
          prop="gender"
          label="性别"
          sortable
          show-overflow-tooltip
          width="80"
        />
        <el-table-column
          prop="mobile"
          label="手机号"
          sortable
          show-overflow-tooltip
          width="130"
        />
        <el-table-column
          prop="address"
          label="地址"
          sortable
          :formatter="formatAddress"
          show-overflow-tooltip
        />
        <el-table-column
          prop="age"
          label="年龄"
          sortable
          show-overflow-tooltip
          width="80"
        />
        <el-table-column
          prop="birthday"
          label="生日"
          sortable
          :formatter="formatDate"
          show-overflow-tooltip
          width="100"
        />
        <el-table-column
          prop="sendHimMoney"
          label="我送Ta的"
          show-overflow-tooltip
        />
        <el-table-column
          prop="sendMeMoney"
          label="Ta送我的"
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
                <el-dropdown-item :command="{type:'giftgivings',id:scope.row.id}"><i class="el-icon-edit" />送礼记账</el-dropdown-item>
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
      <giftg-edit ref="giftgEdit" @save-success="saveGiftGivings" />
    </div>
  </div>
</template>

<script>

import { contactses } from '@/api/module/giftAccountBook'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'

export default {
  name: 'Contactses',
  components: {
    Pagination,
    dataView: () => import('./view'),
    dataEdit: () => import('./edit'),
    agiftEdit: () => import('../accept_gifts/edit'),
    giftgEdit: () => import('../gift_givings/edit')
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
      contactses.getContactses(this.listQuery).then(response => {
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
          this.$refs.agiftEdit.created(command.id)
          break
        case 'giftgivings':
          this.$refs.giftgEdit.created(command.id)
          break
        case 'del':
          var currentRow = command.row
          this.$confirm('删除联系人会删除跟他关联的送礼和收礼记录，你确定要删除（' + currentRow.name + '）吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            contactses.deleteContactses(currentRow.id).then((result) => {
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
    },
    saveGiftGivings() {
      this.$router.push('/giftAccountBook/giftGivings')
    }
  }
}
</script>
