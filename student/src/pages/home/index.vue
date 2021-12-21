<template>
  <AliceContainer>
    <view class="home_header" slot="header">首页</view>
    <view class="home_container">
      <!-- banner -->
      <u-swiper
        :list="bannerList"
        keyName="image"
        showTitle
        :autoplay="false"
        circular
      ></u-swiper>
    </view>
  </AliceContainer>
</template>

<script>
import { getBanner } from '@/api/home'
export default {
  name: 'home',
  data() {
    return {
      bannerData: []
    }
  },
  computed: {
    bannerList() {
      const list = []
      this.bannerData.forEach(item => {
        list.push({
          image: item.bannerfile,
          title: item.title
        })
      });
      return list
    }
  },
  methods: {
    
  },
  async onLoad() {
    this.bannerData = await getBanner()
  }
}
</script>

<style lang="scss" scoped>
.home_header {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  position: fixed;
  background-color: #8daabd;
  color: #fff;
}
.home_container {
  width: 100%;
  padding: 40rpx 32rpx 0;
  box-sizing: border-box;
}
</style>