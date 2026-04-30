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

const codeAlphabet = [
  "ᚨ",
  "ᛒ",
  "ᚲ",
  "ᛞ",
  "ᛖ",
  "ᚠ",
  "ᚷ",
  "ᚺ",
  "ᛁ",
  "ᛃ",
  "ᛚ",
  "ᛗ",
  "ᚾ",
  "ᛟ",
  "ᛈ",
  "ᛝ",
  "ᚱ",
  "ᛊ",
  "ᛏ",
  "ᚢ",
  "ᚹ",
  "ᚦ",
  "ᛇ",
  "ᛉ",
];

const codeReverseAlphabet = Object.fromEntries(
  codeAlphabet.map((rune, index) => [rune, index]),
);
const runeDisplayMap = Object.fromEntries(alphabet.map((entry) => [entry.rune, entry.insert]));
const ambiguousReverseRuneMap = {
  ᚲ: ["c", "k"],
  ᚹ: ["v", "w"],
};
const maxDecodeCandidates = 64;

const legacyCodeAlphabet = codeAlphabet.slice(0, 16);
const legacyCodeReverseAlphabet = Object.fromEntries(
  legacyCodeAlphabet.map((rune, index) => [rune, index]),
);

const forgivingTextDecoder = new TextDecoder("utf-8");
const sourceText = document.querySelector("#sourceText");
const sourceEditor = document.querySelector("#sourceEditor");
const sourceDisplay = document.querySelector("#sourceDisplay");
const workbench = document.querySelector(".workbench");
const sourcePanel = document.querySelector(".source-panel");
const sourceLabel = document.querySelector("#sourceLabel");
const primaryLabel = document.querySelector("#primaryLabel");
const secondaryLabel = document.querySelector("#secondaryLabel");
const primaryOutput = document.querySelector("#primaryOutput");
const resultSubheading = document.querySelector("#resultSubheading");
const secondaryOutput = document.querySelector("#secondaryOutput");
const alphabetPanel = document.querySelector("#alphabetPanel");
const alphabetTitle = document.querySelector("#alphabetTitle");
const alphabetGrid = document.querySelector("#alphabetGrid");
const alphabetToggle = document.querySelector("#alphabetToggle");
const modeButtons = document.querySelectorAll(".mode-button");
const clearButton = document.querySelector("#clearButton");
const copyPrimary = document.querySelector("#copyPrimary");
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
const floatingAlphabetQuery = window.matchMedia("(max-width: 760px) and (pointer: coarse)");

const modeCopy = {
  englishEncode: {
    sourceLabel: "英文",
    primaryLabel: "洛克语字体预览",
    secondaryLabel: "Unicode 洛克语",
    alphabetTitle: "字符表",
  },
  englishDecode: {
    sourceLabel: "洛克语",
    primaryLabel: "英文结果",
    secondaryLabel: "可能组合",
    alphabetTitle: "字符表",
  },
  codeEncode: {
    sourceLabel: "任意文字",
    primaryLabel: "洛克语编码",
    secondaryLabel: "",
    alphabetTitle: "编码表",
  },
  codeDecode: {
    sourceLabel: "洛克语编码",
    primaryLabel: "原文",
    secondaryLabel: "",
    alphabetTitle: "编码表",
  },
};

let mode = "englishEncode";
let modeText = {
  englishEncode: sourceText.value,
  englishDecode: "ᚱᛟᚲᛟ",
  codeEncode: "洛克王国 roco kingdom",
  codeDecode:
    "ᚨᚲᚨᛗᚢᛃᚨᛒᚾᛞᛞᛞᚨᚲᛞᛁᛗᛈᚨᛒᛈᛝᚦᛞᚨᚨᚨᛒᛁᚷᚨᚨᚨᛖᛏᚹᚨᚨᚨᛖᛝᚠᚨᚨᚨᛖᛞᛊᚨᚨᚨᛖᛝᚠᚨᚨᚨᛒᛁᚷᚨᚨᚨᛖᛗᛃᚨᚨᚨᛖᛃᛉᚨᚨᚨᛖᛈᚨᚨᚨᚨᛖᚺᛟᚨᚨᚨᛖᛖᛇᚨᚨᚨᛖᛝᚠᚨᚨᚨᛖᛟᚢ",
};
let ckPreference = "c";
let vwPreference = "v";
let toastTimer = 0;
let isAlphabetOpen = false;
let deferredInstallPrompt = null;

function isCodeMode() {
  return mode === "codeEncode" || mode === "codeDecode";
}

function isRuneInputMode() {
  return mode === "englishDecode" || mode === "codeDecode";
}

function usesFloatingAlphabet() {
  return floatingAlphabetQuery.matches;
}

