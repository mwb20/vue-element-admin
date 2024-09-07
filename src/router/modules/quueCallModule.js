import Layout from '@/layout'

const quueCallModule = {
  path: '/queue',
  component: Layout,
  redirect: '/queue/dataDictionaries',
  name: 'QueueCallManage',
  meta: { title: '排队叫号', icon: 'component', noCache: true },
  children: [
    {
      path: 'departments',
      component: () => import('@/views/queue_call/departments/index'),
      name: 'AppDepartments',
      meta: { permissions: ['QueueCall.Department'], title: '科室管理', icon: 'dictionary', noCache: false }
    },
    {
      path: 'doctors',
      component: () => import('@/views/queue_call/doctors/index'),
      name: 'AppDoctors',
      meta: { permissions: ['QueueCall.Doctor'], title: '医生管理', icon: 'el-icon-folder', noCache: false }
    },
    {
      path: 'schedulings',
      component: () => import('@/views/queue_call/doctor_schedulings/index'),
      name: 'AppDoctorSchedulings',
      meta: { permissions: ['QueueCall.DoctorScheduling'], title: '排班信息', icon: 'tenant', noCache: false }
    },
    {
      path: 'patients',
      component: () => import('@/views/queue_call/patients/index'),
      name: 'AppPatients',
      meta: { permissions: ['QueueCall.Patient'], title: '患者信息', icon: 'role', noCache: false }
    },
    {
      path: 'registration-records',
      component: () => import('@/views/queue_call/registration_records/index'),
      name: 'AppRegistrationRecords',
      meta: { permissions: ['QueueCall.RegistrationRecords'], title: '挂号记录', icon: 'user', noCache: false }
    }
  ]
}

export default quueCallModule
