<template>
  <div class="box">
    <panel :arr="arr">
      <div class="ml-auto">
        <el-button type="primary" @click="queryTabel" class="mr-2">查询</el-button>
        <el-button type="primary" @click="dialogType = dialogVisible = true" class="mr-2">添加付款</el-button>
        <el-button type="success" @click="show" class="mr-2">付款记录</el-button>
      </div>
    </panel>
    <div class="pt-10 table">
      <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe show-summary>
        <el-table-column header-align="center" :align="item.align || 'center'" :label="item.label" :prop="item.id" :width="item.width" v-for="(item, index) in tableHeader" :key="item.label + index">
          <template slot-scope="scope">{{ scope.row[item.id] }} </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogType ?'添加付款': '付款记录'" :width="dialogType ? '700px': '1200px'" :visible.sync="dialogVisible">
      <editComponents @change="change" v-model="arr[0].model" v-show="dialogType"></editComponents>
      <z-table @change="change" v-model="arr[0].model" v-show="!dialogType"></z-table>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin],
  components: {
    editComponents: () => import("./components/index"),
    "z-table": () => import("./components/table")
  },
  data() {
    return {
      dialogType: true,
      dialogVisible: false,
      arr: [{ label: "采购商", model: "", placeholder: "", span: 5, type: "page", data: [], id: "customer_id" }],
      listQuery: {
        ascription: 1
      },
      tableHeader: [
        { label: "订单日期", id: "billing_date" },
        { label: "采购单号", id: "order_num" },
        { label: "采购商", id: "customer_name" },
        { label: "订单金额", id: "amount_total" },
        { label: "已付款", id: "payed_total", width: "230" },
        { label: "未付款", id: "unpay_total" }
      ],
      tableData: []
    };
  },
  watch: {
    data: {
      handler(val) {
        if (!val.supplier_customers) return;
        this.arr[0].data = val.supplier_customers;
        this.arr[0].model = val.supplier_customers[0].id;
        this.queryTabel();
      },
      immediate: true
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.dialogType = false;
      this.$nextTick(() => {
        this.$bus.$emit("show", this.arr[0].model);
      });
    },
    change(type) {
      this.dialogVisible = false;
      if (!type) return;
      this.queryTabel();
    },
    async queryTabel() {
      let res = await this.$post("bills/payments", this.querySearch());
      this.tableData = res.orders;
    }
  },
  mounted() {}
};
</script>

<style></style>
