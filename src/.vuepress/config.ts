import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "博客",
  description: "下个山脚下",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
