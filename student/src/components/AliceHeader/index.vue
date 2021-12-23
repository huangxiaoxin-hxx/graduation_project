<template>
  <view class="alice-header" :style="style">
    <u-icon @click="handleNavBack" name="arrow-left" size="18" :color="fontColor" class="back"></u-icon>
    <view class="title">
      <slot></slot>
    </view>
    <view class="right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: "#8daabd"
    },
    fontColor: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    style() {
      return {
        backgroundColor: this.bgColor,
        color: this.fontColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alice-header {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  position: fixed;
  background-color: #8daabd;
  color: #fff;
  z-index: 999;
  display: flex;
  font-size: 32rpx;
  align-items: center;
  .back {
    position: absolute;
    left: 10rpx;
  }
  .title {
    width: 100%;
    text-align: center;
  }
  .right {
    position: absolute;
    right: 10rpx;
  }
}
</style>