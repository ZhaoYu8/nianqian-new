<template>
  <div class="box">
    <panel :arr="arr">
      <div class="ml-auto">
        <el-button type="primary" @click="queryTabel" class="mr-2">查询</el-button>
      </div>
    </panel>
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe show-summary>
        <el-table-column header-align="center" :align="item.align || 'center'" :label="item.label" :prop="item.id" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">
            {{ scope.row[item.id] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      arr: [{ label: "年份", model: "", placeholder: "", type: "select", data: [], id: "year" }],
      listQuery: {
        ascription: 1
      },
      tableHeader: [
        { label: "采购商", id: "customer_name" },
        { label: "订单金额", id: "payment_total" },
        { label: "已付款", id: "payment_out" },
        { label: "未付款", id: "unpay" }
      ],
      tableData: []
    };
  },
  methods: {
    async queryTabel() {
      let res = await this.$post("bills/payments_total", this.querySearch());
      this.tableData = res.orders.map((r) => {
        return {
          ...r,
          ...{
            payment_total: r.payment_total.toFixed(2),
            payment_out: r.payment_out.toFixed(2),
            unpay: r.unpay.toFixed(2)
          }
        };
      });
    }
  },
  watch: {
    data: {
      handler(val) {
        this.arr[0].data = val.years;
        this.arr[0].model = val.years[val.years.length - 1].id;
        this.queryTabel();
      },
      immediate: true
    }
  },
  mounted() {}
};
</script>

<style></style>
