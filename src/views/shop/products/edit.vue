<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-form-item label="StoreId" prop="storeId" verify>
        <el-input v-model="editForm.storeId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ProductGroupName" prop="productGroupName" verify>
        <el-input v-model="editForm.productGroupName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ProductDetailId" prop="productDetailId" verify>
        <el-input v-model="editForm.productDetailId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="UniqueName" prop="uniqueName" verify>
        <el-input v-model="editForm.uniqueName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DisplayName" prop="displayName" verify>
        <el-input v-model="editForm.displayName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="InventoryStrategy" prop="inventoryStrategy" verify>
        <el-input v-model="editForm.inventoryStrategy" autocomplete="off" />
      </el-form-item>
      <el-form-item label="MediaResources" prop="mediaResources" verify>
        <el-input v-model="editForm.mediaResources" autocomplete="off" />
      </el-form-item>
      <el-form-item label="DisplayOrder" prop="displayOrder" verify>
        <el-input v-model="editForm.displayOrder" autocomplete="off" />
      </el-form-item>
      <el-form-item label="IsPublished" prop="isPublished" verify>
        <el-switch v-model="editForm.isPublished" class="drawer-switch" />
      </el-form-item>
      <el-form-item label="IsStatic" prop="isStatic" verify>
        <el-switch v-model="editForm.isStatic" class="drawer-switch" />
      </el-form-item>
      <el-form-item label="IsHidden" prop="isHidden" verify>
        <el-switch v-model="editForm.isHidden" class="drawer-switch" />
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
import { product } from '@/api/module/eshop'
export default {
  name: 'ProductEdit',
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
      product.getProduct(id).then((result) => {
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
            product.updateProduct(this.editForm)
              .then((result) => {
                loading.close()
                this.$emit('save-success')
                this.$message.success('保存成功')
                this.dialogVisible = false
              }).catch(() => {
                loading.close()
              })
          } else {
            product.createProduct(this.editForm)
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
