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
            <template v-if="item.id === 'update'">
              <el-button type="primary" size="medium" @click="save(scope.row)">保存</el-button>
              <el-button type="success" size="medium" @click="show(scope.row)">收款记录</el-button>
            </template>
            <el-input v-model="scope.row[item.id]" size="medium" v-if="item.type === 'input'" v-focus :placeholder="`请输入${item.label}`" />
            <el-date-picker v-model="scope.row[item.id]" v-else-if="item.type === 'date'" :placeholder="`请选择${item.label}`" type="date" />
            <div v-else>{{ scope.row[item.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" width="1200px">
      <z-table />
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin],
  components: {
    "z-table": () => import("./components/table")
  },
  data() {
    return {
      dialogVisible: false,
      arr: [{ label: "客户名称", model: "", placeholder: "", span: 5, type: "page", data: [], id: "customer_id" }],
      listQuery: {},
      tableHeader: [
        { label: "年份", id: "year" },
        { label: "总金额", id: "receipt_amount" },
        { label: "已收款", id: "receipted" },
        { label: "未收款", id: "unreceipted" },
        { label: "本次收款", id: "amount", type: "input" },
        { label: "收款日期", id: "received_date", type: "date" },
        { label: "收款银行", id: "receipt_bank", type: "input" },
        { label: "用途", id: "use_way", align: "right", type: "input" },
        { label: "备注", id: "note", align: "right", type: "input" },
        { label: "操作", id: "update", width: "220" }
      ],
      tableData: []
    };
  },
  watch: {
    data: {
      handler(val) {
        this.arr[0].data = val.normaler_customers;
        this.arr[0].model = val.normaler_customers[0].id;
        this.queryTabel();
      },
      immediate: true
    }
  },
  methods: {
    async queryTabel() {
      let res = await this.$post("bills/receipts", this.querySearch());
      this.tableData = res.orders;
    },
    async save(row) {
      if (!row.amount.trim()) {
        this.$message.error('收款不能为空！')
        return;
      }
      await this.$post("order_receipts/for_create", {
        order_receipt: {
          ...row,
          ...{
            received_date: moment(row.received_date).format("YYYY-MM--DD"),
            spending_type: 0,
            amount: parseFloat(row.amount)
          }
        }
      });
      this.$message.success("保存成功！");
      row.amount = '';
      row.receipt_bank = '';
      row.use_way = '';
      row.note = '';
    },
    show(row) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$bus.$emit("showDetail", row);
      });
    }
  },
  mounted() {}
};
</script>

<style></style>
