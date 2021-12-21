<template>
  <view class="alice_container">
    <view class="top_status_bar"></view>
    <view class="container_header" v-if="showHeader" :style="style">
      <slot name="header">
      </slot>
    </view>
    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AliceContainer',
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    headerHeight: {
      type: String,
      default: '88rpx'
    },
  },
  computed: {
    style() {
      return {
        height: this.headerHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alice_container {
  width: 100%;
  .top_status_bar {
    width: 100%;
		height: var(--status-bar-height);
  }
}
  
</style>