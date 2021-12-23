<template>
  <AliceContainer>
    <AliceHeader slot="header">
      设置昵称
      <button class="confirm" slot="right" :disabled="disable" @click="confirmNickname">完成</button>
    </AliceHeader>
    <view class="nickname_container">
      <u--input
        placeholder="好的名字可以让朋友更容易记住你"
        border="bottom"
        v-model="nickname"
        fontSize="14rpx"
        @change="change"
      ></u--input>
    </view>
  </AliceContainer>
</template>

<script>
import { setNickname } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: "setNickname",
  data() {
    return {
      nickname: null,
      disable: true
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  onLoad() {
    if(this.userInfo) {
      this.nickname = this.userInfo.nickname
    }
  },
  methods: {
    change() {
      this.disable = false
    },
    async confirmNickname() {
      this.handleLoading({title: '修改中'})
      try {
        await setNickname({nickname: this.nickname})
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
        this.handleNavBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  width: 100rpx;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 24rpx;
  color: #fff;
  background-color: rgb(125, 241, 125);
  border-radius: 10rpx;
  padding: 0;
}
.nickname_container {
  width: 100%;
  background-color: #fff;
  padding: 20rpx 32rpx 0;
  box-sizing: border-box;
}
</style>