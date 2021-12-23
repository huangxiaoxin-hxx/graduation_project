<template>
  <AliceContainer>
    <AliceHeader slot="header">我的信息</AliceHeader>
    <view class="userInfo_container">
      <view class="userInfo_list" @click="changeAvatar">
        <view class="userInfo_list_title">头像</view>
        <image :src="avatarUrl" alt="avatar" class="avatar" mode="aspectFill" />
        <u-icon name="arrow-right" size="14" color="#333"></u-icon>
      </view>
      <view class="userInfo_list" v-for="(item, index) in list" :key="index" @click="clickList(item)">
        <view class="userInfo_list_title">{{item.title}}</view>
        <view class="userInfo_list_value">{{ (userInfo && userInfo[item.value]) || '去设置'}}</view>
        <u-icon name="arrow-right" size="14" color="#333" v-if="item.icon"></u-icon>
      </view>
    </view>
  </AliceContainer>
</template>

<script>
import { mapState } from 'vuex'
import { setAvatar } from '@/api/user'
export default {
  name: "userInfo",
  data() {
    return {
      list: [
        {
          title: "用户名",
          value: "username",
          icon: false, // 用来判断是否展示>图标，以及是否能有点击事件
        },
        {
          title: "昵称",
          value: "nickname",
          icon: true,
          url: "/pages/my/userInfo/setNickname/index"
        },
        {
          title: "身份",
          value: "role",
          icon: false,
        },
        {
          title: "性别",
          value: "gender",
          icon: true,
          url: "/pages/my/userInfo/setGender/index"
        }
      ]
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
  },
  methods: {
    async changeAvatar() {
      this.handleLoading({title: '上传中'})
      try {
        const chooseImg = await uni.chooseImage({
          count:1,
          sourceType: ['album', 'camera']
        });
        const image = await uniCloud.uploadFile({
          filePath: chooseImg[1].tempFilePaths[0],
          cloudPath: Date.now() + '.jpg'
        })
        await setAvatar({avatar: image.fileID})
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
    },
    clickList(item) {
      if(!item.icon) {
        return
      }
      this.handleNavTo({url: item.url})
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo_container {
  width: 100%;
  background-color: #fff;
  padding: 20rpx 32rpx 0;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  .userInfo_list {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15rpx 0;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    min-height: 60rpx;
    &:last-child {
      border-bottom: none;
    }
    &_title {
      font-size: 28rpx;
      color: #333;
      flex: 1;
      font-weight: 500;
    }
    &_value {
      font-size: 28rpx;
      color: #333;
    }
    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 20rpx;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      margin-right: 10rpx;
    }
  }
}
</style>