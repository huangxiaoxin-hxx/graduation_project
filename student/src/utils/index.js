import moment from "moment";

export function setStorage(key, val, cacheSeconds = null) {
  uni.setStorageSync(key, val);
  if (cacheSeconds > 0) {
    const duration = moment()
      .add(cacheSeconds, "seconds")
      .valueOf();
    uni.setStorageSync(key + "_cache", duration);
  }
}

export function removeStorage(key) {
  uni.removeStorageSync(key);
  uni.removeStorageSync(key + "_cache");
}

export function getStorage(key, defaultVal = null) {
  const val = uni.getStorageSync(key);
  const valCache = uni.getStorageSync(key + "_cache");
  if (valCache > 0) {
    const currentTimestamp = moment().valueOf();
    if (valCache < currentTimestamp) {
      removeStorage(key);
      return defaultVal;
    }
  }
  return val !== "" ? val : defaultVal;
}
