<template>
  <div class="box">
    <panel :arr="arr">
      <div class="ml-auto">
        <el-button type="primary" @click="queryTabel" class="mr-2">查看</el-button>
        <el-button type="primary" @click="dialogVisible = true" class="mr-2">添加付款</el-button>
        <el-button type="primary" @click="queryTabel" class="mr-2">付款记录</el-button>
      </div>
    </panel>
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe show-summary>
        <el-table-column header-align="center" :align="item.align || 'center'" :label="item.label" :prop="item.id" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">{{ scope.row[item.id] }} </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="total, prev, pager, next, jumper" :page-size="10" :current-page.sync="listQuery.pageIndex"></el-pagination>
    <el-dialog title="添加付款" width="700px" :visible.sync="dialogVisible">
      <editComponents @change="dialogVisible = false"></editComponents>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    editComponents: () => import("./components/index")
  },
  data() {
    return {
      dialogVisible: false,
      arr: [{ label: "生产商", model: "", placeholder: "", span: 5, type: "page", data: [], id: "customer_id" }],
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        ascription: 2
      },
      tableHeader: [
        { label: "订单日期", id: "billing_date" },
        { label: "加工单号", id: "order_num" },
        { label: "生产商", id: "customer_name" },
        { label: "订单金额", id: "amount_total" },
        { label: "已付款", id: "payed_total", width: "230" },
        { label: "未付款", id: "unpay_total" }
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
