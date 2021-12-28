<template>
  <AliceContainer>
    <AliceHeader slot="header" bgColor="#ffffff" fontColor="#333">{{`${questionName}问题`}}</AliceHeader>

    <view class="list_container">
      <view class="search_bar">
        <u--input
          placeholder="请输入搜索内容"
          prefixIcon="search"
          border="surround"
          v-model="value"
          @confirm="search"
          shape="circle"
        ></u--input>
      </view>
      <scroll-view
        scroll-y="true" 
        class="scroll-Y"
      >
        <view class="question_list" v-for="(item, index) in questionList" :key="index" @click="handleNavTo({url: `/pages/questions/questionList/questionDetail/index?id=${item._id}`})">
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
        <p class="bottom_tips">到底咯 ~</p>
      </scroll-view>
      <view class="pagination_box">
        <AlicePagination :total="total" :page="page" :limit="limit" @selectPage="selectPage" @clickPage="clickPage" />
      </view>
    </view>
  </AliceContainer>
</template>

<script>
import { getQuestionList } from '@/api/questions'
export default {
  name: "questionList",
  data() {
    return {
      categoryId: null,
      questionName: null,
      value: '',
      page: 1,
      limit: 10,
      questionList: [],
      total: 0,
    }
  },
  async onLoad({category_id, question_name}) {
    this.categoryId = category_id
    this.questionName = question_name
    this.getAllData()
  },
  methods: {
    async search() {
      this.getAllData()
    },
    async requestList() {
      this.handleLoading({title: '搜索中'})
      const result = await getQuestionList({
        category_id: this.categoryId,
        limit: this.limit,
        page: this.page,
        searchVal: this.value
      })
      uni.hideLoading()
      return result
    },
    async getAllData() {
      const result = await this.requestList()
      this.questionList = result.data
      this.total = result.total
    },
    selectPage(page) {
      this.page = page
    },
    clickPage(page) {
      this.page = page
    }
  },
  watch: {
    page(val) {
      this.getAllData()
    }
  }
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
    top: 80rpx;
    bottom: 100rpx;
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
  .pagination_box {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 20rpx;
  }
}

</style>