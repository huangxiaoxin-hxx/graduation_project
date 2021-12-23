<template>
  <view>
    <view class="pagination">
      <button 
        class="previous" 
        @click="previousClick" 
        :disabled="previousUnAble"
        :class="previousUnAble ? 'disable' : ''"
      >上一页</button>
      <view class="page">
        <text @click="showSelect" style="color: #6698cb">{{page}}</text>/{{totalPage}}
      </view>
      <button 
        class="next" 
        @click="nextClick" 
        :disabled="nextUnAble"
        :class="nextUnAble ? 'disable' : ''"
      >下一页</button>
    </view>
    <u-picker 
      :show="show" 
      :columns="pages" 
      @close="showSelect" 
      @cancel="showSelect" 
      @confirm="selectPage"
      closeOnClickOverlay
    ></u-picker>
  </view>
</template>

<script>
// import uPicker from "uview-ui/components/u-picker/u-picker.vue";
export default {
  name: "AlicePagination",
  data() {
    return {
      show: false
    }
  },
  props: {
    total: {
      type: Number | String,
      default: 10
    },
    limit: {
      type: Number | String,
      default: 10
    },
    page: {
      type: Number | String,
      default: 1
    }
  },
  computed: {
    totalPage() {
      const total = this.total
      const limit = this.limit
      console.log(total)
      if(total === 0) {
        return 1
      }
      const total_page = Math.ceil(total / limit)
      return total_page
    },
    pages() {
      const list = []
      for (let index = 1; index <= this.totalPage; index++) {
        list.push(index)
      }
      return [list]
    },
    previousUnAble() {
      if(this.page === 1) {
        return true
      }
      return false
    },
    nextUnAble() {
      if(this.page === this.totalPage) {
        return true
      }
      return false
    }
  },
  methods: {
    showSelect() { // 显示选择页面组件
      this.show = !this.show
    },
    selectPage(page) { // 选择页面抛出选择的页面
      // console.log(page.value[0])
      this.$emit("selectPage", page.value[0])
      this.showSelect()
    },
    previousClick() {  // 点击上一页
      const page = this.page - 1
      this.$emit("clickPage", page)
    },
    nextClick() { // 点击下一页
      const page = this.page + 1
      this.$emit("clickPage", page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100rpx;
  button {
    background: #6698cb;
    color: #fff;
    width: 200rpx;
    height: 60rpx;
    line-height: 60rpx;
    padding: 0;
    font-size: 26rpx;
  }
  .disable {
    background-color: #aaa;
  }
  .page {
    font-size: 26rpx;
  }
}
</style>