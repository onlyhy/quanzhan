<!--
 * @Date: 2020-04-08 15:14:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-08 15:37:37
 -->
<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu1"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true }
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>