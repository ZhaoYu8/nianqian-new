<template>
  <div class="index">
    <menus class="menus" />
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import menus from "@/components/menu";
export default {
  components: { menus }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  display: flex;
  .menus {
    flex-basis: 240px;
  }
  .main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
