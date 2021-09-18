<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>容器名：</label>{{ viewData.containerName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>文件名：</label>{{ viewData.fileName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>类型：</label>{{ viewData.mimeType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>Hash：</label>{{ viewData.hash }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>对象名：</label>{{ viewData.blobName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>所有者：</label>{{ viewData.ownerUserId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>是否启用：</label>
          <el-tag :type="viewData.isActive? 'success':'info'" effect="dark">
            {{ viewData.isActive?'启用':'禁用' }}
          </el-tag>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>上传用户：</label>{{ viewData.creatorId }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>上传时间：</label>{{ formatDate(viewData.creationTime) }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { uploadDownloads } from '@/api/module/uploadDownload'
import { parseTime } from '@/utils'

export default {
  name: 'UploadDownloadView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      uploadDownloads.getUploadDownload(id).then((response) => {
        loading.close()
        this.viewData = response
        // 显示dialog
        this.dialogVisible = true
      }).catch(() => {
        loading.close()
      })
    },
    show(id) {
      this.loadData(id)
    },
    formatDate(cellValue) {
      if (cellValue) {
        return parseTime(cellValue, '{y}-{m}-{d} {h}:{i}:{s}')
      }
      return null
    },
    formateYesOrNo(cellValue) {
      if (cellValue) {
        return '<span class="el-tag el-tag--success el-tag--medium el-tag--dark">是</span>'
      }
      return '<span class="el-tag el-tag--warning el-tag--medium el-tag--dark">否</span>'
    }
  }
}
</script>
