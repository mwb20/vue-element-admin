import request from '@/utils/request'

export const dataSourceInfo = {
  createDataSourceInfo: function({ dataSourceType, name, memo, extraProperties }) {
    return request({
      url: '/api/app/data-source-info',
      method: 'post',
      data: { dataSourceType, name, memo, extraProperties }
    })
  },
  getDataSourceInfos: function({ name, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/data-source-info',
      method: 'get',
      params: { name, sorting, skipCount, maxResultCount }
    })
  },
  updateDataSourceInfo: function({ id, dataSourceType, name, memo, extraProperties }) {
    return request({
      url: '/api/app/data-source-info/' + id,
      method: 'put',
      data: { dataSourceType, name, memo, extraProperties }
    })
  },
  deleteDataSourceInfo: function(id) {
    return request({
      url: '/api/app/data-source-info/' + id,
      method: 'delete'
    })
  },
  getDataSourceInfo: function(id) {
    return request({
      url: '/api/app/data-source-info/' + id,
      method: 'get'
    })
  },
  getDataSourceInfoAll: function() {
    return request({
      url: '/api/app/data-source-info/get-all',
      method: 'get'
    })
  }
}

export const moduleConfigures = {
  createModuleConfigure: function({ moduleName, dataSourceId, extraProperties }) {
    return request({
      url: '/api/app/module-configures',
      method: 'post',
      data: { moduleName, dataSourceId, extraProperties }
    })
  },
  getModuleConfigures: function({ moduleName, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/module-configures',
      method: 'get',
      params: { moduleName, sorting, skipCount, maxResultCount }
    })
  },
  updateModuleConfigure: function({ id, moduleName, dataSourceId, extraProperties }) {
    return request({
      url: '/api/app/module-configures/' + id,
      method: 'put',
      data: { moduleName, dataSourceId, extraProperties }
    })
  },
  deleteModuleConfigure: function(id) {
    return request({
      url: '/api/app/module-configures/' + id,
      method: 'delete'
    })
  },
  getModuleConfigure: function(id) {
    return request({
      url: '/api/app/module-configures/' + id,
      method: 'get'
    })
  },
  getModuleConfigureByName: function(name) {
    return request({
      url: '/api/app/module-configures/by-name/' + encodeURIComponent(name),
      method: 'get'
    })
  }
}

export const uploadSettlementList = {
  createUploadSettlementList: function({ setlId, setlTime, setlListId, errMsg, state }) {
    return request({
      url: '/api/app/settlement-list',
      method: 'post',
      data: { setlId, setlTime, setlListId, errMsg, state }
    })
  },
  getUploadSettlementLists: function({ setlId, startDate, endDate, state }) {
    return request({
      url: '/api/app/settlement-list',
      method: 'get',
      params: { setlId, startDate, endDate, state }
    })
  },
  updateUploadSettlementList: function({ id, setlId, setlTime, setlListId, errMsg, state }) {
    return request({
      url: '/api/app/settlement-list/' + id,
      method: 'put',
      data: { setlId, setlTime, setlListId, errMsg, state }
    })
  },
  deleteUploadSettlementList: function(id) {
    return request({
      url: '/api/app/settlement-list/' + id,
      method: 'delete'
    })
  },
  getUploadSettlementList: function(id) {
    return request({
      url: '/api/app/settlement-list/' + id,
      method: 'get'
    })
  },
  upload: function({ settls }) {
    return request({
      url: '/api/app/settlement-list/upload',
      method: 'post',
      data: { settls }
    })
  },
  updateState: function({ settls, state }) {
    return request({
      url: '/api/app/settlement-list/update-state',
      method: 'put',
      data: { settls, state }
    })
  }
}

