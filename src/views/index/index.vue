<template>
  <div class="index">
    <menus class="menus" />
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import menus from "@/components/menu";
export default {
  components: { menus },
  async mounted() {
    let res = await this.$global.data.bind(this)();
    this.$store.commit("increment", res);
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  display: flex;
  .menus {
    flex-basis: 240px;
    flex-shrink: 0;
  }
  .main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
