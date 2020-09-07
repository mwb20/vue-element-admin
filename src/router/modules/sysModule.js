import Layout from '@/layout'

const systemModule = {
  path: '/admin',
  component: Layout,
  meta: { title: '系统管理', icon: 'component', noCache: true },
  children: [
    {
      path: 'commonDictionaries',
      component: () => import('@/views/system_manage/data_dictionaries/index'),
      name: 'CommonDictionaries',
      meta: { permissions: ['DataDictionary.DataDictionaries'], title: '通用字典', icon: 'dictionary', noCache: true }
    },
    {
      path: 'tenants',
      component: () => import('@/views/system_manage/tenants/index'),
      name: 'Tenants',
      meta: { permissions: ['AbpTenantManagement.Tenants'], title: '租户', icon: 'tenant', noCache: true }
    },
    {
      path: 'roles',
      component: () => import('@/views/system_manage/roles/index'),
      name: 'Roles',
      meta: { permissions: ['AbpIdentity.Roles'], title: '角色', icon: 'peoples', noCache: true }
    },
    {
      path: 'users',
      component: () => import('@/views/system_manage/users/index'),
      name: 'Users',
      meta: { permissions: ['AbpIdentity.Users'], title: '用户', icon: 'user', noCache: true }
    }
  ]
}

export default systemModule
