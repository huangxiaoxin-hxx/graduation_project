<template>
  <AliceContainer :showHeader="false">
    <view class="login_container">
      <view class="login_box">
        <h2 class="form_title" id="signup">Register</h2>
        <u-radio-group
          v-model="formData.role"
          placement="row"
        >
          <u-radio
            :customStyle="{marginRight: '20rpx'}"
            v-for="(item, index) in role"
            :key="index"
            :label="item.role_name"
            labelColor="#fff"
            :name="item.role_id"
          >
          </u-radio>
        </u-radio-group>
        <view class="tui-form">
          <view class="tui-view-input">
            <view class="tui-cell-input">
              <input :adjust-position="false" v-model="formData.username" placeholder="请输入邮箱账号"
                placeholder-class="tui-phcolor"/>
              <view class="tui-icon-close" v-show="formData.username" @tap="clearInput(1)">
                <u-icon name="close-circle" color="#000"></u-icon>
              </view>
            </view>

            <view class="tui-cell-input">
              <input :adjust-position="false" v-model="formData.code" placeholder="请输入验证码"
                placeholder-class="tui-phcolor" maxlength="6" type="text"/>
              <u-verification-code 
                unique-key="page-register" 
                ref="uCode" 
                :seconds="seconds" 
                @end="end" 
                @start="start" 
                :keepRunning="true"
                @change="codeChange"
              ></u-verification-code>
              <u-button 
                color="linear-gradient(to right, #8daabd, #566873)" 
                size="mini" 
                class="send_code_button" 
                @click="sendCode"
                :disabled="codeLoading"
              >{{codeTips}}</u-button>

            </view>

            <view class="tui-cell-input">
              <input :adjust-position="false" v-model="formData.password" placeholder="请输入密码" :password="true"
                placeholder-class="tui-phcolor" type="text" maxlength="36" />
              <view class="tui-icon-close" v-show="formData.password" @tap="clearInput(2)">
                <u-icon name="close-circle" color="#000"></u-icon>
              </view>
            </view>
            <view class="tui-cell-input">
              <input :adjust-position="false" v-model="formData.confirmPassword" placeholder="确认密码" :password="true"
                placeholder-class="tui-phcolor" type="text" maxlength="36" />
              <view class="tui-icon-close" v-show="formData.confirmPassword" @tap="clearInput(3)">
                <u-icon name="close-circle" color="#000"></u-icon>
              </view>
            </view>
          </view>

          <view class="tui-cell-text">
            <view hover-class="tui-opcity" :hover-stay-time="150" style="color: #fff">
              已有账号
              <text class="tui-color-primary" @tap="handleNavTo({url: '/pages/login/index'})">去登录</text>
            </view>
          </view>
          
          <view class="tui-btn-box">
            <button class="submit-btn" :loading="formLoading" :disabled="formLoading" @click="register">Register</button>
          </view>
        </view>
      </view>
    </view>
  </AliceContainer>
</template>

<script>
import { codeRule, registerRule } from '@/checkRule/register.js'
var graceChecker = require("@/checkRule/graceChecker.js");
import userRequest from '@/common/userRequest'
import roleRequest from '@/common/roleRequest'
export default {
  name: 'login',
  data() {
    return {
      formData: {
        username: null,
        password: null,
        confirmPassword: null,
        code: null,
        role: null
      },
      formLoading: false,
      seconds: 60,
      codeTips: '获取验证码',
      codeLoading: false,
      role: []
    }
  },
  methods: {
    async register() {
      const formData = this.formData
      console.log(registerRule)
      var checkRes = graceChecker.check(formData, registerRule);
      if(!checkRes){
				this.handleToast({title: graceChecker.error})
        return
			}
      this.formLoading = true
      try {
        await userRequest('register', formData)
      } catch (error) {
        console.log(error)
      } finally {
        this.formLoading = false
      }
    },
    async sendCode() {
      const formData = this.formData
      var checkRes = graceChecker.check(formData, codeRule);
      if(!checkRes){
				this.handleToast({title: graceChecker.error})
        return
			}
      if(this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        try {
          await userRequest('sendRegisterCode', formData)
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        } catch (error) {
          console.log(error)
        } finally {
          this.formLoading = false
        }
      } 
    },
    codeChange(text) {
      this.codeTips = text;
    },
    clearInput(key) {
      switch (key) {
        case 1:
          this.formData.username = null
          break;
        case 2:
          this.formData.password = null
          break;
        case 3:
          this.formData.confirmPassword = null
          break;
      }
    },
    end() {
      this.codeLoading = false
    },
    start() {
      this.codeLoading = true
    }
  },
  async onLoad() {
    // 获取权限列表
    const res = await roleRequest('getRole')
    this.role = res.roleList
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
      margin-bottom: 100rpx;
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
          align-items: center;
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

          .send_code_button {
            width: 180rpx;
            padding: 0;
            margin-right: 20rpx;
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