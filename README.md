# PIG Research Skills 使用指南与教程网页

这是一个可离线打开、也可发布到 Sites 的交互式中文教程，统一覆盖 `charls-pig`、`nhanes-pig`、`nhanes-charls-pig` 和 `seven-aging-pig-skill` 四套本地研究工作流。

## 打开方式

直接双击 `index.html`，或在本目录运行：

```bash
python3 -m http.server 8765
```

然后访问 `http://127.0.0.1:8765/`。

## 文件

- `index.html`：教程内容与页面结构
- `styles.css`：响应式视觉样式
- `app.js`：流程切换、提示词生成、复制按钮与折叠内容
- `og.png`：网页分享预览图

网页本身不会读取、上传或保存任何参与者数据。
