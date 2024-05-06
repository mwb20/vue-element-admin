<template>
  <el-dialog title="详情" :visible.sync="dialogVisible">
    <el-row class="el-form-item--medium">
      <el-col :span="12">
        <div class="details-content"><label>医保目录编码：</label>{{ viewData.hilistCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>医保目录名称：</label>{{ viewData.hilistName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>目录更新时间：</label>{{ viewData.updtTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>大类编码：</label>{{ viewData.medChrgitmType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>统计类型：</label>{{ viewData.chrgitmLv }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>拼音助记码：</label>{{ viewData.pinyin }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>五笔助记码：</label>{{ viewData.wubi }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>规 格：</label>{{ viewData.spec }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>剂型名称：</label>{{ viewData.dosformName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>备注：</label>{{ viewData.memo }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>生产企业代码：</label>{{ viewData.prodentpCode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>生产厂家：</label>{{ viewData.prodentpName }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>生产地：</label>{{ viewData.manuNatRegn }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>商品名：</label>{{ viewData.drugProdname }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>批准文号：</label>{{ viewData.aprvno }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>项目内涵：</label>{{ viewData.trtItemCont }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>除外内容：</label>{{ viewData.trtExctCont }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>限制使用说明：</label>{{ viewData.lmtUsescp }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>生育项目标志：</label>{{ viewData.matn_used_flag }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>创建时间：</label>{{ viewData.crteTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>目录启用时间：</label>{{ viewData.begnDate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>目录停用时间：</label>{{ viewData.endDate }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>国家目录类别：</label>{{ viewData.listType }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>注册规格：</label>{{ viewData.regSpec }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>最小包装数量：</label>{{ viewData.minPacCnt }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>最小包装单位：</label>{{ viewData.minPacunt }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>通用名编号：</label>{{ viewData.gennameCodg }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>目录剂型：</label>{{ viewData.drugDosform }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>本位码：</label>{{ viewData.drugstdcode }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>是否民族药：</label>{{ viewData.isEthdrug }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>下载时间：</label>{{ viewData.creationTime }}</div>
      </el-col>
      <el-col :span="12">
        <div class="details-content"><label>最后更新时间：</label>{{ viewData.lastModificationTime }}</div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { catalogBaseInfo } from '@/api/module/easyCHS'
export default {
  name: 'AppCatalogBaseInfosView',
  data() {
    return {
      dialogVisible: false,
      viewData: { }
    }
  },
  methods: {
    loadData(id) {
      const loading = this.$loading()
      catalogBaseInfo.getCatalogBaseInfo(id).then((response) => {
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
    }
  }
}
</script>
