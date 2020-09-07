import request from '@/utils/request'
export const dictionaries = {
  createDictionarie: function({ parentId, code, name, value, sort, isActive, hasChildren }) {
    return request({
      url: '/api/DataDictionary/Dictionaries',
      method: 'post',
      data: { parentId, code, name, value, sort, isActive, hasChildren }
    })
  },
  deleteDictionaries: function(id) {
    return request({
      url: '/api/DataDictionary/Dictionaries',
      method: 'delete',
      params: { id }
    })
  },
  getDictionaries: function({ filter, skipCount, maxResultCount }) {
    return request({
      url: '/api/DataDictionary/Dictionaries',
      method: 'get',
      params: { filter, skipCount, maxResultCount }
    })
  },
  updateDictionaries: function({ id, parentId, code, name, value, sort, isActive, hasChildren }) {
    return request({
      url: '/api/DataDictionary/Dictionaries',
      method: 'put',
      params: { id },
      data: { parentId, code, name, value, sort, isActive, hasChildren }
    })
  },
  getDictionarie: function(id) {
    return request({
      url: '/api/DataDictionary/Dictionaries/' + id,
      method: 'get'
    })
  },
  getChildren: function(parentId) {
    return request({
      url: '/api/DataDictionary/Dictionaries/Children',
      method: 'get',
      params: { parentId }
    })
  },
  getTree: function(code) {
    return request({
      url: '/api/DataDictionary/Dictionaries/Tree',
      method: 'get',
      params: { code }
    })
  }
}
