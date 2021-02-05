<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item v-show="false" label="父id" prop="parentId">
        <el-input v-model="editForm.parentId" />
      </el-form-item>
      <el-form-item v-show="parentName!==undefined" label="父节点">
        <el-input v-model="parentName" autocomplete="off" readonly="readonly" />
      </el-form-item>
      <el-form-item label="编码" prop="code" verify>
        <el-input v-model="editForm.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名称" prop="name" verify>
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="值" prop="value" verify>
        <el-input v-model="editForm.value" autocomplete="off" />
      </el-form-item>
      <el-form-item label="顺序" prop="sort" verify number>
        <el-input v-model.number="editForm.sort" autocomplete="off" />
      </el-form-item>
      <el-form-item label="说明" prop="value">
        <el-input v-model="editForm.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用" prop="isActive" verify>
        <el-switch v-model="editForm.isActive" class="drawer-switch" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { dictionaries } from '@/api/module/dataDictionary'
export default {
  name: 'DataDictionariesEdit',
  data() {
    return {
      title: '新增',
      parentName: undefined,
      dialogVisible: false,
      editForm: { isActive: true, sort: 0 }
    }
  },
  watch: {
    'editForm.name': function(val, old) {
      // 监听表单name（名称）使表单value（值）默认等于名称
      if (this.editForm.value === old) {
        this.$set(this.editForm, 'value', val)
      }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      dictionaries.getDictionarie(id).then((response) => {
        loading.close()
        this.editForm = response
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
          let createOrUpdate
          if (this.editForm.id) {
            createOrUpdate = dictionaries.updateDictionaries
          } else {
            createOrUpdate = dictionaries.createDictionarie
          }
          createOrUpdate(this.editForm).then((result) => {
            loading.close()
            this.$message.success('保存成功')
            this.$emit('save-success', this.editForm.parentId)
            this.dialogVisible = false
          }).catch(() => {
            loading.close()
          })
        }
      })
    },
    closeHandle() {
      this.editForm = { isActive: true, sort: 0 }
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
    },
    edit(id) {
      this.title = '编辑'
      this.loadData(id)
    },
    created(parentId, parentName) {
      if (parentId) {
        this.title = '添加子节点'
      } else {
        this.title = '创建根节点'
      }
      this.editForm.parentId = parentId
      this.parentName = parentName
      this.dialogVisible = true
    }
  }
}
</script>
