<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="姓名" prop="name" verify>
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="关系" prop="relevanceArray" verify>
        <dictionary v-model="editForm.relevanceArray" code="LianXiRenGuanXi" :level="1" />
      </el-form-item>
      <el-form-item label="性别" prop="genderArray" verify>
        <dictionary v-model="editForm.genderArray" code="XingBie" :level="1" />
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="editForm.birthday"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="editForm.age" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editForm.mobile" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地区" prop="area">
        <dictionary v-model="editForm.area" code="Area" :level="3" />
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
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
import { contactses } from '@/api/module/giftAccountBook'
export default {
  name: 'ContactsesEdit',
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
  computed: {
    showGender() {
      return this.editForm.contactsesId !== undefined && this.editForm.contactsesId.length < 36
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      contactses.getContactsesById(id).then((response) => {
        loading.close()

        this.editForm = response

        this.$set(this.editForm, 'genderArray', [this.editForm.gender])
        this.$set(this.editForm, 'relevanceArray', [this.editForm.relevance])
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
          let createOrUpdate
          if (this.editForm.id) {
            createOrUpdate = contactses.updateContactses
          } else {
            createOrUpdate = contactses.createContactse
          }

          if (this.editForm.relevanceArray) {
            this.$set(this.editForm, 'relevance', this.editForm.relevanceArray[0])
          }
          if (this.editForm.genderArray) {
            this.$set(this.editForm, 'gender', this.editForm.genderArray[0])
          }
          if (this.editForm.area) {
            this.$set(this.editForm, 'province', this.editForm.area[0])
            this.$set(this.editForm, 'city', this.editForm.area[1])
            this.$set(this.editForm, 'county', this.editForm.area[2])
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
      this.dialogVisible = true
    },
    edit(id) {
      this.title = '编辑'
      this.loadData(id)
    }
  }
}
</script>
