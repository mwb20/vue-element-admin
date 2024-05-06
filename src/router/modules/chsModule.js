import Layout from '@/layout'

/**
 * 基础配置模块路由
 */
export const chsBaseSetModule = {
  path: '/chs/settings',
  component: Layout,
  redirect: '/chs/settings/dataSource',
  name: 'chsBaseSetManage',
  meta: { permissions: ['EasyCHSConfig.DataSourceInfo'], title: '医保基础配置', icon: 'component', noCache: false },
  children: [
    {
      path: 'dataSource',
      component: () => import('@/views/chs/data_source/index'),
      name: 'AppDataSourceInfos',
      meta: { permissions: ['EasyCHSConfig.DataSourceInfo'], title: '数据源管理', icon: 'dictionary', noCache: false }
    },
    {
      path: 'settlement-list',
      component: () => import('@/views/chs/settlement_list/config'),
      name: 'AppUploadSettlementListConfig',
      meta: { permissions: ['EasyCHSConfig.ModuleConfigures'], title: '结算清单上传配置', icon: 'tenant', noCache: false }
    }
  ]
}
/**
 * 医保结算清单模块路由
 */
export const chsSettlListModule = {
  path: '/chs/settlement-list',
  component: Layout,
  name: 'chsSettlListManage',
  meta: { title: '结算清单管理', icon: 'component', noCache: false },
  alwaysShow: false,
  children: [
    {
      path: 'upload',
      component: () => import('@/views/chs/settlement_list/index'),
      name: 'AppUploadSettlementList',
      meta: { permissions: ['EasyCHSSettl.SettlementList'], title: '结算清单上传', icon: 'el-icon-folder', noCache: false }
    }
  ]
}

/**
 * 医保目录信息模块路由
 */
export const chsCatalogModule = {
  path: '/chs/catalog',
  component: Layout,
  redirect: '/chs/catalog/base',
  name: 'chsCatalogManage',
  meta: { title: '医保目录管理', icon: 'component', noCache: false },
  children: [
    {
      path: 'base',
      component: () => import('@/views/chs/catalog_base/index'),
      name: 'AppCatalogBaseInfos',
      meta: { permissions: ['EasyCHSCatalog.CatalogBaseInfo'], title: '目录基本信息', icon: 'tenant', noCache: false }
    },
    {
      path: 'price-limit',
      component: () => import('@/views/chs/catalog_price_limit/index'),
      name: 'AppCatalogPriceLimitInfos',
      meta: { permissions: ['EasyCHSCatalog.CatalogPriceLimitInfo'], title: '目录限价信息', icon: 'el-icon-folder', noCache: false }
    },
    {
      path: 'self-pay-ratio',
      component: () => import('@/views/chs/catalog_self_pay_ratio/index'),
      name: 'AppCatalogSelfPayRatioInfos',
      meta: { permissions: ['EasyCHSCatalog.CatalogSelfPayRatioInfo'], title: '目录自付比例信息', icon: 'el-icon-folder', noCache: false }
    },
    {
      path: 'public-rest-limit',
      component: () => import('@/views/chs/catalog_public_rest_limit/index'),
      name: 'AppCatalogPublicRestLimitInfos',
      meta: { permissions: ['EasyCHSCatalog.CatalogPublicRestLimitInfo'], title: '公改目录限价信息', icon: 'el-icon-folder', noCache: false }
    },
    {
      path: 'special-attributes',
      component: () => import('@/views/chs/catalog_special_attributes/index'),
      name: 'AppCatalogSpecialAttributesInfos',
      meta: { permissions: ['EasyCHSCatalog.CatalogSpecialAttributesInfo'], title: '目录特殊属性', icon: 'el-icon-folder', noCache: false }
    }
  ]
}
