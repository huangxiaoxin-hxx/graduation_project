<template>
  <AliceContainer>
    <AliceHeader slot="header">发布问题</AliceHeader>
    <view class="publish_container">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item">
          <view class="label">标题</view>
          <view>
            <input type="text" name="title" v-model="article.title" placeholder="请输入问题标题">
          </view>
        </view>
        <view class="uni-form-item">
          <view class="label">分类</view>
          <view>
            <view class="category_select" @click="clickShow">
              {{categorySelect}}
              <u-icon name="arrow-right" color="#333" size="14" class="arrow-right"></u-icon>
            </view>
            <u-picker 
              @cancel="clickShow" 
              @close="clickShow" 
              closeOnClickOverlay 
              @confirm="confirmCategory" 
              :show="show" 
              :columns="columns" 
              keyName="label"
              borderRadius="10"></u-picker>
          </view>
        </view>
        <view class="uni-form-item content-item">
          <view class="label">内容</view>
          <view style="width: 500rpx">
            <u--textarea v-model="article.content" placeholder="请输入内容" autoHeight maxlength="-1"></u--textarea>
          </view>
        </view>
        <view class="uni-form-item">
          <view class="label">评论</view>
          <view>
            <u-radio-group 
              v-model="article.comment_status"
              placement="row">
              <u-radio name="1" label="开启" size="16" labelSize="13" :customStyle="{marginRight: '20rpx'}"></u-radio>
              <u-radio name="0" label="关闭" size="16" labelSize="13"></u-radio>
            </u-radio-group>
          </view>
        </view>
        <view class="uni-form-item content-item">
          <view class="label">封面</view>
          <view>
            <u-upload
              :fileList="fileList"
              @afterRead="afterRead"
              @delete="deletePic"
              :maxCount="1"
            ></u-upload>
          </view>
        </view>
        <view class="buttons">
          <button form-type="submit" class="submit">提交</button>
          <button form-type="reset" class="reset">重置</button>
        </view>
      </form>
    </view>
  </AliceContainer>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
import { submitArticleRule } from '@/checkRule/article'
var graceChecker = require("@/checkRule/graceChecker.js");
import { addArticle, getCategories, updateArticle, getQuestionDetail } from '@/api/questions'
export default {
  data() {
    return {
      article: {
        title: null, // 问题标题
        category_id: null, // 问题类别
        content: null, // 问题内容
        comment_status: null, // 问题是否开启评论
        avatar: null, // 问题封面
      },
      show: false,
      categorySelect: "请选择问题分类",
      fileList: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState('article', ['categories']),
    ...mapState('user', ['userInfo']),
    columns() {
      console.log(this.categories)
      const list = []
      this.categories.forEach(item => {
        list.push({
          label: item.name,
          id: item._id
        })
      });
      console.log(list)
      return [list]
    }
  },
  async onLoad({article_id}) {
    await getUserInfo()
    console.log(article_id)
    if(article_id) {
      this.editDetail(article_id)
      this.isEdit = true
    }
  },
  methods: {
    clickShow() {
      this.show = !this.show
    },
    confirmCategory(item) {
      const data = item.value[0]
      this.categorySelect = data.label
      this.article.category_id = data.id
      this.clickShow()
    },
    async afterRead(data) { // 上传封面图
      const { file } = data
      this.fileList.push({
        ...file,
        status: 'uploading',
        message: '上传中'
      })
      const images = await uniCloud.uploadFile({
        filePath: file.thumb,
        cloudPath: Date.now() + '.jpg'
      })
      this.fileList.splice(0, 1, {
        status: 'success',
        message: '',
        url: images.fileID
      })
      this.article.avatar = images.fileID
    },
    deletePic(event) { // 删除封面图
			this.fileList.splice(event.index, 1)
		},
    formReset() {
      for (const key in this.article) {
        this.article[key] = null
      }
      this.categorySelect = "请选择问题分类"
      this.fileList = []
    },
    async formSubmit() {
      const formData = this.article
      var checkRes = graceChecker.check(formData, submitArticleRule);
      formData.user_id = this.userInfo._id
      if(!checkRes){
				this.handleToast({title: graceChecker.error})
        return
			}
      // 校验成功，上传问题
      uni.showLoading({
        title: '提交中',
        mask: true
      })
      try {
        if(this.isEdit) {
          const data = await updateArticle(formData)
        } else {
          const data = await addArticle(formData)
        }
        this.handleToast({title: "提交成功"})
        this.formReset()
        getCategories() // 更新vuex的分类数量
      } catch (error) {
        this.handleToast({title: error})
      } finally {
        uni.hideLoading()
      }
    },
    async editDetail(id) {
      this.handleLoading({title: '加载中'})
      try {
        const detail = await getQuestionDetail({id})
        this.categories.map(item => {
          if(item._id === detail.category_id) {
            this.categorySelect = item.name
            return
          }
        })
        this.article = detail
        this.fileList.push({
          status: 'success',
          message: '',
          url: detail.avatar
        })
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 999;
}
.publish_container {
  width: 100%;
  padding: 30rpx 30rpx 100rpx;
  box-sizing: border-box;
  .uni-form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    min-height: 80rpx;
    position: relative;
    padding: 10rpx 0;
    box-sizing: border-box;
    .label {
      font-size: 28rpx;
      color: #333;
      margin-right: 20rpx;
      height: 80rpx;
      line-height: 80rpx;
    }
    input {
      font-size: 28rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: right;
    }
    .category_select {
      width: 100%;
      height: 80rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      // .arrow-right {
      //   position: absolute;
      //   right: 0;
      // }
    }
  }
  .buttons {
    position: fixed;
    width: 100%;
    padding: 20rpx 30rpx 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    left: 0;
    height: 120rpx;
    background-color: #fff;
    border-radius: 20rpx 20rpx 0 0;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    button {
      width: 280rpx;
      height: 80rpx;
      line-height: 80rpx;
      padding: 0;
      border: none;
      color: #fff;
    }
    .submit {
      background: rgb(91, 94, 228);
    }
    .reset {
      background: rgb(199, 78, 41);
    }
  }
  .content-item {
    align-items: flex-start;
  }
}
</style>