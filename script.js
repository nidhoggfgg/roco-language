const runeMap = {
  a: "ᚨ",
  b: "ᛒ",
  c: "ᚲ",
  d: "ᛞ",
  e: "ᛖ",
  f: "ᚠ",
  g: "ᚷ",
  h: "ᚺ",
  i: "ᛁ",
  j: "ᛃ",
  k: "ᚲ",
  l: "ᛚ",
  m: "ᛗ",
  n: "ᚾ",
  o: "ᛟ",
  p: "ᛈ",
  q: "ᛝ",
  r: "ᚱ",
  s: "ᛊ",
  t: "ᛏ",
  u: "ᚢ",
  v: "ᚹ",
  w: "ᚹ",
  x: "ᚦ",
  y: "ᛇ",
  z: "ᛉ",
};

const baseReverseRuneMap = {
  ᚨ: "a",
  ᛒ: "b",
  ᛞ: "d",
  ᛖ: "e",
  ᚠ: "f",
  ᚷ: "g",
  ᚺ: "h",
  ᛁ: "i",
  ᛃ: "j",
  ᛚ: "l",
  ᛗ: "m",
  ᚾ: "n",
  ᛟ: "o",
  ᛈ: "p",
  ᛩ: "q",
  ᚱ: "r",
  ᛊ: "s",
  ᚦ: "x",
  ᛜ: "ng",
  ᛝ: "q",
  ᛋ: "s",
  ᛏ: "t",
  ᚢ: "u",
  ᛪ: "x",
  ᛇ: "y",
  ᛉ: "z",
  ᛎ: "z",
  ᛠ: "ea",
  ᚣ: "y",
  ᛡ: "io",
  ᚩ: "o",
  ᚪ: "a",
  ᚫ: "ae",
  ᚬ: "o",
};

const alphabet = [
  { letters: "A", rune: runeMap.a, insert: "a" },
  { letters: "B", rune: runeMap.b, insert: "b" },
  { letters: "C K", rune: runeMap.c, insert: "c" },
  { letters: "D", rune: runeMap.d, insert: "d" },
  { letters: "E", rune: runeMap.e, insert: "e" },
  { letters: "F", rune: runeMap.f, insert: "f" },
  { letters: "G", rune: runeMap.g, insert: "g" },
  { letters: "H", rune: runeMap.h, insert: "h" },
  { letters: "I", rune: runeMap.i, insert: "i" },
  { letters: "J", rune: runeMap.j, insert: "j" },
  { letters: "L", rune: runeMap.l, insert: "l" },
  { letters: "M", rune: runeMap.m, insert: "m" },
  { letters: "N", rune: runeMap.n, insert: "n" },
  { letters: "O", rune: runeMap.o, insert: "o" },
  { letters: "P", rune: runeMap.p, insert: "p" },
  { letters: "Q", rune: runeMap.q, insert: "q" },
  { letters: "R", rune: runeMap.r, insert: "r" },
  { letters: "S", rune: runeMap.s, insert: "s" },
  { letters: "T", rune: runeMap.t, insert: "t" },
  { letters: "U", rune: runeMap.u, insert: "u" },
  { letters: "V W", rune: runeMap.v, insert: "v" },
  { letters: "X", rune: runeMap.x, insert: "x" },
  { letters: "Y", rune: runeMap.y, insert: "y" },
  { letters: "Z", rune: runeMap.z, insert: "z" },
];
const sourceText = document.querySelector("#sourceText");
const sourceLabel = document.querySelector("#sourceLabel");
const primaryLabel = document.querySelector("#primaryLabel");
const secondaryLabel = document.querySelector("#secondaryLabel");
const primaryOutput = document.querySelector("#primaryOutput");
const secondaryOutput = document.querySelector("#secondaryOutput");
const alphabetPanel = document.querySelector("#alphabetPanel");
const alphabetGrid = document.querySelector("#alphabetGrid");
const alphabetToggle = document.querySelector("#alphabetToggle");
const modeButtons = document.querySelectorAll(".mode-button");
const clearButton = document.querySelector("#clearButton");
const copySecondary = document.querySelector("#copySecondary");
const decodePreference = document.querySelector("#decodePreference");
const decodeOptions = document.querySelectorAll(".decode-option");
const installButton = document.querySelector("#installButton");
const installModal = document.querySelector("#installModal");
const installInstructions = document.querySelector("#installInstructions");
const closeInstall = document.querySelector("#closeInstall");
const helpButton = document.querySelector("#helpButton");
const helpModal = document.querySelector("#helpModal");
const closeHelp = document.querySelector("#closeHelp");
const toast = document.querySelector("#toast");
const blockedKeys = new Set(["Enter", " "]);
const mobileQuery = window.matchMedia("(max-width: 760px)");

