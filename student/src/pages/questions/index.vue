<template>
  <AliceContainer>
    <view class="question_header" slot="header">问题分类
      <u-icon 
        name="plus" 
        color="#fff" 
        size="20" 
        class="add_question"
        @click="handleNavTo({url: '/pages/questions/publish/index'})"
      ></u-icon>
    </view>
    <view class="question_container">
      <view 
        class="categories" 
        v-for="(item, index) in categories" 
        :key="index" 
        @click="handleNavTo({url: `/pages/questions/questionList/index?category_id=${item._id}&question_name=${item.name}`})"
      >
        <image :src="item.icon" :alt="item.name" mode="aspectFill">
        <p>{{item.name}}({{item.article_count}})</p>
      </view>
    </view>
  </AliceContainer>
</template>

<script>
import { getCategories } from '@/api/questions'
import { mapState } from 'vuex'
export default {
  name: 'questions',
  computed: {
    ...mapState('article', ['categories'])
  },
  methods: {
    
  },
  async onShow() {
    await getCategories()
  }
}
</script>

<style lang="scss" scoped>
.question_header {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  position: fixed;
  background-color: #8daabd;
  color: #fff;
  z-index: 999;
  .add_question {
    position: absolute;
    top: 24rpx;
    right: 20rpx;
  }
}
.question_container {
  width: 100%;
  padding: 30rpx;
  box-sizing: border-box;
  .categories {
    width: 300rpx;
    height: 400rpx;
    display: inline-block;
    text-align: center;
    image {
      width: 100%;
      height: 300rpx;
    }
    &:nth-child(odd) {
      margin-right: 90rpx;
    }
  }
}
</style>