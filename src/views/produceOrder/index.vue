<template>
  <div class="box">
    <el-progress
      v-show="showProgress"
      :text-inside="true"
      :stroke-width="15"
      :percentage="progress"
    ></el-progress>
    <panel :arr="arr" @change="change">
      <div class="ml-auto">
        <el-button type="primary" @click="queryTabel" class="mr-2"
          >查询</el-button
        >
        <el-button type="primary" @click="addInfo" class="mr-2">下单</el-button>
      </div>
    </panel>
    <div class="pt-10 table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        ref="firstTable"
        stripe
      >
        <el-table-column type="index" width="80" label="序号" align="center">
        </el-table-column>
        <el-table-column
          header-align="center"
          :align="item.align || 'center'"
          :label="item.label"
          :prop="item.id"
          :width="item.width"
          v-for="(item, index) in tableHeader"
          :key="item.label + index"
        >
          <template slot-scope="scope">
            <template v-if="item.id === 'update'">
              <el-button
                type="primary"
                size="mini"
                @click="palyDetail(scope.row)"
                >详情</el-button
              >
              <el-button type="success" size="mini" @click="edit(scope.row)"
                >修改</el-button
              >
            </template>
            <template v-else-if="item.id === 'produce_info'">
              <el-button type="text" @click="palyDetail(scope.row)">{{
                scope.row.produce_info
              }}</el-button>
            </template>
            <template v-else-if="item.id === 'related_order_num'">
              <el-button type="text" @click="palyDetails(scope.row)">{{
                scope.row.related_order_num
              }}</el-button>
            </template>
            <template v-else>{{ scope.row[item.id] }}</template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      page-size="20"
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      :current-page.sync="listQuery.page"
      @current-change="queryTabel"
    ></el-pagination>
    <el-dialog
      title="下单"
      :visible.sync="dialogVisible"
      width="1400px"
      top="30px"
    >
      <edit @cancel="cancel" />
    </el-dialog>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin],
  components: {
    edit: () => import("./components/index"),
  },
  data() {
    return {
      dialogVisible: false,
      arr: [
        {
          label: "加工商",
          model: "",
          placeholder: "",
          type: "page",
          data: [],
          id: "customer_id",
        },
        {
          label: "负责人",
          model: "",
          placeholder: "",
          type: "page",
          data: [],
          id: "member_id",
        },
        {
          label: "销售",
          model: "",
          placeholder: "",
          type: "page",
          data: [],
          id: "saler_id",
        },
        {
          label: "相关业务单：",
          model: "",
          placeholder: "",
          type: "page",
          data: [],
          id: "order_id",
        },
        {
          label: "下单时间",
          model: "",
          placeholder: "",
          span: 7,
          type: "daterange",
          id: "billing_date",
        },
        {
          label: "发货时间",
          model: "",
          placeholder: "",
          span: 7,
          type: "daterange",
          id: "delivery_date",
        },
        { label: "关键字", model: "", placeholder: "", id: "query_key" },
      ],
      listQuery: {
        ascription_type: 2,
        page: 1,
      },
      tableHeader: [
        { label: "加工单编号", id: "produce_info", width: 240 },
        // { label: "下单日期", id: "billing_date" },
        { label: "加工名称", id: "customer_name" },
        { label: "加工单产品", id: "product_name" },
        { label: "加工单金额", id: "total_amount" },
        { label: "关联订单", id: "related_order_num", width: "240" },
        // { label: "生产单信息", id: "produce_info" },
        { label: "备注", id: "note" },
        { label: "当前状态", id: "current_info" },
        { label: "更新时间", id: "updated_at" },
        // { label: "最后操作人", id: "updated_by" },
        { label: "操作", id: "update" },
      ],
      tableData: [],
      total: 0,
    };
  },
  methods: {
    async queryTabel() {
      let res = await this.$post("orders/list", this.querySearch());
      this.tableData = res.orders;
      this.total = res.paginate_meta.total_count;
    },
    cancel(type) {
      this.dialogVisible = false;
      if (type) this.queryTabel();
    },
    async change(val) {
      if (val.id === "customer_id") {
        if (!val.model) {
          this.arr[1].data = [];
          this.arr[1].model = "";
          return;
        }
        let res = await this.$post("common/contacts", {
          customer_id: val.model,
        });
        this.arr[1].data = res.contacts;
      }
    },
    async edit(val) {
      let res = await this.$post("orders/for_edit", {
        id: val.id,
      });
      console.log(res);
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$bus.$emit("updateInfo", res.order);
      });
    },
    addInfo() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$bus.$emit("updateInfo", {});
      });
    },
    palyDetail(row) {
      window.open(`http://gdw.tengdabs.cn/${row.detail_url}`);
    },
    palyDetails(row) {
      window.open(`http://gdw.tengdabs.cn/${row.related_detail_url}`);
    },
  },
  watch: {
    data: {
      handler(val) {
        if (!val.producer_customers) return;
        this.arr[0].data = val.producer_customers;
        this.arr[2].data = val.members;
      },
      immediate: true,
    },
    orders: {
      handler(val) {
        if (!val) return;
        this.arr[3].data = val;
      },
      immediate: true,
    },
    $route: {
      handler(val) {
        if (val.name !== "produceOrder") return;
        this.arr[3].model = val.query.id ? Number(val.query.id) : undefined;
        this.queryTabel();
      },
      immediate: true,
    },
  },
  mounted() {
    this.initOptions();
  },
};
</script>

<style></style>
