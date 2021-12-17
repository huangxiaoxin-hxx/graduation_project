<template>
  <view class="alice_dropdown">
    <view
			class="alice-dropdown-view"
			:class="[show ? 'alice-dropdownlist-show' : '']"
			:style="{ backgroundColor: backgroundColor, 
      maxHeight: show ? maxHeight + 'rpx' : 0, 
      top: top + 'rpx' }"
		>
			<slot></slot>
		</view>
  </view>
</template>

<script>
export default {
  name: 'AliceDropdown',
  props: {
    //控制显示
    show: {
      type: Boolean,
      default: false
    },
    //背景颜色
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    //top  rpx
    top: {
      type: Number,
      default: 0
    },
    //下拉框高度 rpx
    maxHeight: {
      type: Number,
      default: 0
    },
    //选择框高度 单位rpx
    selectHeight: {
      type: Number,
      default: 0
    },
  },
}
</script>

<style>
.alice_dropdown {
  position: relative;
}

.alice-dropdown-view {
  width: 100%;
	overflow: auto;
	position: absolute;
	z-index: -99;
	left: 0;
	opacity: 0;
	/* visibility: hidden; */
	transition: all 0.5s ease-in-out;
}

.alice-dropdownlist-show {
	opacity: 1;
	z-index: 996;
	/* visibility: visible; */
}
</style>