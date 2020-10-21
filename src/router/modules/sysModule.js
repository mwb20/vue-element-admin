import Layout from '@/layout'

const systemModule = {
  path: '/admin',
  component: Layout,
  redirect: '/admin/dataDictionaries',
  name: 'SystemManage',
  meta: { title: '系统管理', icon: 'component', noCache: true },
  children: [
    {
      path: 'dataDictionaries',
      component: () => import('@/views/system_manage/data_dictionaries/index'),
      name: 'DataDictionaries',
      meta: { permissions: ['DataDictionary.DataDictionaries'], title: '数据字典', icon: 'dictionary', noCache: false }
    },
    {
      path: 'tenants',
      component: () => import('@/views/system_manage/tenants/index'),
      name: 'Tenants',
      meta: { permissions: ['AbpTenantManagement.Tenants'], title: '租户', icon: 'tenant', noCache: false }
    },
    {
      path: 'roles',
      component: () => import('@/views/system_manage/roles/index'),
      name: 'Roles',
      meta: { permissions: ['AbpIdentity.Roles'], title: '角色', icon: 'role', noCache: false }
    },
    {
      path: 'users',
      component: () => import('@/views/system_manage/users/index'),
      name: 'Users',
      meta: { permissions: ['AbpIdentity.Users'], title: '用户', icon: 'user', noCache: false }
    }
  ]
}

export default systemModule
