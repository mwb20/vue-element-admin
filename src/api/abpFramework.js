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
  getApplicationConfiguration: function(includeLocalizationResources) {
    return request({
      url: '/api/abp/application-configuration',
      method: 'get',
      params: { includeLocalizationResources }
    })
  }
}

export const abpApplicationLocalization = {
  getApplicationLocalizations: function({ cultureName, onlyDynamics }) {
    return request({
      url: '/api/abp/application-localization',
      method: 'get',
      params: { cultureName, onlyDynamics }
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
  createRegister: function({ userName, emailAddress, password, appName, extraProperties }) {
    return request({
      url: '/api/account/register',
      method: 'post',
      data: { userName, emailAddress, password, appName, extraProperties }
    })
  },
  createSendPasswordResetCode: function({ email, appName, returnUrl, returnUrlHash }) {
    return request({
      url: '/api/account/send-password-reset-code',
      method: 'post',
      data: { email, appName, returnUrl, returnUrlHash }
    })
  },
  createVerifyPasswordResetToken: function({ userId, resetToken }) {
    return request({
      url: '/api/account/verify-password-reset-token',
      method: 'post',
      data: { userId, resetToken }
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

export const dynamicClaims = {
  createRefresh: function() {
    return request({
      url: '/api/account/dynamic-claims/refresh',
      method: 'post'
    })
  }
}

export const emailSettings = {
  getEmailing: function() {
    return request({
      url: '/api/setting-management/emailing',
      method: 'get'
    })
  },
  createEmailing: function({ smtpHost, smtpPort, smtpUserName, smtpPassword, smtpDomain, smtpEnableSsl, smtpUseDefaultCredentials, defaultFromAddress, defaultFromDisplayName }) {
    return request({
      url: '/api/setting-management/emailing',
      method: 'post',
      data: { smtpHost, smtpPort, smtpUserName, smtpPassword, smtpDomain, smtpEnableSsl, smtpUseDefaultCredentials, defaultFromAddress, defaultFromDisplayName }
    })
  },
  createSendTestEmail: function({ senderEmailAddress, targetEmailAddress, subject, body }) {
    return request({
      url: '/api/setting-management/emailing/send-test-email',
      method: 'post',
      data: { senderEmailAddress, targetEmailAddress, subject, body }
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
  },
  deleteFeatures: function({ providerName, providerKey }) {
    return request({
      url: '/api/feature-management/features',
      method: 'delete',
      params: { providerName, providerKey }
    })
  }
}

export const login = {
  login: function({ userNameOrEmailAddress, password, rememberMe }) {
    return request({
      url: '/api/account/login',
      method: 'post',
      data: { userNameOrEmailAddress, password, rememberMe }
    })
  },
  logout: function() {
    return request({
      url: '/api/account/logout',
      method: 'get'
    })
  },
  checkPassword: function({ userNameOrEmailAddress, password, rememberMe }) {
    return request({
      url: '/api/account/check-password',
      method: 'post',
      data: { userNameOrEmailAddress, password, rememberMe }
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
      url: '/api/account/my-profile',
      method: 'get'
    })
  },
  updateMyProfile: function({ userName, email, name, surname, phoneNumber, concurrencyStamp, extraProperties }) {
    return request({
      url: '/api/account/my-profile',
      method: 'put',
      data: { userName, email, name, surname, phoneNumber, concurrencyStamp, extraProperties }
    })
  },
  changePassword: function({ currentPassword, newPassword }) {
    return request({
      url: '/api/account/my-profile/change-password',
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
  getRoles: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/identity/roles',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
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
  updateRole: function({ id, name, isDefault, isPublic, concurrencyStamp, extraProperties }) {
    return request({
      url: '/api/identity/roles/' + id,
      method: 'put',
      data: { name, isDefault, isPublic, concurrencyStamp, extraProperties }
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
  updateTenant: function({ id, name, concurrencyStamp, extraProperties }) {
    return request({
      url: '/api/multi-tenancy/tenants/' + id,
      method: 'put',
      data: { name, concurrencyStamp, extraProperties }
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
  createTenant: function({ name, adminEmailAddress, adminPassword, extraProperties }) {
    return request({
      url: '/api/multi-tenancy/tenants',
      method: 'post',
      data: { name, adminEmailAddress, adminPassword, extraProperties }
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

export const timeZoneSettings = {
  getTimezone: function() {
    return request({
      url: '/api/setting-management/timezone',
      method: 'get'
    })
  },
  createTimezone: function(timezone) {
    return request({
      url: '/api/setting-management/timezone',
      method: 'post',
      params: { timezone }
    })
  },
  getTimezones: function() {
    return request({
      url: '/api/setting-management/timezone/timezones',
      method: 'get'
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
  updateUser: function({ id, userName, name, surname, email, phoneNumber, isActive, lockoutEnabled, roleNames, password, concurrencyStamp, extraProperties }) {
    return request({
      url: '/api/identity/users/' + id,
      method: 'put',
      data: { userName, name, surname, email, phoneNumber, isActive, lockoutEnabled, roleNames, password, concurrencyStamp, extraProperties }
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
  createUser: function({ userName, name, surname, email, phoneNumber, isActive, lockoutEnabled, roleNames, password, extraProperties }) {
    return request({
      url: '/api/identity/users',
      method: 'post',
      data: { userName, name, surname, email, phoneNumber, isActive, lockoutEnabled, roleNames, password, extraProperties }
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
  getUserByUsername: function(userName) {
    return request({
      url: '/api/identity/users/by-username/' + userName,
      method: 'get'
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
