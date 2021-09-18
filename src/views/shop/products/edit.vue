<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="95%" top="5vh" :destroy-on-close="false" :close-on-click-modal="false" @closed="closeHandle">
    <el-form ref="editForm" :model="editForm" status-icon label-width="100px" class="lable-same-line">
      <el-tabs v-model="tabActiveName">
        <el-tab-pane label="商品信息" name="productInfo" />
        <el-tab-pane label="商品属性" name="productAttribute" />
        <el-tab-pane label="商品介绍" name="productIntroduce" />
      </el-tabs>
      <div v-if="tabActiveName=='productInfo'">
        <el-form-item label="所属分组" prop="productGroupName" verify>
          <el-select v-model="editForm.productGroupName" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in productGroupNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属类目" prop="categoryIds" verify>
          <!-- 这里使用v-if标签让窗口关闭时销毁组件，打开时重新加载，以解决先点新增再编辑其他数据时无法显示的问题 -->
          <el-cascader v-if="dialogVisible" v-model="editForm.categoryIds" :props="categoryIdsProps" style="width:100%" />
        </el-form-item>
        <el-form-item label="唯一名称" prop="uniqueName" verify>
          <el-input v-model="editForm.uniqueName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="展示名称" prop="displayName" verify>
          <el-input v-model="editForm.displayName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="库存扣减策略" prop="inventoryStrategy" verify>
          <el-select v-model="editForm.inventoryStrategy" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in inventoryStrategys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="媒体资源" prop="mediaResources">
          <el-input v-model="editForm.mediaResources" autocomplete="off" />
        </el-form-item>
        <el-form-item label="展示顺序" prop="displayOrder">
          <el-input v-model="editForm.displayOrder" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否发布" prop="isPublished" verify>
          <el-switch v-model="editForm.isPublished" class="drawer-switch" />
        </el-form-item>
      </div>
      <div v-if="tabActiveName=='productAttribute'" class="product-attribute-tab">
        <el-row :gutter="2">
          <el-col v-for="(attr,index) in editForm.productAttributes" :key="index" :span="8" class="product-attribute-item">
            <i class="el-icon-error attribute-remove" @click="removeAttribute(index)" />
            <el-card style="margin-bottom:2px">
              <el-form-item label="属性名" label-width="75px" :prop="'productAttributes.'+index+'.displayName'" verify>
                <el-input v-model="attr.displayName" autocomplete="off" />
              </el-form-item>
              <el-form-item label="说明" label-width="75px" prop="Description">
                <el-input v-model="attr.description" autocomplete="off" />
              </el-form-item>
              <el-form-item label="属性选项" label-width="75px" :prop="'productAttributes.'+index+'.productAttributeOptions2'" verify>
                <el-select
                  v-model="attr.productAttributeOptions2"
                  multiple
                  allow-create
                  filterable
                  default-first-option
                  clearable
                  :popper-append-to-body="false"
                  style="width:100%"
                  placeholder="输入后请按回车确认"
                />
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
        <el-button type="primary" style="margin:10px 0" @click="addAttribute">增加一项</el-button>
      </div>
      <div v-if="tabActiveName=='productIntroduce'" style="margin-right:2px;margin-bottom:5px">
        <tinymce ref="desc_text" v-model="editForm.description" :height="300" />
      </div>
      <input v-model="editForm.productDetailId" type="hidden">
      <input v-model="editForm.storeId" type="hidden">
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { category, product } from '@/api/module/eshop'
import Tinymce from '@/components/Tinymce'
import store from '@/store'

export default {
  name: 'ProductEdit',
  components: { Tinymce },
  data() {
    return {
      title: '新增',
      tabActiveName: 'productInfo',
      dialogVisible: false,
      productGroupNames: [
        { label: '默认', value: 'Default' }
      ],
      inventoryStrategys: [
        { label: '无需库存', value: 1 },
        { label: '下单后减库存', value: 2 },
        { label: '支付后减库存', value: 4 }
      ],
      editForm: {},
      categoryIdsProps: {
        multiple: false,
        lazy: true,
        lazyLoad(node, resolve) {
          category.trees(node.value).then(response => {
            const nodes = Array.from(response)
              .map(item => ({
                value: item.id,
                label: item.displayName,
                leaf: !item.hasChildren,
                children: item.children
              }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          })
        }
      }
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
        this.editForm.productAttributes.forEach(item => {
          // 将属性选项的对象数组转成字符串数组使select进行回显
          item.productAttributeOptions2 = item.productAttributeOptions.map(option => { return option.displayName })
        })
      }).catch(() => {
        loading.close()
        // 出现异常时调用关闭处理方法重置参数，否则导致无法触发监听
        this.closeHandle()
      })
    },
    editSave() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          this.editForm.productAttributes.forEach((item, attrIndex) => {
            item.displayOrder = attrIndex
            item.productAttributeOptions = item.productAttributeOptions2.map((item, index) => {
              return {
                displayOrder: index,
                displayName: item
              }
            })
          })
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
      // 不进行该初始化赋值时新增时会出现必填提示
      this.editForm = { }
      // 这里必须先判断$refs中是否存在表单，否则在打开dialog获取数据出错调用时会出现异常
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields()
      }
      if (this.$refs.desc_text) {
        // 清空富文本编辑框
        this.$refs.desc_text.setContent('')
        this.$refs.desc_text.destroyTinymce()
      }
      // 恢复第一个选项，这样再次切换到富文本选项时会使其重新渲染达到重置效果
      this.tabActiveName = 'productInfo'
    },
    edit(id, title) {
      this.title = '编辑 - ' + title
      this.loadData(id)
    },
    created() {
      this.title = '新增'
      // 新增时重置表单
      this.editForm = {
        isPublished: true,
        productAttributes: [],
        storeId: store.getters.eshopStoreId
      }
      // 显示dialog
      this.dialogVisible = true
    },
    addAttribute() {
      this.editForm.productAttributes.push({
        displayName: '',
        description: '',
        productAttributeOptions2: []
      })
    },
    removeAttribute(index) {
      this.editForm.productAttributes.splice(index, 1)
    }
  }
}
</script>
