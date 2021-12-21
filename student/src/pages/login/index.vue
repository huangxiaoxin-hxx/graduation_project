<template>
  <AliceContainer :showHeader="false">
    <view class="login_container">
      <view class="login_box">
        <h2 class="form_title" id="signup">Login</h2>
        <view class="tui-form">
          <view class="tui-view-input">
            <view class="tui-cell-input">
              <input :adjust-position="false" v-model="formData.username" placeholder="请输入邮箱账号"
                placeholder-class="tui-phcolor" type="text" />
              <view class="tui-icon-close" v-show="formData.username" @tap="clearInput(1)">
                <u-icon name="close-circle" color="#000"></u-icon>
              </view>
            </view>
            <view class="tui-cell-input">
              <input :adjust-position="false" v-model="formData.password" placeholder="请输入密码" :password="true"
                placeholder-class="tui-phcolor" type="text" maxlength="36" />
              <view class="tui-icon-close" v-show="formData.password" @tap="clearInput(2)">
                <u-icon name="close-circle" color="#000"></u-icon>
              </view>
            </view>
          </view>

          <view class="tui-cell-text">
            <view class="tui-color-primary" hover-class="tui-opcity" :hover-stay-time="150" @tap="href(1)">忘记密码？
            </view>
            <view hover-class="tui-opcity" :hover-stay-time="150" style="color: #fff">
              没有账号？
              <text class="tui-color-primary" @tap="handleNavTo({url: '/pages/register/index'})">注册</text>
            </view>
          </view>
          
          <view class="tui-btn-box">
            <button class="submit-btn" :loading="formLoading" :disabled="formLoading" @click="login">Log in</button>
          </view>
        </view>
      </view>
    </view>
  </AliceContainer>
</template>

<script>
import { loginRule } from '@/checkRule/login.js'
var graceChecker = require("@/checkRule/graceChecker.js");
import userRequest from '@/common/userRequest'
export default {
  name: 'login',
  data() {
    return {
      formData: {
        username: null,
        password: null
      },
      formLoading: false,
      result: null
    }
  },
  methods: {
    async login() {
      const formData = this.formData
      var checkRes = graceChecker.check(formData, loginRule);
      if(!checkRes){
				this.handleToast({title: graceChecker.error})
        return
			}
      this.formLoading = true
      try {
        await userRequest('login', formData)
        this.handleNavTo({
            url: '/pages/home/index',
            type: 'switchTab'
        });
      } catch (error) {
        console.log(error)
      } finally {
        this.formLoading = false
      }
    },
    clearInput(key) {
      switch (key) {
        case 1:
          this.formData.username = null
          break;
        case 2:
          this.formData.password = null
          break;
      }
    }
  },
  async onLoad() {
    
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
.login_container {
  width: 100%;
	height: 100vh;
	background-image: url('/static/login/login-bg.jpeg');
	background-size: cover;
	background-repeat: no-repeat;
	font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .form_title {
      color: #fff;
			text-align: center;
    }
    .tui-form {
			width: 580rpx;
			margin-top: 100rpx;
			.tui-view-input {
				width: 100%;
				border-radius: 15px;
				background-color: #fff;
				overflow: hidden;
				margin-top: 50px;
				opacity: 1;
				visibility: visible;
				box-sizing: border-box;

				.tui-cell-input {
					width: 100%;
					display: flex;
					input {
						flex: 1;
						border: 0;
						outline: none;
						box-shadow: none;
						display: block;
						height: 50rpx;
						line-height: 50rpx;
						padding: 8px 15px;
						width: 100%;
						font-size: 28rpx;
					}

					.tui-icon-close {
						margin-left: auto;
            display: flex;
            align-items: center;
            padding-right: 10rpx;
            box-sizing: border-box;
					}
				}
			}

			.tui-cell-text {
				width: 100%;
				padding: $uni-spacing-col-lg $uni-spacing-row-lg;
				box-sizing: border-box;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tui-color-primary {
					color: $uni-color-primary;
				}
			}

			.tui-btn-box {
				width: 100%;
				padding: 0 $uni-spacing-row-lg;
				box-sizing: border-box;
				margin-top: 80rpx;
				.submit-btn {
					background-color: rgba(0,0,0,0.4);
					color: rgba(256,256,256,0.7);
					border-radius: 15px;
					display: block;
					margin: 15px auto; 
					padding: 10rpx;
					width: 100%;
					font-size: 30rpx;
					font-weight: bold;
					cursor: pointer;
					opacity: 1;
					visibility: visible;
			  }
			}

      .tui-login-way {
        width: 100%;
        font-size: 26rpx;
        color: $uni-color-primary;
        display: flex;
        justify-content: center;
        position: fixed;
        left: 0;
        bottom: 80rpx;

        view {
          padding: 12rpx 0;
        }
      }

      .tui-auth-login {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 80rpx;
        padding-top: 20rpx;

        .tui-icon-platform {
          width: 90rpx;
          height: 90rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-left: 40rpx;

          &::after {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            transform-origin: 0 0;
            transform: scale(0.5, 0.5) translateZ(0);
            box-sizing: border-box;
            left: 0;
            top: 0;
            border-radius: 180rpx;
            border: 1rpx solid $uni-text-color-placeholder;
          }
        }

        .tui-login-logo {
          width: 60rpx;
          height: 60rpx;
        }
      }
		}
  }
}
.tui-verify-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}

.tui-phcolor {
  color: rgba(0,0,0,0.4);
  font-size: 28rpx;
}
</style>