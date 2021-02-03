<template>
  <div class="box">
    <panel :arr="arr">
      <div class="ml-auto">
        <el-button type="primary" @click="queryTabel" class="mr-2">查询</el-button>
      </div>
    </panel>
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe>
        <el-table-column header-align="center" :align="item.align || 'center'" :label="item.label" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">
            {{ scope.row[item.id] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :current-page.sync="listQuery.page" @current-change="queryTabel"></el-pagination>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      arr: [
        { label: "采购商", model: "", placeholder: "", span: 5, type: "page", data: [], id: "customer_id" },
        { label: "业务员", model: "", placeholder: "", span: 5, type: "page", data: [], id: "member_id" },
        { label: "开单时间", model: "", placeholder: "", span: 7, type: "daterange", id: "billing_date" },
        { label: "订单编号", model: "", placeholder: "", span: 5, id: "order_serial" }
      ],
      listQuery: {
        page: 1
      },
      tableHeader: [
        { label: "采购单编号", id: "order_num" },
        { label: "采购单时间", id: "billing_date", width: "100" },
        { label: "采购单", id: "customer_name", width: "230" },
        { label: "产品编号", id: "product_serial", width: "230" },
        { label: "产品名称", id: "order_serial", width: "230" },
        { label: "产品规格", id: "product_field" },
        { label: "到货时间", id: "completed_at", align: "right" },
        { label: "订单数量", id: "quantity", align: "right" },
        { label: "到货数量", id: "schedule_sum", align: "right" },
        { label: "单价", id: "product_price" },
        { label: "总价", id: "total_price" },
        { label: "备注", id: "note" }
      ],
      tableData: [],
      total: 0
    };
  },
  methods: {
    async queryTabel() {
      let res = await this.$post("bills/supplier", this.querySearch());
      this.tableData = res.orders;
      this.total = res.paginate_meta.total_count;
    }
  },
  watch: {
    data: {
      handler(val) {
        this.arr[0].data = val.supplier_customers;
        this.arr[1].data = val.members;
      },
      immediate: true
    }
  },
  mounted() {
    this.queryTabel();
  }
};
</script>

<style></style>
