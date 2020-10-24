<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="名称" prop="name" verify>
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="日期" prop="groupDate" verify>
        <el-date-picker
          v-model="editForm.groupDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="地区" prop="area" verify>
        <dictionary v-model="editForm.area" code="Area" :level="3" />
      </el-form-item>
      <el-form-item label="详细地址" prop="address" verify>
        <el-input v-model="editForm.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input v-model="editForm.memo" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { bookGroup } from '@/api/module/giftAccountBook'
import { parseTime } from '@/utils'
export default {
  name: 'BookGroupEdit',
  components: {
    Dictionary: () => import('@/components/DataDictionary')
  },
  data() {
    return {
      title: null,
      dialogVisible: false,
      selectLoading: false,
      editForm: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      bookGroup.getBookGroupById(id).then((response) => {
        loading.close()
        this.editForm = response
        this.$set(this.editForm, 'area', [this.editForm.province, this.editForm.city, this.editForm.county])
        // 成功获取数据后再显示dialog
        this.dialogVisible = true
      }).catch(() => {
        loading.close()
      })
    },
    editSave() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          if (this.editForm.area) {
            this.$set(this.editForm, 'province', this.editForm.area[0])
            this.$set(this.editForm, 'city', this.editForm.area[1])
            this.$set(this.editForm, 'county', this.editForm.area[2])
          }
          let createOrUpdate
          if (this.editForm.id) {
            createOrUpdate = bookGroup.updateBookGroup
          } else {
            createOrUpdate = bookGroup.createBookGroup
          }
          createOrUpdate(this.editForm).then((result) => {
            loading.close()
            this.$message.success('保存成功')
            this.$emit('save-success')
            this.dialogVisible = false
          }).catch(() => {
            loading.close()
          })
        }
      })
    },
    closeHandle() {
      this.editForm = {}
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
    },
    created() {
      this.$set(this.editForm, 'groupDate', parseTime(new Date(), '{y}-{m}-{d}'))
      this.dialogVisible = true
    },
    edit(id) {
      this.title = '编辑'
      this.loadData(id)
    }
  }
}
</script>
