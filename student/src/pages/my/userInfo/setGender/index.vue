<template>
    <AliceContainer>
      <AliceHeader slot="header">
        选择性别
        <button class="confirm" slot="right" @click="confirmGender">完成</button>
      </AliceHeader>
      <view class="gender_container">
        <view class="select_gender" v-for="(item, index) in genders" :key="index" @click="selectGender(item)">
          <p>{{item.text}}</p>
          <block v-if="gender && gender.value === item.value">
            <u-icon name="checkbox-mark" color="#7df17d" size="20"></u-icon>
          </block>
        </view>
      </view>
    </AliceContainer>
</template>

<script>
const genders = [
  {
    text: "男",
    value: 1
  },
  {
    text: "女",
    value: 2
  }
]
import { mapState } from 'vuex'
import { setGender } from '@/api/user'
export default {
  data() {
    return {
      gender: null,
      genders: genders
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  onLoad() {
    this.gender = this.userInfo.gender
  },
  methods: {
    selectGender(data) {
      this.gender = data
    },
    confirmGender() {
      setGender({gender: this.gender})
    }
  }
}
</script>

<style lang="scss" scoped>
.gender_container {
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  .select_gender {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    p {
      font-size: 26rpx;
    }
  }
}
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
</style>