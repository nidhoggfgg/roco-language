# Roco Language

洛克语翻译器是一个静态网页小工具，用来在英文和洛克语符文之间互相转换。

## 功能

- 英文转洛克语字体显示
- 英文转 Unicode 洛克语字符
- Unicode 洛克语转英文
- 支持 `C/K`、`V/W` 两组共用字符的反向转换偏好
- 内置字符表，点击字符可快速输入

## 使用

直接在浏览器中打开 `index.html` 即可使用，不需要构建步骤或本地服务。

项目结构：

```text
.
├── assets/
│   └── RUNEREGULAR.ttf
├── index.html
├── script.js
└── styles.css
```

## 字体说明

本项目会通过 `styles.css` 引用 `assets/RUNEREGULAR.ttf` 作为洛克语展示字体。

该字体文件是单独的闭源/第三方资产，不包含在 MIT License 的授权范围内。你可以运行和查看本项目，但如果要分发、修改、复用或商用该字体文件，请自行确认你拥有相应授权。

如果你希望发布一个完全开源、可自由再分发的版本，建议删除该字体文件，并替换为明确采用开源字体许可证的字体，例如 SIL Open Font License 1.1 字体。

## License

本项目源码和文档采用 [MIT License](LICENSE)。

`assets/RUNEREGULAR.ttf` 不随本项目源码一起按 MIT License 授权，详见上方“字体说明”。
