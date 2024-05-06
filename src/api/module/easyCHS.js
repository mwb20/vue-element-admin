import request from '@/utils/request'

export const catalogBaseInfo = {
  createCatalogBaseInfo: function({ hilistCode, hilistName, updtTime, medChrgitmType, chrgitmLv, pinyin, wubi, spec, dosformName, memo, prodentpCode, prodentpName, manuNatRegn, drugProdname, aprvno, trtItemCont, trtExctCont, lmtUsescp, matn_used_flag, crteTime, begnDate, endDate, listType, regSpec, minPacCnt, minPacunt, gennameCodg, drugDosform, drugstdcode, isEthdrug }) {
    return request({
      url: '/api/app/catalog-base-info',
      method: 'post',
      data: { hilistCode, hilistName, updtTime, medChrgitmType, chrgitmLv, pinyin, wubi, spec, dosformName, memo, prodentpCode, prodentpName, manuNatRegn, drugProdname, aprvno, trtItemCont, trtExctCont, lmtUsescp, matn_used_flag, crteTime, begnDate, endDate, listType, regSpec, minPacCnt, minPacunt, gennameCodg, drugDosform, drugstdcode, isEthdrug }
    })
  },
  getCatalogBaseInfos: function({ hilistCode, hilistName, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/catalog-base-info',
      method: 'get',
      params: { hilistCode, hilistName, sorting, skipCount, maxResultCount }
    })
  },
  updateCatalogBaseInfo: function({ id, hilistCode, hilistName, updtTime, medChrgitmType, chrgitmLv, pinyin, wubi, spec, dosformName, memo, prodentpCode, prodentpName, manuNatRegn, drugProdname, aprvno, trtItemCont, trtExctCont, lmtUsescp, matn_used_flag, crteTime, begnDate, endDate, listType, regSpec, minPacCnt, minPacunt, gennameCodg, drugDosform, drugstdcode, isEthdrug }) {
    return request({
      url: '/api/app/catalog-base-info/' + id,
      method: 'put',
      data: { hilistCode, hilistName, updtTime, medChrgitmType, chrgitmLv, pinyin, wubi, spec, dosformName, memo, prodentpCode, prodentpName, manuNatRegn, drugProdname, aprvno, trtItemCont, trtExctCont, lmtUsescp, matn_used_flag, crteTime, begnDate, endDate, listType, regSpec, minPacCnt, minPacunt, gennameCodg, drugDosform, drugstdcode, isEthdrug }
    })
  },
  deleteCatalogBaseInfo: function(id) {
    return request({
      url: '/api/app/catalog-base-info/' + id,
      method: 'delete'
    })
  },
  getCatalogBaseInfo: function(id) {
    return request({
      url: '/api/app/catalog-base-info/' + id,
      method: 'get'
    })
  }
}

export const catalogPriceLimitInfo = {
  createCatalogPriceLimitInfo: function({ hilistCode, hilistLmtpricType, begndate, insuAdmdvs, overlmtDspoWay, enddate, hilistPricUplmtAmt }) {
    return request({
      url: '/api/app/catalog-price-limit-info',
      method: 'post',
      data: { hilistCode, hilistLmtpricType, begndate, insuAdmdvs, overlmtDspoWay, enddate, hilistPricUplmtAmt }
    })
  },
  getCatalogPriceLimitInfos: function({ hilistCode, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/catalog-price-limit-info',
      method: 'get',
      params: { hilistCode, sorting, skipCount, maxResultCount }
    })
  },
  updateCatalogPriceLimitInfo: function({ id, hilistCode, hilistLmtpricType, begndate, insuAdmdvs, overlmtDspoWay, enddate, hilistPricUplmtAmt }) {
    return request({
      url: '/api/app/catalog-price-limit-info/' + id,
      method: 'put',
      data: { hilistCode, hilistLmtpricType, begndate, insuAdmdvs, overlmtDspoWay, enddate, hilistPricUplmtAmt }
    })
  },
  deleteCatalogPriceLimitInfo: function(id) {
    return request({
      url: '/api/app/catalog-price-limit-info/' + id,
      method: 'delete'
    })
  },
  getCatalogPriceLimitInfo: function(id) {
    return request({
      url: '/api/app/catalog-price-limit-info/' + id,
      method: 'get'
    })
  }
}