let mode = "encode";
let ckPreference = "c";
let vwPreference = "v";
let encodeText = sourceText.value;
let decodeText = "";
let toastTimer = 0;
let isAlphabetOpen = false;
let deferredInstallPrompt = null;

function encodeToUnicode(text) {
  return [...text]
    .map((char) => {
      const lower = char.toLowerCase();
      return runeMap[lower] || char;
    })
    .join("");
}

function getReverseRuneMap() {
  return {
    ...baseReverseRuneMap,
    ᚺ: "h",
    ᚻ: "h",
    ᚲ: ckPreference,
    ᚹ: vwPreference,
  };
}

function decodeRunes(text) {
  const reverseRuneMap = getReverseRuneMap();

  return [...text]
    .map((char) => {
      const lower = char.toLowerCase();
      if (reverseRuneMap[char]) {
        return reverseRuneMap[char];
      }
      if (/[a-z]/.test(lower)) {
        return lower;
      }
      return char;
    })
    .join("");
}

function setMode(nextMode) {
  if (nextMode === mode) {
    return;
  }

  mode = nextMode;
  sourceText.value = mode === "encode" ? encodeText : decodeText;

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  if (mode === "encode") {
    sourceLabel.textContent = "英文";
    primaryLabel.textContent = "洛克语字体预览";
    secondaryLabel.textContent = "Unicode 洛克语";
    decodePreference.hidden = true;
    sourceText.classList.remove("rune-font");
    primaryOutput.classList.add("rune-font");
    secondaryOutput.classList.remove("rune-font");
  } else {
    sourceLabel.textContent = "洛克语";
    primaryLabel.textContent = "英文结果";
    secondaryLabel.textContent = "保留文本";
    decodePreference.hidden = false;
    sourceText.classList.add("rune-font");
    primaryOutput.classList.remove("rune-font");
    secondaryOutput.classList.add("rune-font");
  }

  setAlphabetOpen(mode === "decode" && mobileQuery.matches);
  updateOutput();
}

function updateOutput() {
  const input = sourceText.value;

  if (mode === "encode") {
    primaryOutput.value = input;
    secondaryOutput.value = encodeToUnicode(input);
    return;
  }

  primaryOutput.value = decodeRunes(input);
  secondaryOutput.value = input;
}

async function copyText(value) {
  if (!value) {
    showToast("没有内容");
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    showToast("已复制");
  } catch {
    showToast("复制失败");
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 1500);
}

function renderAlphabet() {
  alphabetGrid.innerHTML = alphabet
    .map(
      (entry) => `
        <button class="alphabet-cell" type="button" data-letter="${entry.insert}" aria-label="${entry.letters}">
          <span class="alphabet-rune">${entry.insert}</span>
          <span class="alphabet-letter">${entry.letters} · ${entry.rune}</span>
        </button>
      `,
    )
    .join("");
}

function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function getInstallInstructions() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);

  if (window.location.protocol === "file:") {
    return [
      "PWA 安装需要通过本地服务器或 HTTPS 打开页面。",
      "开发时可以运行 python3 -m http.server 4173，然后访问 http://localhost:4173/。",
    ];
  }

  if (!window.isSecureContext) {
    return [
      "当前地址不是安全连接，手机浏览器不会允许安装 PWA。",
      "请用 HTTPS 地址访问，例如部署到 GitHub Pages、Cloudflare Pages、Netlify，或用 HTTPS 隧道测试。",
      "http://localhost 只对同一台设备有效；手机访问电脑的局域网 IP 不算 localhost。",
    ];
  }

  if (isIos) {
    return [
      "在 Safari 中点击底部的分享按钮。",
      "选择“添加到主屏幕”。",
      "确认名称后点击“添加”。",
    ];
  }

  if (isAndroid) {
    return [
      "如果没有弹出安装窗口，请稍等几秒再点一次安装。",
      "也可以打开浏览器菜单，选择“安装应用”或“添加到主屏幕”。",
    ];
  }

  return [
    "如果没有弹出安装窗口，请查看地址栏右侧或浏览器菜单。",
    "选择“安装应用”或“添加到主屏幕”。",
  ];
}

function showInstallInstructions() {
  installInstructions.innerHTML = getInstallInstructions()
    .map((instruction, index) => `<p><strong>${index + 1}.</strong> ${instruction}</p>`)
    .join("");
  installModal.hidden = false;
  installModal.querySelector(".help-modal").focus();
}

