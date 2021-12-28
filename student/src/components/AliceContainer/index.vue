<template>
  <view class="alice_container" v-if="isShow">
    <view class="top_status_bar"></view>
    <view class="container_header" v-if="showHeader" :style="style">
      <slot name="header">
      </slot>
    </view>
    <view class="content">
      <slot></slot>
    </view>
  </view>
  <view class="loading" v-else>
    <view class="loading_icon">
      <loading />
    </view>
  </view>
</template>

<script>
import loading from '../w-loading/loading18.vue'
export default {
  components: {
    loading
  },
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
    isShow: {
      type: Boolean,
      default: true
    }
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
.loading {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  .loading_icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
  
</style>