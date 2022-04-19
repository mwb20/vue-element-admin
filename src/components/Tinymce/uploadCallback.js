import { uploadDownloads } from '@/api/module/uploadDownload'

export default function filePickerCallback(callback, value, meta) {
  const input = document.createElement('input')// 创建一个隐藏的input
  input.setAttribute('type', 'file')
  if (meta.filetype === 'image') {
    input.setAttribute('accept', 'image/*')
  } else if (meta.filetype === 'media') {
    input.setAttribute('accept', 'video/*')
  }
  input.onchange = function() {
    const file = this.files[0]// 选取第一个文件
    const formData = new FormData()
    formData.append('Content', file, file.name)
    formData.append('FileType', file.type)
    formData.append('FileName', file.name)
    uploadDownloads.upload(formData).then((res) => {
      callback(process.env.VUE_APP_BASE_API + res.url, { title: file.name })
    })
  }
  // 触发点击
  input.click()
}
