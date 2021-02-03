<template>
  <el-menu :default-active="active" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" router>
    <el-menu-item index="order">
      <i class="el-icon-s-order"></i>
      <span slot="title">账单功能</span>
    </el-menu-item>
    <el-menu-item index="placeOrder">
      <i class="el-icon-menu"></i>
      <span slot="title">下单</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      active: ''
    };
  },
  methods: {
    menuClick(val) {
      this.$router.push({ name: val.key === "1" ? "order" : "placeOrder", params: { userId: 123 } });
    }
  },
  mounted() {
    this.active = this.$route.matched[1].name;
  }
};
</script>