function closeInstallModal() {
  installModal.hidden = true;
  installButton.focus();
}

function setAlphabetOpen(isOpen) {
  isAlphabetOpen = isOpen;
  alphabetPanel.classList.toggle("open", isOpen);
  document.body.classList.toggle("alphabet-open", isOpen && mobileQuery.matches);
  alphabetToggle.setAttribute("aria-expanded", String(isOpen));
  alphabetToggle.textContent = isOpen ? "收起" : "展开";
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

sourceText.addEventListener("input", () => {
  if (mode === "encode") {
    encodeText = sourceText.value;
  } else {
    decodeText = sourceText.value;
  }

  updateOutput();
});

sourceText.addEventListener("beforeinput", (event) => {
  if (mode !== "decode") {
    return;
  }

  const allowedInputTypes = new Set([
    "deleteContentBackward",
    "deleteContentForward",
    "deleteByCut",
    "historyUndo",
    "historyRedo",
  ]);

  if (!allowedInputTypes.has(event.inputType)) {
    event.preventDefault();
  }
});

sourceText.addEventListener("keydown", (event) => {
  if (mode !== "decode") {
    return;
  }

  const allowedKeys = new Set([
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Backspace",
    "Delete",
    "Tab",
    "Home",
    "End",
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "Escape",
  ]);

  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (allowedKeys.has(event.key)) {
    return;
  }

  if (blockedKeys.has(event.key) || event.key.length === 1) {
    event.preventDefault();
  }
});

sourceText.addEventListener("paste", (event) => {
  if (mode === "decode") {
    event.preventDefault();
  }
});

clearButton.addEventListener("click", () => {
  sourceText.value = "";
  if (mode === "encode") {
    encodeText = "";
  } else {
    decodeText = "";
  }
  sourceText.focus();
  updateOutput();
});

copySecondary.addEventListener("click", () => copyText(secondaryOutput.value));

installButton.addEventListener("click", async () => {
  if (isStandaloneApp()) {
    showToast("已安装");
    return;
  }

  if (!deferredInstallPrompt) {
    showInstallInstructions();
    return;
  }

  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;

  if (choice.outcome === "accepted") {
    installButton.hidden = true;
    showToast("安装完成");
  } else {
    showToast("已取消安装");
  }
});

alphabetToggle.addEventListener("click", () => setAlphabetOpen(!isAlphabetOpen));

mobileQuery.addEventListener("change", () => {
  setAlphabetOpen(mobileQuery.matches && mode === "decode");
});

decodeOptions.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.group;
    const value = button.dataset.value;

    if (group === "ck") {
      ckPreference = value;
    }

    if (group === "vw") {
      vwPreference = value;
    }

    decodeOptions.forEach((option) => {
      if (option.dataset.group === group) {
        const isActive = option.dataset.value === value;
        option.classList.toggle("active", isActive);
        option.setAttribute("aria-checked", String(isActive));
      }
    });
    updateOutput();
  });
});

function openHelp() {
  helpModal.hidden = false;
  helpModal.querySelector(".help-modal").focus();
}

function closeHelpModal() {
  helpModal.hidden = true;
  helpButton.focus();
}

helpButton.addEventListener("click", openHelp);
closeHelp.addEventListener("click", closeHelpModal);
helpModal.addEventListener("click", (event) => {
  if (event.target === helpModal) {
    closeHelpModal();
  }
});

closeInstall.addEventListener("click", closeInstallModal);
installModal.addEventListener("click", (event) => {
  if (event.target === installModal) {
    closeInstallModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (!helpModal.hidden) {
    closeHelpModal();
  }

  if (!installModal.hidden) {
    closeInstallModal();
  }
});

alphabetGrid.addEventListener("click", (event) => {
  const cell = event.target.closest(".alphabet-cell");
  if (!cell) {
    return;
  }

  const textToInsert = mode === "encode" ? cell.dataset.letter : runeMap[cell.dataset.letter];
  const start = sourceText.selectionStart;
  const end = sourceText.selectionEnd;
  sourceText.setRangeText(textToInsert, start, end, "end");
  sourceText.focus();
  updateOutput();
});

renderAlphabet();
setAlphabetOpen(false);
updateOutput();

if (isStandaloneApp()) {
  installButton.hidden = true;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installButton.hidden = true;
  showToast("安装完成");
});

if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      showToast("离线缓存暂不可用");
    });
  });
}
