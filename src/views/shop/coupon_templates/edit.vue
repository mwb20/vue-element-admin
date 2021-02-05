<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="StoreId" prop="storeId" verify>
        <el-input v-model="editForm.storeId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CouponType" prop="couponType" verify>
        <el-input v-model="editForm.couponType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="UniqueName" prop="uniqueName" verify>
        <el-input v-model="editForm.uniqueName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DisplayName" prop="displayName" verify>
        <el-input v-model="editForm.displayName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Description" prop="description" verify>
        <el-input v-model="editForm.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="UsableDuration" prop="usableDuration" verify>
        <el-input v-model="editForm.usableDuration" autocomplete="off" />
      </el-form-item>
      <el-form-item label="UsableBeginTime" prop="usableBeginTime" verify>
        <el-date-picker
          v-model="editForm.usableBeginTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="UsableEndTime" prop="usableEndTime" verify>
        <el-date-picker
          v-model="editForm.usableEndTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="ConditionAmount" prop="conditionAmount" verify>
        <el-input v-model="editForm.conditionAmount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DiscountAmount" prop="discountAmount" verify>
        <el-input v-model="editForm.discountAmount" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Currency" prop="currency" verify>
        <el-input v-model="editForm.currency" autocomplete="off" />
      </el-form-item>
      <el-form-item label="IsUnscoped" prop="isUnscoped" verify>
        <el-switch v-model="editForm.isUnscoped" class="drawer-switch" />
      </el-form-item>
      <el-form-item label="ExtraProperties" prop="extraProperties" verify>
        <el-input v-model="editForm.extraProperties" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ConcurrencyStamp" prop="concurrencyStamp" verify>
        <el-input v-model="editForm.concurrencyStamp" autocomplete="off" />
      </el-form-item>
      <el-form-item label="CreatorId" prop="creatorId" verify>
        <el-input v-model="editForm.creatorId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="LastModifierId" prop="lastModifierId" verify>
        <el-input v-model="editForm.lastModifierId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DeleterId" prop="deleterId" verify>
        <el-input v-model="editForm.deleterId" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { couponTemplate } from '@/api/module/eshop'
export default {
  name: 'CouponTemplatesEdit',
  data() {
    return {
      title: '新增',
      dialogVisible: false,
      editForm: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      couponTemplate.getCouponTemplate(id).then((result) => {
        loading.close()
        // 显示dialog
        this.dialogVisible = true
        this.editForm = result
      }).catch(() => {
        loading.close()
        // 出现异常时调用关闭处理方法重置参数，否则导致无法触发监听
        this.closeHandle()
      })
    },
    editSave() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          const loading = this.$loading()
          // id有值执行更新方法
          if (this.editForm.id !== undefined) {
            couponTemplate.updateCouponTemplate(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            couponTemplate.createCouponTemplate(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          }
        }
      })
    },
    closeHandle() {
      this.editForm = { }
      // 这里必须先判断$refs中是否存在表单，否则在打开dialog获取数据出错调用时会出现异常
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
    },
    edit(id, title) {
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created() {
      // 显示dialog
      this.dialogVisible = true
    }
  }
}
</script>