export const catalogPublicRestLimitInfo = {
  createCatalogPublicRestLimitInfo: function({ fixmedinsCode, fixmedinsName, hilistLmtpricType, hilistCode, hilistName, insuAdmdvs, begndate, enddate, overlmtDspoWay, hilistPricUplmtAmt }) {
    return request({
      url: '/api/app/catalog-public-rest-limit-info',
      method: 'post',
      data: { fixmedinsCode, fixmedinsName, hilistLmtpricType, hilistCode, hilistName, insuAdmdvs, begndate, enddate, overlmtDspoWay, hilistPricUplmtAmt }
    })
  },
  getCatalogPublicRestLimitInfos: function({ hilistCode, hilistName, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/catalog-public-rest-limit-info',
      method: 'get',
      params: { hilistCode, hilistName, sorting, skipCount, maxResultCount }
    })
  },
  updateCatalogPublicRestLimitInfo: function({ id, fixmedinsCode, fixmedinsName, hilistLmtpricType, hilistCode, hilistName, insuAdmdvs, begndate, enddate, overlmtDspoWay, hilistPricUplmtAmt }) {
    return request({
      url: '/api/app/catalog-public-rest-limit-info/' + id,
      method: 'put',
      data: { fixmedinsCode, fixmedinsName, hilistLmtpricType, hilistCode, hilistName, insuAdmdvs, begndate, enddate, overlmtDspoWay, hilistPricUplmtAmt }
    })
  },
  deleteCatalogPublicRestLimitInfo: function(id) {
    return request({
      url: '/api/app/catalog-public-rest-limit-info/' + id,
      method: 'delete'
    })
  },
  getCatalogPublicRestLimitInfo: function(id) {
    return request({
      url: '/api/app/catalog-public-rest-limit-info/' + id,
      method: 'get'
    })
  }
}

export const catalogSelfPayRatioInfo = {
  createCatalogSelfPayRatioInfo: function({ hilistCode, selfpayPropPsnType, begndate, insuAdmdvs, selfpayPropType, enddate, selfpayProp }) {
    return request({
      url: '/api/app/catalog-self-pay-ratio-info',
      method: 'post',
      data: { hilistCode, selfpayPropPsnType, begndate, insuAdmdvs, selfpayPropType, enddate, selfpayProp }
    })
  },
  getCatalogSelfPayRatioInfos: function({ hilistCode, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/catalog-self-pay-ratio-info',
      method: 'get',
      params: { hilistCode, sorting, skipCount, maxResultCount }
    })
  },
  updateCatalogSelfPayRatioInfo: function({ id, hilistCode, selfpayPropPsnType, begndate, insuAdmdvs, selfpayPropType, enddate, selfpayProp }) {
    return request({
      url: '/api/app/catalog-self-pay-ratio-info/' + id,
      method: 'put',
      data: { hilistCode, selfpayPropPsnType, begndate, insuAdmdvs, selfpayPropType, enddate, selfpayProp }
    })
  },
  deleteCatalogSelfPayRatioInfo: function(id) {
    return request({
      url: '/api/app/catalog-self-pay-ratio-info/' + id,
      method: 'delete'
    })
  },
  getCatalogSelfPayRatioInfo: function(id) {
    return request({
      url: '/api/app/catalog-self-pay-ratio-info/' + id,
      method: 'get'
    })
  }
}

export const catalogSpecialAttributesInfo = {
  createCatalogSpecialAttributesInfo: function({ medListCodg, insuAdmdvs, listAttrCode, begndate, enddate }) {
    return request({
      url: '/api/app/catalog-special-attributes-info',
      method: 'post',
      data: { medListCodg, insuAdmdvs, listAttrCode, begndate, enddate }
    })
  },
  getCatalogSpecialAttributesInfos: function({ medListCodg, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/catalog-special-attributes-info',
      method: 'get',
      params: { medListCodg, sorting, skipCount, maxResultCount }
    })
  },
  updateCatalogSpecialAttributesInfo: function({ id, medListCodg, insuAdmdvs, listAttrCode, begndate, enddate }) {
    return request({
      url: '/api/app/catalog-special-attributes-info/' + id,
      method: 'put',
      data: { medListCodg, insuAdmdvs, listAttrCode, begndate, enddate }
    })
  },
  deleteCatalogSpecialAttributesInfo: function(id) {
    return request({
      url: '/api/app/catalog-special-attributes-info/' + id,
      method: 'delete'
    })
  },
  getCatalogSpecialAttributesInfo: function(id) {
    return request({
      url: '/api/app/catalog-special-attributes-info/' + id,
      method: 'get'
    })
  }
}

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

