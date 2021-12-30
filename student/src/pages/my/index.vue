<template>
  <AliceContainer>
    <view class="my_header" slot="header">我的</view>
    <view class="my_container">
      <view class="user_info" @click="handleNavTo({url: '/pages/my/userInfo/index'})">
        <image :src="avatarUrl" alt="avatar" class="avatar" mode="aspectFill" />
        <view class="user_box">
          <view class="nick_name">{{nickName}}</view>
          <view class="user_name">用户名：{{ userInfo && userInfo.username}}</view>
          <view class="gender_identity">
            <view class="gender">性别: {{ gender.text || '未设置' }}</view>
          </view>
        </view>
        <u-icon name="arrow-right" size="24" color="#333"></u-icon>
      </view>
      <view class="my_center">
        <view class="list" v-for="(item, index) in list" :key="index" @click="handleNavTo({url: item.url})">
          <u-icon :name="item.icon" color="#333" size="22"></u-icon>
          <p>{{item.title}}</p>
          <u-icon name="arrow-right" color="#333" size="22"></u-icon>
        </view>
      </view>
      <button @click="loginOut" class="login_out">退出登录</button>
    </view>
  </AliceContainer>
</template>

<script>
const list = [
  {
    icon: 'file-text',
    title: "我的提问",
    url: '/pages/my/myQuestion/index'
  },
  {
    icon: 'star',
    title: "我的收藏",
    url: '/pages/my/myCollect/index'
  }
]
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
import { removeStorage } from '@/utils'
export default {
  name: 'my',
  data() {
    return {
      list: list
    }
  },
  methods: {
    loginOut() {
      removeStorage('token')
      this.handleNavTo({
        url: '/pages/login/index',
        type: "reLaunch"
      })
    }
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
    margin-bottom: 20rpx;
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
  .my_center {
    width: 100%;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    .list {
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      height: 80rpx;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      &:last-child {
        border-bottom: none;
      }
      p {
        flex: 1;
        margin-left: 20rpx;
        font-size: 28rpx;
      }
    }
  }
  .login_out {
    position: fixed;
    bottom: 120rpx;
    width: 400rpx;
    left: 50%;
    transform: translate(-50%);
    background-color: #e57470;
    color: #fff;
    height: 80rpx;
    border: none;
    padding: 0;
    line-height: 80rpx;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
}
</style>