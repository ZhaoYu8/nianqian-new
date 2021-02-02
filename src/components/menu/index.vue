<template>
  <el-menu default-active="order" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" router>
    <el-menu-item index="order">
      <i class="el-icon-s-order"></i>
      <span slot="title">账单功能</span>
    </el-menu-item>
    <el-menu-item index="me">
      <i class="el-icon-menu"></i>
      <span slot="title">2</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    menuClick(val) {
      this.$router.push({ name: val.key === "1" ? "order" : "me", params: { userId: 123 } });
    }
  }
};
</script>
