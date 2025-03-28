/*
 * @Author: 桂佳囿
 * @Date: 2025-02-27 23:17:43
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-27 00:54:54
 * @Description:
 */

export class Storage {
  /**
     * @description: 从sessionStorage或者localStorage中获取数据
     * @param {string} key
     * @return {*}
     */
  static getItem(key) {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  }

  /**
     * @description: 存储到sessionStorage或者localStorage
     * @param {string} key
     * @param {string} value
     * @param {boolean} isLongTime
     * @return {*}
     */
  static setItem(key, value, isLongTime = true){
    this.removeItem(key);
    if (!isLongTime) sessionStorage.setItem(key, value);
    else localStorage.setItem(key, value);
  }

  /**
     * @description: 删除单个存储
     * @param {string} key
     * @return {*}
     */
   static removeItem(key) {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  }

  /**
     * @description: 情况所有的缓存
     * @return {*}
     */
   static clear() {
    sessionStorage.clear();
    localStorage.clear();
  }

   static parseJWT(){
    const token = this.getItem('token');
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c)=>
      ('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    ).join(''));
    const tokenInfo = JSON.parse(jsonPayload);
    if(tokenInfo.exp < Date.now() / 1000) {
      this.removeItem('token');
      return null;
    }
    return tokenInfo;
  }
}