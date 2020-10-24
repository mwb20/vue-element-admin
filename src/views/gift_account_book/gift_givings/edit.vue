<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item v-if="showContactses" label="联系人" prop="contactsesId" verify>
        <el-select
          v-model="editForm.contactsesId"
          filterable
          remote
          reserve-keyword
          allow-create
          default-first-option
          placeholder="请输入关键词"
          :remote-method="searchContactPerson"
          :loading="selectLoading"
        >
          <el-option
            v-for="item in contactPersons"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="showGender" label="性别" prop="genderArray" verify>
        <dictionary v-model="editForm.genderArray" code="XingBie" :level="1" />
      </el-form-item>
      <el-form-item label="礼物类型" prop="giftArray" verify>
        <dictionary v-model="editForm.giftArray" code="LiWuLeiXing" :level="3" />
      </el-form-item>
      <el-form-item label="送礼方式" prop="giveWayArray" verify>
        <dictionary v-model="editForm.giveWayArray" code="SongLiFangShi" :level="3" />
      </el-form-item>
      <el-form-item label="金额" prop="amount" verify number>
        <el-input v-model="editForm.amount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="送礼日期" prop="giveDate" verify>
        <el-date-picker
          v-model="editForm.giveDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
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
import { giftGiving, contactses } from '@/api/module/giftAccountBook'
import { parseTime } from '@/utils'
export default {
  name: 'GiftGivingEdit',
  components: {
    Dictionary: () => import('@/components/DataDictionary')
  },
  data() {
    return {
      title: null,
      showContactses: true,
      dialogVisible: false,
      selectLoading: false,
      contactPersons: [],
      editForm: { isActive: true, sort: 0 }
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
      giftGiving.getGiftGivingById(id).then((response) => {
        loading.close()
        this.contactPersons = [{ id: response.contactsesId, name: response.contactPerson }]

        this.editForm = response

        this.$set(this.editForm, 'giftArray', [this.editForm.gift])
        this.$set(this.editForm, 'giveWayArray', [this.editForm.giveWay])
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
            createOrUpdate = giftGiving.updateGiftGiving
          } else {
            createOrUpdate = giftGiving.createGiftGiving
          }

          // 保存前数据处理--------------------------------
          // 如果联系人的id不等于36说明没找到联系人而是手动添加的
          if (this.editForm.contactsesId.length !== 36) {
            this.$set(this.editForm, 'contactPersonName', this.editForm.contactsesId)
            this.$set(this.editForm, 'contactsesId', undefined)
          }
          if (this.editForm.genderArray) {
            this.$set(this.editForm, 'contactPersonGender', this.editForm.genderArray[0])
          }
          if (this.editForm.giftArray) {
            this.$set(this.editForm, 'gift', this.editForm.giftArray[0])
          }
          if (this.editForm.giveWayArray) {
            this.$set(this.editForm, 'giveWay', this.editForm.giveWayArray[0])
          }
          // 保存前数据处理结束---------------------------------------------

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
    // 搜索联系人
    searchContactPerson(name) {
      if (name !== '') {
        this.selectLoading = true
        contactses.getSelectSearch(name).then((response) => {
          this.selectLoading = false
          this.contactPersons = response
        }).catch(() => {
          this.selectLoading = false
        })
      } else {
        this.contactPersons = []
      }
    },
    closeHandle() {
      this.editForm = {}
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
    },
    created(contactsesId) {
      this.title = '送礼记账'
      // 设置表单的默认值
      this.$set(this.editForm, 'giveDate', parseTime(new Date(), '{y}-{m}-{d}'))
      this.$set(this.editForm, 'giftArray', ['人民币'])
      this.$set(this.editForm, 'giveWayArray', ['当面赠送'])
      if (contactsesId) {
        this.showContactses = false
        this.$set(this.editForm, 'contactsesId', contactsesId)
      }
      this.dialogVisible = true
    },
    edit(id) {
      this.title = '编辑'
      this.loadData(id)
    }
  }
}
</script>
