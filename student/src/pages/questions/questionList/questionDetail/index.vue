<template>
  <AliceContainer>
    <AliceHeader slot="header" bgColor="#ffffff" fontColor="#333" borderBottom>文章详情</AliceHeader>
    <view class="detail_container">
      <h6>{{ detail.title }}</h6>
      <p class="date">发布时间：{{ detail.publish_date | moment('YYYY-MM-DD hh:mm:ss') }}</p>
      <image :src="detail.avatar" alt="avatar" mode="aspectFill" />
      <p class="content">
        {{detail.content}}
      </p>
    </view>
    <view class="comments" v-if="detail.comment_status == 1">
      <view v-if="comments.length">
        <h6>评论</h6>
        <commentsBox v-for="(item, index) in comments" :key="index" :data="item" />
      </view>
      <view v-else class="no_comments">
        还没有人评论呢～
      </view>

      <!-- 底部评论框 -->
      <view class="comment_input">
        <input type="text" v-model="comment" placeholder="发一条友善的评论" />
        <button @click="sendArticleComment" :disabled="sending" :loading="sending">发送</button>
      </view>
    </view>
    <view v-else class="no_comments">评论功能已关闭</view>
  </AliceContainer>
</template>

<script>
const commentType = {
  article: 0,  // 针对文章回复
  comment: 1   // 针对评论回复
}
import { getQuestionDetail } from '@/api/questions'
import { getComments, addComment } from '@/api/comment'
import commentsBox from '../../components/comments.vue'
export default {
  name: "questionDetail",
  components: {
    commentsBox
  },
  data() {
    return {
      id: null,
      detail: {},
      page: 1,
      comments: [],
      comment: null,
      sending: false
    }
  },
  async onLoad({id}) {
    this.id = id
    this.detail = await getQuestionDetail({id})
    await this.getCommentsList()
  },
  methods: {
    async getCommentsList() {
      const commentData = await getComments({
        page: this.page,
        article_id: this.id
      })
      this.comments = commentData.data
    },
    async sendArticleComment() {
      if(!this.comment) {
        this.handleToast({
          title: '评论不能为空'
        })
        return
      }
      this.sending = true
      try {
        await addComment({
          article_id: this.id,
          comment_content: this.comment,
          comment_type: commentType.article,
        })
        this.handleLoading({title: '评论发布中'})
        this.comment = null
        await this.getCommentsList()
      } catch (error) {
        console.log(error)
      } finally {
        this.sending = false
        uni.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail_container {
  width: 100%;
  padding: 32rpx;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  box-sizing: border-box;
  h6 {
    width: 100%;
    font-size: 36rpx;
    margin-bottom: 10rpx;
  }
  .date {
    font-size: 24rpx;
    color: #333;
    padding-bottom: 20rpx;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin-bottom: 20rpx;
  }
  image {
    width: 100%;
    height: 400rpx;
  }
  .content {
    padding: 20rpx 0;
    font-size: 26rpx;
    color: #333;
    line-height: 40rpx;
  }
}
.comments {
  width: 100%;
  padding: 32rpx;
  box-sizing: border-box;
  padding-bottom: 200rpx;
  h6 {
    font-size: 32rpx;
  }
  .comment_input {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0 32rpx;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    input {
      font-size: 26rpx;
      flex: 1;
      margin-right: 20rpx;
    }
    button {
      width: 100rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 24rpx;
      color: #fff;
      background-color: rgb(125, 241, 125);
      border-radius: 10rpx;
      padding: 0;
    }
  }
}
.no_comments {
  width: 100%;
  padding-top: 40rpx;
  text-align: center;
  font-size: 26rpx;
}
</style>