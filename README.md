# 🖼️ Comment Image Viewer

A lightweight Visual Studio Code extension that renders images directly inside your JavaScript files, using a special comment syntax.

---

## ✨ Features

- Display images inline using special comment annotations.
- Control the image size using percentage scaling.
- Minimalistic, efficient, and distraction-free.
- Perfect for diagram previews, screenshots, and embedded visual docs.

---

## 🧪 Usage

In your JavaScript file, add a comment in the following format:

```js
// @img ./relative/path/to/image.png 60%
```

- `@img`: Required keyword.
- `./relative/path/to/image.png`: Relative path from the current file to your image.
- `60%`: Desired image size (in percentage of original scale).

The image will be rendered directly **below** the comment line.

---

## ✅ Example
Given the following file structure:
``` css
project/
├── images/
│   └── diagram.png
└── src/
    └── test.js
```
Inside `test.js`:
```js
// @img ../images/diagram.png 80%
```
✅ The image will appear immediately below the comment.

---
## 🔧 Supported Formats
- `.png`

- `.jpg`, `.jpeg`

- `.gif`

- `.webp`

Note: Only local file paths are supported. Remote URLs are not.

---
## 🛠 Limitations
- 📁 Currently supports only JavaScript (`.js`) files

- 📏 Does **not auto-resize editor spacing** based on image height

- 📐 Works best with small to medium-sized images

- 🔁 Decorations may not behave like real Word-style layout (due to VS Code API limits)

---

## 👤 Author

**Strangekim**
GitHub: Strangekim

---

## 📄 License

MIT © 2025 Strangekim
