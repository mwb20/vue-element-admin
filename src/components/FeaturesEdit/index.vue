<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closeHandle">
    <el-tabs v-model="currentGroup" tab-position="left">
      <el-tab-pane v-for="group in editForm" :key="group.name" :name="group.name" :label="group.displayName">
        <el-tree
          ref="tree"
          node-key="name"
          :data="featuresToTree(group.features, null)"
          default-expand-all
          :expand-on-click-node="false"
          :props="defaultProps"
          class="feature-tree"
        >
          <div slot-scope="{ data }">
            {{ data.displayName }}
            <el-input-number
              v-if="data.valueType.name==='FreeTextStringValueType'
                && data.valueType.validator.name==='NUMERIC'"
              v-model="data.value"
              :step="1"
              size="mini"
              :min="data.valueType.validator.maxValue!=data.valueType.validator.minValue?data.valueType.validator.minValue:-Infinity"
              :max="data.valueType.validator.maxValue!=data.valueType.validator.minValue?data.valueType.validator.maxValue:Infinity"
              :title="data.description"
            />
            <el-input
              v-else-if="data.valueType.name==='FreeTextStringValueType'"
              v-model="data.value"
              size="mini"
              :title="data.description"
            />
            <el-switch
              v-else-if="data.valueType.name==='ToggleStringValueType'"
              v-model="data.value"
              active-value="true"
              inactive-value="false"
              :title="data.description"
            />
            <el-select
              v-else-if="data.valueType.name==='SelectionStringValueType'"
              v-model="data.value"
              placeholder="请选择"
              size="mini"
              :title="data.description"
            >
              <el-option
                v-for="item in data.valueType.itemSource.items"
                :key="item.value"
                :label="item.displayText.name"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-tree>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style>
.feature-tree .el-tree-node__content{
  height: 35px;
}
</style>
<script>
import { features } from '@/api/abpFramework'
export default {
  name: 'FeaturesEditComponent',
  data() {
    return {
      title: null,
      providerKey: null,
      providerName: null,
      dialogVisible: false,
      currentGroup: [],
      editForm: [],
      defaultProps: {
        children: 'children',
        label: 'displayName'
      }
    }
  },
  methods: {
    loadData() {
      const loading = this.$loading()
      features.getFeatures({ providerName: this.providerName, providerKey: this.providerKey }).then(res => {
        loading.close()
        // 显示dialog
        this.dialogVisible = true
        this.editForm = res.groups
        if (res.groups.length > 0) {
          // 设置默认选择第一个分组
          this.currentGroup = res.groups[0].name
        }
      }).catch(() => {
        loading.close()
        this.closeHandle()
      })
    },
    editSave() {
      const submitFeatures = []
      this.editForm.forEach(g => {
        g.features.forEach(c => {
          submitFeatures.push({ name: c.name, value: c.value })
        })
      })
      const loading = this.$loading()
      features.updateFeatures({ providerName: this.providerName, providerKey: this.providerKey, features: submitFeatures }).then(() => {
        loading.close()
        this.$message.success('保存成功')
        this.dialogVisible = false
      }).catch(() => {
        loading.close()
      })
    },
    featuresToTree(featuresData, parentName) {
      const treeData = []
      featuresData.filter(f => f.parentName === parentName).forEach(c => {
        // 递归获取子节点
        c.children = this.featuresToTree(featuresData, c.name)
        treeData.push(c)
      })
      return treeData
    },
    closeHandle() {
      this.editForm.length = 0
      this.currentGroup = null
    },
    edit(providerKey, providerName, title) {
      this.providerKey = providerKey
      this.providerName = providerName
      this.title = '功能 - ' + title
      this.loadData()
    }
  }
}
</script>
