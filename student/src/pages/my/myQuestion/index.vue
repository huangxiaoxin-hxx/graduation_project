<template>
  <AliceContainer :isShow="isShow">
    <AliceHeader slot="header" bgColor="#ffffff" fontColor="#333">我的问题</AliceHeader>

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
      <block v-if="questionList.length">
        <scroll-view
        scroll-y="true" 
        class="scroll-Y"
        >
          <view class="question_list" v-for="(item, index) in questionList" :key="index" @click="handleNavTo({url: `/pages/questions/questionList/questionDetail/index?id=${item._id}`})">
            <image :src="item.avatar" alt="avatar" mode="aspectFill" />
            <view class="question_list_content">
              <h6>{{item.title}}
                <view class="more_icon" @tap.stop="moreClick(item._id)">
                  <u-icon name="more-dot-fill" color="#333" size="15"></u-icon>
                </view>
              </h6>
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
      </block>
      <block v-else>
        <view class="none_data">
          你暂时没有发布过问题哦～
        </view>
      </block>
      <view class="pagination_box">
        <AlicePagination :total="total" :page="page" :limit="limit" @selectPage="selectPage" @clickPage="clickPage" />
      </view>
    </view>
    <u-popup :show="show" :round="10" mode="bottom" @close="close">
      <view class="popup_box">
        <view class="edit popup_list" @click="goEdit">编辑</view>
        <view class="delete popup_list" @click="goDelete">删除</view>
      </view>
    </u-popup>
    <u-modal 
      :show="showModal" 
      title="是否删除该问题?" 
      :closeOnClickOverlay="true" 
      @close="isShowModal" 
      @cancel="isShowModal" 
      @confirm="deleteArticle"
      showCancelButton
    ></u-modal>
  </AliceContainer>
</template>

<script>
import { getMyQuestionList, deleteQuestion } from '@/api/questions'
export default {
  name: "questionList",
  data() {
    return {
      value: '',
      page: 1,
      limit: 10,
      questionList: [],
      total: 0,
      articleId: null,
      show: false,
      showModal: false,
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
    async search() {
      this.getAllData()
    },
    async requestList() {
      if(this.isShow) {
        this.handleLoading({title: '搜索中'})
      }
      const result = await getMyQuestionList({
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
    },
    moreClick(id) {
      this.articleId = id
      this.show = !this.show
    },
    close() {
      this.show = !this.show
    },
    goEdit() {
      this.handleNavTo({url: '/pages/questions/publish/index?article_id='+ this.articleId})
      this.close()
    },
    goDelete() {
      this.close()
      this.isShowModal()
    },
    isShowModal() {
      this.showModal = !this.showModal
    },
    async deleteArticle() { // 删除问题
      try {
        this.handleLoading({title: '删除中'})
        await deleteQuestion({article_id: this.articleId})
        this.isShowModal()
        this.getAllData()
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
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