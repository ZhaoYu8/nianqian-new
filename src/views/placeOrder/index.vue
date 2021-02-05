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
        { label: "订单信息", path: "orderInfo" },
        { label: "采购单信息", path: "paymentsInfo" },
        { label: "加工单信息", path: "produceOrder" }
      ],
      val: ""
    };
  },
  watch: {
    $route: {
      handler(val) {
        this.val = this.arr.findIndex((r) => r.path === this.$route.name) + "";
      },
      immediate: true
    }
  },
  methods: {
    change() {
      this.$router.push({ name: this.arr[this.val].path });
    }
  },
  mounted() {
    this.val = this.arr.findIndex((r) => r.path === this.$route.name) + "";
  }
};
</script>
<style></style>
