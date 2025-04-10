/*
 * @Version    : v1.00
 * @Author     : Wang Chao
 * @Date       : 2025-02-21 13:57
 * @LastAuthor : Wang Chao
 * @LastTime   : 2025-02-23 16:34
 * @desc       :
 */
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/main.css';
import { bitable } from '@lark-base-open/js-sdk';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import enLocale from 'element-plus/dist/locale/en.mjs';

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    ja
  }
});

const app = createApp(App);

// 先使用 i18n 和 ElementPlus
app.use(i18n);
app.use(ElementPlus, {
  locale: zhCn, // 默认使用中文
});

// 挂载应用
app.mount('#app');

// 异步获取语言并更新设置
bitable.bridge.getLanguage().then((lang) => {
  i18n.global.locale.value = lang;
  const _isZh = lang === 'zh' || lang === 'zh-HK' || lang === 'zh-TW';
  
  // 只更新 i18n 的语言设置，ElementPlus 已经初始化
  if (!_isZh) {
    app.config.globalProperties.$ELEMENT.locale = enLocale;
  }
});
