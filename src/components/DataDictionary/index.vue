<template>
  <el-cascader :value="value" :props="cascaderProps" @change="selectChange" />
</template>
<script>
import { commonDictionaries } from '@/api/abpFramework'

export default {
  name: 'DataDictionaryComponent',
  props: {
    value: {
      type: Array,
      required: false,
      default: undefined
    },
    code: {
      type: String,
      required: false,
      default: undefined
    },
    level: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data() {
    const topCode = this.code
    const level = this.level - 1
    return {
      cascaderProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          const p_code = node.level === 0 ? topCode : node.data.code
          commonDictionaries.getTree(p_code).then(response => {
            const nodes = Array.from(response.result)
              .map(item => ({
                code: item.code,
                value: item.value,
                label: item.name,
                leaf: !item.hasChildren || node.level >= level
              }))
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          })
        }
      }
    }
  },
  methods: {
    selectChange(data) {
      this.$emit('input', data)
    }
  }
}
</script>
