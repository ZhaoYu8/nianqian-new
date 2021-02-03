<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe>
      <el-table-column header-align="center" :align="item.align || 'center'" :label="item.label" :prop="item.id" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
        <template slot-scope="scope">{{ scope.row[item.id] }} </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeader: [
        { label: "年份", id: "year" },
        { label: "客户名称", id: "customer_name" },
        { label: "金额", id: "amount" },
        { label: "付款时间", id: "received_date" },
        { label: "银行账号", id: "receipt_bank" },
        { label: "备注", id: "note" }
      ],
      tableData: []
    };
  },
  methods: {
    async query(id) {
      let res = await this.$post("order_receipts/list", {
        customer_id: id,
        spending_type: 1
      });
      this.tableData = res.orders;
    }
  },
  mounted() {
    this.$bus.$on("show", (val) => {
      this.query(val);
    });
  }
};
</script>

<style></style>
