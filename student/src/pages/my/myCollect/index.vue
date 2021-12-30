<template>
  <AliceContainer :isShow="isShow">
    <AliceHeader slot="header" bgColor="#ffffff" fontColor="#333">我的收藏</AliceHeader>

    <view class="list_container">
      <block v-if="questionList.length">
        <scroll-view
        scroll-y="true" 
        class="scroll-Y"
        >
          <view class="question_list" v-for="(item, index) in questionList" :key="index" @click="handleNavTo({url: `/pages/questions/questionList/questionDetail/index?id=${item.article_id[0]._id}`})">
            <image :src="item.article_id[0].avatar" alt="avatar" mode="aspectFill" />
            <view class="question_list_content">
              <h6>{{item.article_id[0].title}}</h6>
              <p>{{item.article_id[0].content}}</p>
              <view class="hot_box">
                <view class="hot_box_item">
                  <u-icon name="eye" color="#333" size="15" class="hot_box_item_icon"></u-icon>
                  {{item.article_id[0].view_count}}
                </view>
                <view class="hot_box_item">
                  <u-icon name="thumb-up" color="#333" size="15" class="hot_box_item_icon"></u-icon>
                  {{item.article_id[0].like_count}}
                </view>
                <view class="hot_box_item">
                  <u-icon name="chat" color="#333" size="15" class="hot_box_item_icon"></u-icon>
                  {{item.article_id[0].comment_count}}
                </view>
              </view>
            </view>
          </view>
          <p class="bottom_tips">到底咯 ~</p>
        </scroll-view>
      </block>
      <block v-else>
        <view class="none_data">
          你暂时没有收藏的问题哦～
        </view>
      </block>
    </view>
  </AliceContainer>
</template>

<script>
import { getCollectQuestionList, deleteQuestion } from '@/api/questions'
export default {
  name: "questionList",
  data() {
    return {
      questionList: [],
      isShow: false,
    }
  },
  async onLoad() {
    this.isShow = false
    await this.getAllData()
    this.isShow = true
  },
  onShow() {
    if(this.isShow) {
      this.getAllData()
    }
  },
  methods: {
    async requestList() {
      if(this.isShow) {
        this.handleLoading({title: '搜索中'})
      }
      const result = await getCollectQuestionList()
      uni.hideLoading()
      return result
    },
    async getAllData() {
      const result = await this.requestList()
      this.questionList = result.data
      console.log(this.questionList)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 999;
}
.list_container {
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 100rpx - var(--status-bar-height));
  .search_bar {
    width: 100%;
    height: 80rpx;
    box-sizing: border-box;
  }
  .scroll-Y {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0rpx;
    bottom: 10rpx;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
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
          position: relative;
          .more_icon {
            position: absolute;
            right: 0;
            top: 0;
          }
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
    .bottom_tips {
      text-align: center;
      padding: 10rpx 0;
      font-size: 26rpx;
    }
  }
  .none_data {
    color: #333;
    font-size: 26rpx;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pagination_box {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 20rpx;
  }
}

.popup_box {
  width: 100%;
  padding: 20rpx 32rpx;
  box-sizing: border-box;
  .popup_list {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &:last-child {
      border-bottom: none;
    }
  }
  .edit {
    color: rgb(0, 132, 255);
  }
  .delete {
    color: red;
  }
}


</style>