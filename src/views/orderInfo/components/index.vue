<template>
  <div>
    <panel :arr="arr"> </panel>

    <div class="d-flex justify-content-between mt-2 mb-2">
      <el-button type="primary" size="large" @click="changeDialog">选择出库产品</el-button>
      <div>
        <el-button size="large" @click="cancel(1)">取消</el-button>
        <el-button type="primary" size="large" @click="save">保存</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe>
      <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>

      <el-table-column header-align="center" :align="item.align || 'center'" :label="item.label" :prop="item.id" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
        <template slot-scope="scope" v-if="item.id === 'update'">
          <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="del(scope.$index)" class="mr-3"></el-button>
        </template>
        <template slot-scope="scope" v-else>{{ scope.row[item.id] }} </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="d-flex justify-content-end mt-2">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
    <addProduct :dialogVisibl="dialogShow" @cancel="dialogShow = false" @save="dialogSave" />
  </div>
</template>

<script>
export default {
  components: {
    addProduct: () => import("./addProduct")
  },
  data() {
    return {
      dialogShow: false,
      arr: [
        { label: "下单客户", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "下单时间", model: "", placeholder: "", type: "date", id: "billing_date" },
        { label: "订单编号", model: "", placeholder: "", id: "billing_date" },
        { label: "币种", model: "", placeholder: "", type: "select", data: [], id: "customer_id" },
        { label: "联系人", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "收货地址", model: "", placeholder: "", id: "customer_id" },
        { label: "付款方式", model: "", placeholder: "", type: "select", data: [], id: "customer_id" },
        { label: "进度模板", model: "", placeholder: "", type: "select", data: [], id: "customer_id" },
        { label: "销售", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "负责人", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "服务条款", model: "", placeholder: "", type: "textarea", span: 24, id: "customer_id" },
        { label: "备注说明", model: "", placeholder: "", type: "textarea", span: 24, id: "customer_id" }
      ],
      tableHeader: [
        { label: "产品编号", id: "billing_date" },
        { label: "产品名称", id: "order_num" },
        { label: "产品类型", id: "customer_name" },
        { label: "产品规格", id: "amount_total" },
        { label: "产品单价", id: "payed_total", width: "230" },
        { label: "产品数量", id: "unpay_total" },
        { label: "单位", id: "unpay_total" },
        { label: "是否含税", id: "unpay_total" },
        { label: "产品图片", id: "a" },
        { label: "备注", id: "c" },
        { label: "操作", id: "update" }
      ],
      tableData: []
    };
  },
  methods: {
    // 选择出库产品得出的数据
    dialogSave(val) {
      this.tableData = this.tableData.concat(val);
    },
    changeDialog() {
      this.dialogShow = true;
      this.$bus.$emit('AddOutDepot', this.arr[0].model);
    },
  },
  mounted() {}
};
</script>

<style></style>
