# PIG Research Skills 9.2.0 教程

中文客户指南，覆盖五个产品的 把完整 skill 文件夹交给本地 agent 安装与配置、研究选题与详细方案、三种推进方式、图表编辑及全文交付。

线上地址：https://marvin-pig.github.io/pig-research-skills-guide/#install

GitHub Pages 使用 `main` 分支根目录。`index.html`、`styles.css`、`app.js` 可直接静态部署；网站不读取本机数据，不收集输入，也不托管客户数据 ZIP。包名、体积和操作步骤对应 PIG 9.2.0，新的产品版本发布时需同步核对包内说明与功能边界。

本地预览：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

访问 http://127.0.0.1:8765/ 。也可直接打开 `index.html`；禁用 JavaScript 时仍能阅读安装教程，产品切换与提示词生成需要 JavaScript。

`npm run build` 保留备用部署的 `dist/client` 和 `dist/server` 输出；GitHub Pages 直接读取根目录。维护记录、浏览器截图和验证日志保存在本仓库外。

交付分别为 Windows x64 和 macOS 完整 skill ZIP，保留简单的 agent 安装提示词；各系统及 agent 的环境能力由使用者电脑上的实际检查确认。页面不将 macOS 本机验证表述为 Windows 执行成功。教程不扩展各数据库实际提供的数据范围，也不提供数据的公开下载或重新授权。
