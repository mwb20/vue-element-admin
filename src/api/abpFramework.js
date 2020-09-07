import request from '@/utils/request'
export const abpApiDefinition = {
  getApiDefinition: function(includeTypes) {
    return request({
      url: '/api/abp/api-definition',
      method: 'get',
      params: { includeTypes }
    })
  }
}

export const abpApplicationConfiguration = {
  getApplicationConfiguration: function() {
    return request({
      url: '/api/abp/application-configuration',
      method: 'get'
    })
  }
}

export const abpTenant = {
  getAbpTenantByName: function(name) {
    return request({
      url: '/api/abp/multi-tenancy/tenants/by-name/' + name,
      method: 'get'
    })
  },
  getAbpTenantById: function(id) {
    return request({
      url: '/api/abp/multi-tenancy/tenants/by-id/' + id,
      method: 'get'
    })
  }
}

export const account = {
  createRegister: function({ userName, emailAddress, password, appName }) {
    return request({
      url: '/api/account/register',
      method: 'post',
      data: { userName, emailAddress, password, appName }
    })
  },
  createSendPasswordResetCode: function({ email, appName, returnUrl, returnUrlHash }) {
    return request({
      url: '/api/account/send-password-reset-code',
      method: 'post',
      data: { email, appName, returnUrl, returnUrlHash }
    })
  },
  createResetPassword: function({ userId, resetToken, password }) {
    return request({
      url: '/api/account/reset-password',
      method: 'post',
      data: { userId, resetToken, password }
    })
  }
}

export const features = {
  getFeatures: function({ providerName, providerKey }) {
    return request({
      url: '/api/feature-management/features',
      method: 'get',
      params: { providerName, providerKey }
    })
  },
  updateFeatures: function({ providerName, providerKey, features }) {
    return request({
      url: '/api/feature-management/features',
      method: 'put',
      params: { providerName, providerKey },
      data: { features }
    })
  }
}

export const permissions = {
  getPermissions: function({ providerName, providerKey }) {
    return request({
      url: '/api/permission-management/permissions',
      method: 'get',
      params: { providerName, providerKey }
    })
  },
  updatePermissions: function({ providerName, providerKey, permissions }) {
    return request({
      url: '/api/permission-management/permissions',
      method: 'put',
      params: { providerName, providerKey },
      data: { permissions }
    })
  }
}

export const profile = {
  getMyProfile: function() {
    return request({
      url: '/api/identity/my-profile',
      method: 'get'
    })
  },
  updateMyProfile: function({ userName, email, name, surname, phoneNumber, extraProperties }) {
    return request({
      url: '/api/identity/my-profile',
      method: 'put',
      data: { userName, email, name, surname, phoneNumber, extraProperties }
    })
  },
  changePassword: function({ currentPassword, newPassword }) {
    return request({
      url: '/api/identity/my-profile/change-password',
      method: 'post',
      data: { currentPassword, newPassword }
    })
  }
}

export const role = {
  getAll: function() {
    return request({
      url: '/api/identity/roles/all',
      method: 'get'
    })
  },
  getRoles: function({ sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/identity/roles',
      method: 'get',
      params: { sorting, skipCount, maxResultCount }
    })
  },
  createRole: function({ name, isDefault, isPublic, extraProperties }) {
    return request({
      url: '/api/identity/roles',
      method: 'post',
      data: { name, isDefault, isPublic, extraProperties }
    })
  },
  getRole: function(id) {
    return request({
      url: '/api/identity/roles/' + id,
      method: 'get'
    })
  },
  updateRole: function({ id, concurrencyStamp, name, isDefault, isPublic, extraProperties }) {
    return request({
      url: '/api/identity/roles/' + id,
      method: 'put',
      data: { concurrencyStamp, name, isDefault, isPublic, extraProperties }
    })
  },
  deleteRole: function(id) {
    return request({
      url: '/api/identity/roles/' + id,
      method: 'delete'
    })
  }
}

export const tenant = {
  getTenant: function(id) {
    return request({
      url: '/api/multi-tenancy/tenants/' + id,
      method: 'get'
    })
  },
  updateTenant: function({ id, name, extraProperties }) {
    return request({
      url: '/api/multi-tenancy/tenants/' + id,
      method: 'put',
      data: { name, extraProperties }
    })
  },
  deleteTenant: function(id) {
    return request({
      url: '/api/multi-tenancy/tenants/' + id,
      method: 'delete'
    })
  },
  getTenants: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/multi-tenancy/tenants',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  createTenant: function({ adminEmailAddress, adminPassword, name, extraProperties }) {
    return request({
      url: '/api/multi-tenancy/tenants',
      method: 'post',
      data: { adminEmailAddress, adminPassword, name, extraProperties }
    })
  },
  getDefaultConnectionString: function(id) {
    return request({
      url: '/api/multi-tenancy/tenants/' + id + '/default-connection-string',
      method: 'get'
    })
  },
  updateDefaultConnectionString: function({ id, defaultConnectionString }) {
    return request({
      url: '/api/multi-tenancy/tenants/' + id + '/default-connection-string',
      method: 'put',
      params: { defaultConnectionString }
    })
  },
  deleteDefaultConnectionString: function(id) {
    return request({
      url: '/api/multi-tenancy/tenants/' + id + '/default-connection-string',
      method: 'delete'
    })
  }
}

export const user = {
  getUser: function(id) {
    return request({
      url: '/api/identity/users/' + id,
      method: 'get'
    })
  },
  updateUser: function({ id, password, concurrencyStamp, userName, name, surname, email, phoneNumber, twoFactorEnabled, lockoutEnabled, roleNames, extraProperties }) {
    return request({
      url: '/api/identity/users/' + id,
      method: 'put',
      data: { password, concurrencyStamp, userName, name, surname, email, phoneNumber, twoFactorEnabled, lockoutEnabled, roleNames, extraProperties }
    })
  },
  deleteUser: function(id) {
    return request({
      url: '/api/identity/users/' + id,
      method: 'delete'
    })
  },
  getUsers: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/identity/users',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  createUser: function({ password, userName, name, surname, email, phoneNumber, twoFactorEnabled, lockoutEnabled, roleNames, extraProperties }) {
    return request({
      url: '/api/identity/users',
      method: 'post',
      data: { password, userName, name, surname, email, phoneNumber, twoFactorEnabled, lockoutEnabled, roleNames, extraProperties }
    })
  },
  getRole: function(id) {
    return request({
      url: '/api/identity/users/' + id + '/roles',
      method: 'get'
    })
  },
  updateRole: function({ id, roleNames }) {
    return request({
      url: '/api/identity/users/' + id + '/roles',
      method: 'put',
      data: { roleNames }
    })
  },
  getAssignableRoles: function() {
    return request({
      url: '/api/identity/users/assignable-roles',
      method: 'get'
    })
  },
  getUserByUsername: function(username) {
    return request({
      url: '/api/identity/users/by-username/' + username,
      method: 'get',
      params: { username }
    })
  },
  getUserByEmail: function(email) {
    return request({
      url: '/api/identity/users/by-email/' + email,
      method: 'get'
    })
  }
}

export const userLookup = {
  getLookup: function(id) {
    return request({
      url: '/api/identity/users/lookup/' + id,
      method: 'get'
    })
  },
  getUserLookupByUsername: function(userName) {
    return request({
      url: '/api/identity/users/lookup/by-username/' + userName,
      method: 'get'
    })
  },
  getSearch: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/identity/users/lookup/search',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  getCount: function(filter) {
    return request({
      url: '/api/identity/users/lookup/count',
      method: 'get',
      params: { filter }
    })
  }
}
