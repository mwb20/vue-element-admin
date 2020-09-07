/**
 * Created by mwb on 2020年1月7日.
 */

/**
 * 将一般数组转为树形数组
 * @param {Array} array 一般数组
 * @param {String} parentPropertyName 父节点属性名
 * @param {String} propertyName 跟父节点比较的属性名
 * @param {Array} completeChecks 完整的默认选项，提供该参数后可使用getTreeAndChecks函数获取去掉有子节点的默认选项，
 * 否则选择父节点时会导致所有子节点被选中
 * @returns {Array}
 */
export function treeTools(array, parentPropertyName, propertyName, completeChecks) {
  return {
    /**
     * 获取树形数组
     * @param {String} parent 父节点
     */
    getTree(parent) {
      const treeNodes = []
      array.forEach(item => {
        if (item[parentPropertyName] === parent) {
          const node = Object.assign({}, item)
          node.children = this.getTree(item[propertyName])
          treeNodes.push(node)
        }
      })
      return treeNodes
    },
    defaultChecks: [],
    toTreeAndChecks(parent) {
      const treeNodes = []
      array.forEach(item => {
        if (item[parentPropertyName] === parent) {
          const node = Object.assign({}, item)
          node.children = this.toTreeAndChecks(item[propertyName])
          if (node.children.length === 0 && completeChecks != null) {
            // 设置子节点默认选中
            completeChecks.forEach(perm => {
              if (node[propertyName] === perm) {
                this.defaultChecks.push(node[propertyName])
                return
              }
            })
          }
          treeNodes.push(node)
        }
      })
      return treeNodes
    }
  }
}
