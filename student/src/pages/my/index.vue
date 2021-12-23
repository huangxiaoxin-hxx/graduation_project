<template>
  <AliceContainer>
    <view class="my_header" slot="header">我的</view>
    <view class="my_container">
      <view class="user_info" @click="handleNavTo({url: '/pages/my/userInfo/index'})">
        <image :src="avatarUrl" alt="avatar" class="avatar" mode="aspectFill" />
        <view class="user_box">
          <view class="nick_name">{{nickName}}</view>
          <view class="user_name">用户名：{{userInfo.username}}</view>
          <view class="gender_identity">
            <view class="gender">性别: {{ gender }}</view>
          </view>
        </view>
        <u-icon name="arrow-right" size="24" color="#333"></u-icon>
      </view>
    </view>
  </AliceContainer>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'my',
  methods: {

  },
  computed: {
    ...mapState('user', ['userInfo']),
    avatarUrl() {
      if(this.userInfo && this.userInfo.avatar) {
        return this.userInfo.avatar
      }
      return '/static/tabbar/my.png'
    },
    nickName() {
      if(this.userInfo && this.userInfo.nickname) {
        return this.userInfo.nickname
      }
      return '请设置昵称'
    },
    gender() {
      if(this.userInfo && this.userInfo.gender) {
        return this.userInfo.gender
      }
      return '保密'
    }
  },
  async onLoad() {
    await getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.my_header {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  position: fixed;
  background-color: #8daabd;
  color: #fff;
  z-index: 999;
}
.my_container {
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  .user_info {
    width: 100%;
    height: 200rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    .avatar {
      width: 140rpx;
      height: 140rpx;
      border-radius: 20rpx;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      margin-right: 40rpx;
    }
    .user_box {
      flex: 1;
      .nick_name {
        width: 400rpx;
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 10rpx;
      }
      .user_name {
        width: 400rpx;
        font-size: 26rpx;
        margin-bottom: 10rpx;
      }
      .gender_identity {
        display: flex;
        .gender {
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>