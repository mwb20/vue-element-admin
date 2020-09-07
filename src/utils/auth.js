import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const TenantKey = 'Admin-Tenant'

export function getTenant() {
  const tenant = Cookies.get(TenantKey)
  if (tenant && tenant !== 'null') {
    return JSON.parse(tenant)
  }
  return { name: '未选择', id: null }
}

export function setTenant(tenant) {
  return Cookies.set(TenantKey, JSON.stringify(tenant))
}

export function removeTenant() {
  return Cookies.remove(TenantKey)
}
