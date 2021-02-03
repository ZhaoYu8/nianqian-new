<template>
  <div class="box">
    <panel :arr="arr">
      <div class="ml-auto">
        <el-button type="primary" @click="queryTabel" class="mr-2">查询</el-button>
        <el-button type="primary" @click="dialogVisible = true" class="mr-2">下单</el-button>
      </div>
    </panel>
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe>
        <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
        <el-table-column header-align="center" :align="item.align || 'center'" :label="item.label" :prop="item.id" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">{{ scope.row[item.id] }} </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="total, prev, pager, next, jumper" :page-size="10" :current-page.sync="listQuery.page"></el-pagination>
    <el-dialog title="" :visible.sync="dialogVisible" width="1400px" top="30px">
      <edit />
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    edit: () => import("./components/index")
  },
  data() {
    return {
      dialogVisible: false,
      arr: [
        { label: "客户名称", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "下单时间", model: "", placeholder: "", span: 7, type: "daterange", id: "billing_date" },
        { label: "销售", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "负责人", model: "", placeholder: "", type: "page", data: [], id: "customer_id" },
        { label: "发货时间", model: "", placeholder: "", span: 7, type: "daterange", id: "billing_date" },
        { label: "关键字", model: "", placeholder: "", id: "customer_id" }
      ],
      listQuery: {
        page: 1,
        ascription: 1
      },
      tableHeader: [
        { label: "订单日期", id: "billing_date" },
        { label: "客户名称", id: "order_num" },
        { label: "订单产品", id: "customer_name" },
        { label: "订单金额", id: "amount_total" },
        { label: "生产单信息", id: "payed_total", width: "230" },
        { label: "备注", id: "unpay_total" },
        { label: "当前状态", id: "unpay_total" },
        { label: "更新时间", id: "unpay_total" },
        { label: "最后操作人", id: "unpay_total" }
      ],
      tableData: []
    };
  },
  methods: {
    async queryTabel() {
      let res = await this.$post("bills/payments", this.listQuery);
      this.tableData = res.orders;
    }
  },
  mounted() {
    this.queryTabel();
  }
};
</script>

<style></style>
