<template>
  <el-tabs type="border-card" @tab-click="change" v-model="val" class="h-100">
    <el-tab-pane :key="index" :label="item.label" v-for="(item, index) in arr"></el-tab-pane>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      arr: [
        { label: "账单", path: "bill" },
        { label: "供应商账单", path: "supplier" },
        { label: "生产商账单", path: "produce" },
        { label: "收款单", path: "receipts" },
        { label: "采购商付款单", path: "payments" },
        { label: "生产商付款单", path: "producePayments" },
        { label: "采购商付款统计", path: "payments_total" },
        { label: "生产商付款统计", path: "payments_total_2" }
      ],
      val: ""
    };
  },
  methods: {
    change() {
      this.$router.push({ name: this.arr[this.val].path });
    }
  }
};
</script>
<style></style>
