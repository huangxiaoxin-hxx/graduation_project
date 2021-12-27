<template>
  <view class="comment_container">
    <view class="user_info">
      <image :src="data && data.userInfo.avatar" alt="avatar" mode="aspectFill">
      <view>
        <view class="user_name">{{data && (data.userInfo.nickname || data.userInfo.username)}}</view>
        <view class="create_time">{{data && data.comment_date | moment("YYYY-MM-DD HH:mm")}}</view>
      </view>
    </view>
    <p class="content">
      {{data.comment_content}}
    </p>
  </view>
</template>

<script>
export default {
  name: "comments",
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.comment_container {
  width: 100%;
  min-height: 100rpx;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  padding-bottom: 20rpx;
  .user_info {
    display: flex;
    box-sizing: border-box;
    padding: 20rpx 0;
    align-items: center;
    image {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .user_name {
      font-size: 26rpx;
      font-weight: 500;
    }
    .create_time {
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .content {
    font-size: 26rpx;
  }
}
</style>