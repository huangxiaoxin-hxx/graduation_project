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
      <!-- hot questions -->
      <view class="hot_box mt40">
        <view class="title">热门提问</view>
        <view class="question_list" v-for="(item, index) in hotList" :key="index" @click="handleNavTo({url: `/pages/questions/questionList/questionDetail/index?id=${item._id}`})">
          <image :src="item.avatar" alt="avatar" mode="aspectFill" />
          <view class="question_list_content">
            <h6>{{item.title}}</h6>
            <p>{{item.content}}</p>
            <view class="hot_box">
              <view class="hot_box_item">
                <u-icon name="eye" color="#333" size="15" class="hot_box_item_icon"></u-icon>
                {{item.view_count}}
              </view>
              <view class="hot_box_item">
                <u-icon name="thumb-up" color="#333" size="15" class="hot_box_item_icon"></u-icon>
                {{item.like_count}}
              </view>
              <view class="hot_box_item">
                <u-icon name="chat" color="#333" size="15" class="hot_box_item_icon"></u-icon>
                {{item.comment_count}}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </AliceContainer>
</template>

<script>
import { getBanner } from '@/api/home'
import { getHotQuestionList } from '@/api/questions'
export default {
  name: 'home',
  data() {
    return {
      bannerData: [],
      hotList: []
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
    async getHot() {
      console.log("???")
      const res = await getHotQuestionList()
      this.hotList = res.data
    }
  },
  async onLoad() {
    this.bannerData = await getBanner()
  },
  onShow() {
    this.getHot()
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
  z-index: 999;
}
.home_container {
  width: 100%;
  padding: 40rpx 32rpx 0;
  box-sizing: border-box;
  .hot_box {
    width: 100%;
    .question_list {
      width: 100%;
      height: 250rpx;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      padding: 20rpx 0;
      box-sizing: border-box;
      display: flex;
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
      &_content {
        margin-left: 30rpx;
        h6 {
          font-size: 30rpx;
          width: 450rpx;
          overflow: hidden;
          text-overflow: ellipsis; //文本溢出显示省略号
          white-space: nowrap; //文本不会换行
          margin-bottom: 20rpx;
        }
        p {
          font-size: 26rpx;
          width: 450rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-bottom: 10rpx;
          height: 110rpx;
        }
        .hot_box {
          display: flex;
          align-items: center;
          justify-content: end;
          font-size: 24rpx;
          &_item {
            display: flex;
            align-items: center;
            margin-right: 20rpx;
            &_icon {
              margin-right: 10rpx;
            }
          }
        }
      }
    }
  }
  
}
</style>