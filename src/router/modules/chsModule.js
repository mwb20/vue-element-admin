import Layout from '@/layout'

const chsModule = {
  path: '/chs',
  component: Layout,
  redirect: '/chs/dataSource',
  name: 'chsManage',
  meta: { title: '医保管理', icon: 'component', noCache: false },
  children: [
    {
      path: 'dataSource',
      component: () => import('@/views/chs/data_source/index'),
      name: 'AppDataSourceInfos',
      meta: { permissions: ['EasyCHS.DataSourceInfo'], title: '数据源', icon: 'dictionary', noCache: false }
    },
    {
      path: 'upload-settlement-list-config',
      component: () => import('@/views/chs/settlement_list/config'),
      name: 'AppUploadSettlementListConfig',
      meta: { permissions: ['EasyCHS.ModuleConfigures'], title: '结算清单上传配置', icon: 'tenant', noCache: false }
    },
    {
      path: 'upload-settlement-list',
      component: () => import('@/views/chs/settlement_list/index'),
      name: 'AppUploadSettlementList',
      meta: { permissions: ['EasyCHS.UploadSettlementList'], title: '结算清单上传', icon: 'el-icon-folder', noCache: false }
    }
  ]
}

export default chsModule
