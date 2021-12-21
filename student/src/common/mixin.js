import Vue from "vue";

Vue.mixin({
  methods: {
    handleNavTo({ url, type = "navigateTo", animation = true }) {
      console.log(url)
      uni[type]({
        url,
        ...(animation === true
          ? { animationType: "pop-in", animationDuration: 100 }
          : animation)
      });
    },
    handleNavBack({ animation = true } = {}) {
      uni.navigateBack({
        ...(animation === true
          ? { delta: 1, animationType: "pop-out", animationDuration: 100 }
          : animation)
      });
    },
    // 拷贝封装
    handleCopy({ content, successText = "复制成功" }) {
      uni.setClipboardData({
        data: content,
        success: () => {
          this.makeToast({
            title: successText
          });
        }
      });
    },
    // 提示信息封装
    handleToast({ title, icon = "none", mask = true, duration = 1500 }) {
      uni.showToast({
        title,
        duration,
        icon,
        duration
      });
    }
  }
});