function isSymbolOnlyInput() {
  return isRuneInputMode() && usesFloatingAlphabet();
}

function syncSourceInputAffordance() {
  const symbolOnly = isSymbolOnlyInput();
  sourceText.readOnly = false;
  sourceText.inputMode = symbolOnly ? "none" : "text";
  sourceText.setAttribute("aria-readonly", "false");
  sourceText.classList.toggle("symbol-only-input", symbolOnly);
}

function encodeToUnicode(text) {
  return [...text]
    .map((char) => {
      const lower = char.toLowerCase();
      return runeMap[lower] || char;
    })
    .join("");
}

function getRuneDisplayText(text) {
  return [...text].map((char) => runeDisplayMap[char] || char).join("");
}

function updateSourceDisplay() {
  const isActive = isRuneInputMode();
  sourceEditor.classList.toggle("rune-display-active", isActive);
  sourceDisplay.textContent = isActive ? getRuneDisplayText(sourceText.value) : "";
  sourceDisplay.scrollTop = sourceText.scrollTop;
  sourceDisplay.scrollLeft = sourceText.scrollLeft;
}

function syncAlphabetPlacement() {
  const shouldEmbed = isRuneInputMode() && !usesFloatingAlphabet();
  const nextParent = shouldEmbed ? sourcePanel : workbench;

  if (alphabetPanel.parentElement !== nextParent) {
    nextParent.appendChild(alphabetPanel);
  }

  sourcePanel.classList.toggle("with-inline-alphabet", shouldEmbed);
  alphabetToggle.hidden = !usesFloatingAlphabet();
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

function getRuneDecodeChoices(char) {
  if (ambiguousReverseRuneMap[char]) {
    return ambiguousReverseRuneMap[char];
  }

  const reverseRuneMap = getReverseRuneMap();
  const lower = char.toLowerCase();

  if (reverseRuneMap[char]) {
    return [reverseRuneMap[char]];
  }
  if (/[a-z]/.test(lower)) {
    return [lower];
  }
  return [char];
}

function getAmbiguousRuneCount(text) {
  return [...text].filter((char) => ambiguousReverseRuneMap[char]).length;
}

function getMarkedDecode(text) {
  return [...text]
    .map((char) => {
      const choices = ambiguousReverseRuneMap[char];
      return choices ? `(${choices.join("/")})` : getRuneDecodeChoices(char)[0];
    })
    .join("");
}

function getDecodeCandidates(text) {
  let candidates = [""];
  let isTruncated = false;

  for (const char of text) {
    const choices = getRuneDecodeChoices(char);
    const nextCandidates = [];

    for (const candidate of candidates) {
      for (const choice of choices) {
        if (nextCandidates.length < maxDecodeCandidates) {
          nextCandidates.push(candidate + choice);
        } else {
          isTruncated = true;
        }
      }
    }

    candidates = nextCandidates;
  }

  return { candidates, isTruncated };
}

function getDecodeDetails(text) {
  if (!text) {
    return "";
  }

  const ambiguousCount = getAmbiguousRuneCount(text);
  if (ambiguousCount === 0) {
    return `没有 C/K 或 V/W 歧义。\n保留文本：${text}`;
  }

  const { candidates, isTruncated } = getDecodeCandidates(text);
  const candidateTitle = isTruncated ? `可能组合（前 ${maxDecodeCandidates} 条）` : "可能组合";

  return [
    `发现 ${ambiguousCount} 个歧义字符。`,
    `歧义标记：${getMarkedDecode(text)}`,
    `${candidateTitle}：`,
    ...candidates.map((candidate, index) => `${index + 1}. ${candidate}`),
  ].join("\n");
}

function getCodeDigits(value, size) {
  const digits = Array(size).fill(0);
  let nextValue = value;

  for (let index = size - 1; index >= 0; index -= 1) {
    digits[index] = nextValue % codeAlphabet.length;
    nextValue = Math.floor(nextValue / codeAlphabet.length);
  }

  return digits;
}

function getCodeChecksum(digits) {
  const sum = digits.reduce((total, digit, index) => total + digit * (index + 1), digits.length);
  return (sum + digits.length) % codeAlphabet.length;
}

function encodeCodePoint(char) {
  const codePoint = char.codePointAt(0);
  const digits = getCodeDigits(codePoint, 5);
  const checksum = getCodeChecksum(digits);

  return [...digits, checksum].map((digit) => codeAlphabet[digit]).join("");
}

function encodeTextToCode(text) {
  return [...text].map(encodeCodePoint).join("");
}

function getCodeCharacters(text) {
  return [...text].filter((char) => codeReverseAlphabet[char] !== undefined);
}

function getTokenValue(digits) {
  return digits.reduce((value, digit) => value * codeAlphabet.length + digit, 0);
}

function decodeCodeToken(token) {
  const digits = [...token].map((char) => codeReverseAlphabet[char]);

  if (digits.some((digit) => digit === undefined)) {
    return {
      ok: false,
      text: "□",
    };
  }

  const digitCount = digits.length - 1;
  if (digitCount !== 5) {
    return {
      ok: false,
      text: "□",
    };
  }

  const codeDigits = digits.slice(0, -1);
  const expectedChecksum = getCodeChecksum(codeDigits);
  const actualChecksum = digits.at(-1);

  if (actualChecksum !== expectedChecksum) {
    return {
      ok: false,
      text: "□",
    };
  }

  const value = getTokenValue(codeDigits);
  const invalidCodePoint = value > 0x10ffff || (value >= 0xd800 && value <= 0xdfff);

  if (invalidCodePoint) {
    return {
      ok: false,
      text: "□",
    };
  }

  return {
    ok: true,
    text: String.fromCodePoint(value),
  };
}

function decodeLegacyCode(tokens) {
  const runes = tokens.join("");
  const invalidCharacters = [...runes].filter((char) => legacyCodeReverseAlphabet[char] === undefined);

  if (invalidCharacters.length > 0) {
    return {
      ok: false,
      text: "□",
    };
  }

  if (runes.length % 2 !== 0) {
    return {
      ok: false,
      text: "□",
    };
  }

  const bytes = new Uint8Array(runes.length / 2);
  for (let index = 0; index < runes.length; index += 2) {
    const high = legacyCodeReverseAlphabet[runes[index]];
    const low = legacyCodeReverseAlphabet[runes[index + 1]];
    bytes[index / 2] = (high << 4) | low;
  }

  return {
    ok: true,
    text: forgivingTextDecoder.decode(bytes),
  };
}

function isValidCodeToken(chars, startIndex) {
  if (startIndex < 0 || startIndex + 6 > chars.length) {
    return false;
  }

  return decodeCodeToken(chars.slice(startIndex, startIndex + 6).join("")).ok;
}

function decodeCurrentCode(chars) {
  let index = 0;
  let output = "";
  let hasError = false;

  while (index < chars.length) {
    const token = chars.slice(index, index + 6).join("");

    if (token.length < 6) {
      output += "□";
      hasError = true;
      break;
    }

    const decoded = decodeCodeToken(token);
    if (decoded.ok) {
      output += decoded.text;
      index += 6;
      continue;
    }

    hasError = true;
    const nextBoundaryWorks = isValidCodeToken(chars, index + 6);
    if (nextBoundaryWorks) {
      output += "□";
      index += 6;
      continue;
    }

    let recoveryIndex = -1;
    for (let offset = 1; offset <= 7; offset += 1) {
      if (isValidCodeToken(chars, index + offset)) {
        recoveryIndex = index + offset;
        break;
      }
    }

    output += "□";
    index = recoveryIndex === -1 ? index + 6 : recoveryIndex;
  }

  return {
    ok: !hasError,
    text: output,
  };
}

function decodeCode(text) {
  const chars = getCodeCharacters(text);

  if (chars.length === 0) {
    return { ok: true, text: "" };
  }

  const currentResult = decodeCurrentCode(chars);
  const canTryLegacy = chars.every((char) => legacyCodeReverseAlphabet[char] !== undefined);

  if (!currentResult.ok && canTryLegacy) {
    return decodeLegacyCode(chars.join("").match(/.{1,2}/gu) || []);
  }

  return currentResult;
}

function setMode(nextMode) {
  if (nextMode === mode) {
    return;
  }

  modeText[mode] = sourceText.value;
  mode = nextMode;
  sourceText.value = modeText[mode];

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  syncModeUi();
  updateOutput();
}

function syncModeUi() {
  const copy = modeCopy[mode];
  sourceLabel.textContent = copy.sourceLabel;
  primaryLabel.textContent = copy.primaryLabel;
  secondaryLabel.textContent = copy.secondaryLabel;
  alphabetTitle.textContent = copy.alphabetTitle;

  const secondaryHidden = isCodeMode();
  const sourceUsesRuneFont = mode === "englishDecode" || mode === "codeDecode";
  const primaryUsesRuneFont = mode === "englishEncode" || mode === "codeEncode";
  const secondaryUsesRuneFont = mode === "codeEncode";

  sourceText.classList.toggle("rune-font", sourceUsesRuneFont);
  primaryOutput.classList.toggle("rune-font", primaryUsesRuneFont);
  secondaryOutput.classList.toggle("rune-font", secondaryUsesRuneFont);
  decodePreference.hidden = mode !== "englishDecode";
  copyPrimary.hidden = mode === "englishEncode";
  resultSubheading.hidden = secondaryHidden;
  secondaryOutput.hidden = secondaryHidden;

  syncAlphabetPlacement();
  renderAlphabet();
  setAlphabetOpen(usesFloatingAlphabet() && (mode === "englishDecode" || mode === "codeDecode"));
  syncSourceInputAffordance();
  updateSourceDisplay();
}

function updateOutput() {
  const input = sourceText.value;
  modeText[mode] = input;
  updateSourceDisplay();
  primaryOutput.classList.remove("error-output");

  if (mode === "englishEncode") {
    primaryOutput.value = input;
    secondaryOutput.value = encodeToUnicode(input);
    return;
  }

  if (mode === "englishDecode") {
    primaryOutput.value = decodeRunes(input);
    secondaryOutput.value = getDecodeDetails(input);
    return;
  }

  if (mode === "codeEncode") {
    primaryOutput.value = encodeTextToCode(input);
    secondaryOutput.value = "";
    return;
  }

  const result = decodeCode(input);
  primaryOutput.value = result.text;
  primaryOutput.classList.toggle("error-output", !result.ok);
  secondaryOutput.value = "";
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
  if (isCodeMode()) {
    alphabetGrid.innerHTML = codeAlphabet
      .map(
        (rune, index) => `
          <button class="alphabet-cell" type="button" data-rune="${rune}" aria-label="${index.toString(16).toUpperCase()}">
            <span class="alphabet-rune">${rune}</span>
            <span class="alphabet-letter">${index.toString(16).toUpperCase()}</span>
          </button>
        `,
      )
      .join("");
    return;
  }

  alphabetGrid.innerHTML = alphabet
    .map(
      (entry) => `
        <button class="alphabet-cell" type="button" data-letter="${entry.insert}" data-rune="${entry.rune}" aria-label="${entry.letters}">
          <span class="alphabet-rune">${entry.insert}</span>
          <span class="alphabet-letter">${entry.letters}</span>
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
  isAlphabetOpen = usesFloatingAlphabet() && isOpen;
  alphabetPanel.classList.toggle("open", isOpen);
  document.body.classList.toggle("alphabet-open", isAlphabetOpen);
  alphabetToggle.hidden = !usesFloatingAlphabet();
  alphabetToggle.setAttribute("aria-expanded", String(isAlphabetOpen));
  alphabetToggle.textContent = isAlphabetOpen ? "收起" : "展开";
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

sourceText.addEventListener("input", updateOutput);
sourceText.addEventListener("scroll", updateSourceDisplay);

sourceText.addEventListener("beforeinput", (event) => {
  if (!isRuneInputMode()) {
    return;
  }

  const allowedInputTypes = new Set([
    "deleteContentBackward",
    "deleteContentForward",
    "deleteWordBackward",
    "deleteWordForward",
    "deleteHardLineBackward",
    "deleteHardLineForward",
    "deleteSoftLineBackward",
    "deleteSoftLineForward",
    "deleteByCut",
    "insertFromPaste",
    "historyUndo",
    "historyRedo",
  ]);

  if (!allowedInputTypes.has(event.inputType)) {
    event.preventDefault();
  }
});

sourceText.addEventListener("keydown", (event) => {
  if (!isRuneInputMode()) {
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

clearButton.addEventListener("click", () => {
  sourceText.value = "";
  modeText[mode] = "";
  if (!isSymbolOnlyInput()) {
    sourceText.focus();
  }
  updateOutput();
});

copyPrimary.addEventListener("click", () => copyText(primaryOutput.value));
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

function handleResponsiveAlphabetChange() {
  syncAlphabetPlacement();
  setAlphabetOpen(usesFloatingAlphabet() && (mode === "englishDecode" || mode === "codeDecode"));
  syncSourceInputAffordance();
}

mobileQuery.addEventListener("change", handleResponsiveAlphabetChange);
floatingAlphabetQuery.addEventListener("change", handleResponsiveAlphabetChange);

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

  const textToInsert = isCodeMode() || mode === "englishDecode" ? cell.dataset.rune : cell.dataset.letter;
  const start = sourceText.selectionStart;
  const end = sourceText.selectionEnd;
  const nextSelection = start + textToInsert.length;
  sourceText.value = `${sourceText.value.slice(0, start)}${textToInsert}${sourceText.value.slice(end)}`;
  sourceText.setSelectionRange(nextSelection, nextSelection);
  if (!isSymbolOnlyInput()) {
    sourceText.focus();
  }
  updateOutput();
});

syncModeUi();
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
