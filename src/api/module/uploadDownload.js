import request from '@/utils/request'

export const uploadDownloads = {
  createUploadDownload: function({ containerName, fileName, mimeType, hash, blobName, ownerUserId, active, id }) {
    return request({
      url: '/api/upload-download',
      method: 'post',
      params: { containerName, fileName, mimeType, hash, blobName, ownerUserId, active, id }
    })
  },
  getUploadDownloads: function({ skipCount, maxResultCount, sorting }) {
    return request({
      url: '/api/upload-download',
      method: 'get',
      params: { skipCount, maxResultCount, sorting }
    })
  },
  deleteUploadDownload: function(id) {
    return request({
      url: '/api/upload-download/' + id,
      method: 'delete'
    })
  },
  getUploadDownload: function(id) {
    return request({
      url: '/api/upload-download/' + id,
      method: 'get'
    })
  },
  updateUploadDownload: function(id, data) {
    return request({
      url: '/api/upload-download/' + id,
      params: data,
      method: 'put'
    })
  },
  getDownloadUrl: function(id) {
    return process.env.VUE_APP_BASE_API + 'api/upload-download/download/' + id
  },
  download: function(id) {
    window.location.href = this.getDownloadUrl(id)
  },
  upload: function(data) {
    return request({
      url: '/api/upload-download/upload',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
