const STORAGE_KEY = "solo-budget-v1";
const supportedCurrencies = ["USD", "EUR", "GBP", "CAD", "AUD", "CHF", "JPY", "PLN", "RON", "TRY"];

const defaultExpenseCategories = [
  "Groceries",
  "Rent",
  "Utilities",
  "Transport",
  "Eating out",
  "Shopping",
  "Health",
  "Insurance",
  "Subscriptions",
  "Travel",
  "Education",
  "Home",
  "Taxes",
  "Other"
];

const defaultIncomeCategories = [
  "Salary",
  "Freelance",
  "Side business",
  "Investments",
  "Refund",
  "Gift",
  "Other income"
];

const defaultSavingsCategories = [
  "Emergency fund",
  "Vacation",
  "Home deposit",
  "Investments",
  "Retirement",
  "Big purchase",
  "Other savings"
];

const defaultInvestmentCategories = [
  "Stocks",
  "ETF",
  "Mutual fund",
  "Retirement account",
  "Crypto",
  "Bonds",
  "Real estate",
  "Other investment"
];

const recognitionRules = [
  { category: "Groceries", words: ["grocery", "groceries", "supermarket", "lidl", "kaufland", "aldi", "carrefour", "tesco", "walmart", "food market"] },
  { category: "Rent", words: ["rent", "landlord", "apartment", "lease"] },
  { category: "Utilities", words: ["electric", "water", "gas", "heating", "utility", "internet", "phone bill", "mobile plan"] },
  { category: "Transport", words: ["fuel", "gas station", "metro", "bus", "train", "taxi", "uber", "bolt", "parking", "car wash"] },
  { category: "Eating out", words: ["restaurant", "cafe", "coffee", "bar", "takeaway", "delivery", "pizza", "sushi"] },
  { category: "Shopping", words: ["amazon", "clothes", "shoes", "mall", "electronics", "store"] },
  { category: "Health", words: ["doctor", "pharmacy", "medicine", "dentist", "clinic", "gym"] },
  { category: "Insurance", words: ["insurance", "policy"] },
  { category: "Subscriptions", words: ["netflix", "spotify", "subscription", "apple", "google", "microsoft", "adobe", "prime"] },
  { category: "Travel", words: ["hotel", "flight", "airline", "booking", "airbnb", "trip"] },
  { category: "Education", words: ["course", "book", "tuition", "school", "university", "training"] },
  { category: "Home", words: ["furniture", "repair", "hardware", "decor", "cleaning"] },
  { category: "Taxes", words: ["tax", "vat", "revenue"] },
  { category: "Salary", type: "income", words: ["salary", "payroll", "wage", "employer"] },
  { category: "Freelance", type: "income", words: ["freelance", "client", "contract"] },
  { category: "Investments", type: "income", words: ["dividend", "interest", "investment"] },
  { category: "Refund", type: "income", words: ["refund", "rebate", "cashback"] },
  { category: "Emergency fund", type: "savings", words: ["emergency", "rainy day"] },
  { category: "Vacation", type: "savings", words: ["vacation", "holiday", "trip savings"] },
  { category: "Retirement", type: "savings", words: ["retirement", "pension"] },
  { category: "Investments", type: "savings", words: ["investment", "brokerage", "stocks", "etf"] },
  { category: "Home deposit", type: "savings", words: ["deposit", "house", "home"] },
  { category: "Stocks", type: "investment", words: ["stock", "shares", "equity"] },
  { category: "ETF", type: "investment", words: ["etf", "index fund"] },
  { category: "Crypto", type: "investment", words: ["crypto", "bitcoin", "ethereum"] },
  { category: "Bonds", type: "investment", words: ["bond", "treasury"] },
  { category: "Real estate", type: "investment", words: ["real estate", "reit", "property"] }
];

const categoryColors = ["#2563eb", "#dc4c4c", "#059669", "#f59e0b", "#7c3aed", "#0891b2", "#475569", "#be123c", "#4338ca", "#ea580c"];

const els = {
  appShell: document.querySelector(".app-shell"),
  sidebar: document.querySelector(".sidebar"),
  menuButton: document.querySelector(".menu-button"),
  navLinks: document.querySelectorAll(".side-nav a"),
  form: document.querySelector("#transactionForm"),
  transactionId: document.querySelector("#transactionId"),
  amount: document.querySelector("#amount"),
  transactionCurrency: document.querySelector("#transactionCurrency"),
  date: document.querySelector("#date"),
  exchangeRate: document.querySelector("#exchangeRate"),
  exchangeRateLabel: document.querySelector("#exchangeRateLabel"),
  description: document.querySelector("#description"),
  merchant: document.querySelector("#merchant"),
  merchantLabel: document.querySelector("#merchantLabel"),
  category: document.querySelector("#category"),
  categoryOptions: document.querySelector("#categoryOptions"),
  account: document.querySelector("#account"),
  cancelEdit: document.querySelector("#cancelEdit"),
  todayLabel: document.querySelector("#todayLabel"),
  reportMonth: document.querySelector("#reportMonth"),
  currency: document.querySelector("#currency"),
  themeButtons: document.querySelectorAll("[data-theme-choice]"),
  metricsGrid: document.querySelector("#metricsGrid"),
  overviewInsight: document.querySelector("#overviewInsight"),
  overviewFlow: document.querySelector("#overviewFlow"),
  monthlyPictureChart: document.querySelector("#monthlyPictureChart"),
  monthlyChartTooltip: document.querySelector("#monthlyChartTooltip"),
  yearOverviewInsight: document.querySelector("#yearOverviewInsight"),
  yearOverviewFlow: document.querySelector("#yearOverviewFlow"),
  breakdownInsight: document.querySelector("#breakdownInsight"),
  breakdownPeriod: document.querySelector("#breakdownPeriod"),
  breakdownChart: document.querySelector("#breakdownChart"),
  breakdownChartTooltip: document.querySelector("#breakdownChartTooltip"),
  breakdownList: document.querySelector("#breakdownList"),
  monthComparisonInsight: document.querySelector("#monthComparisonInsight"),
  monthComparisonHead: document.querySelector("#monthComparisonHead"),
  monthComparisonTable: document.querySelector("#monthComparisonTable"),
  search: document.querySelector("#search"),
  typeFilter: document.querySelector("#typeFilter"),
  dateFromFilter: document.querySelector("#dateFromFilter"),
  dateToFilter: document.querySelector("#dateToFilter"),
  amountModeFilter: document.querySelector("#amountModeFilter"),
  amountValueFilter: document.querySelector("#amountValueFilter"),
  sortFilter: document.querySelector("#sortFilter"),
  transactionCount: document.querySelector("#transactionCount"),
  transactionsTable: document.querySelector("#transactionsTable"),
  emptyRowTemplate: document.querySelector("#emptyRowTemplate"),
  exportData: document.querySelector("#exportData"),
  importData: document.querySelector("#importData"),
  exportCsv: document.querySelector("#exportCsv"),
  storageStatus: document.querySelector("#storageStatus"),
  goalForm: document.querySelector("#goalForm"),
  goalName: document.querySelector("#goalName"),
  goalAmount: document.querySelector("#goalAmount"),
  goalsInsight: document.querySelector("#goalsInsight"),
  goalsList: document.querySelector("#goalsList"),
  investmentsInsight: document.querySelector("#investmentsInsight"),
  investmentsList: document.querySelector("#investmentsList")
};

let state = loadState();
let breakdownView = "expense";
let monthlyChartBars = [];
let breakdownChartItems = [];
let yearDonutSlices = [];

function reportLabels(type) {
  if (type === "income") {
    return {
      dataName: "income",
      plural: "income",
      singular: "income source",
      emptyMonthly: "No monthly income data",
      emptyYearly: "No yearly income data"
    };
  }
  if (type === "savings") {
    return {
      dataName: "savings",
      plural: "savings",
      singular: "savings goal",
      emptyMonthly: "No monthly savings data",
      emptyYearly: "No yearly savings data"
    };
  }
  if (type === "investment") {
    return {
      dataName: "investments",
      plural: "investments",
      singular: "investment",
      emptyMonthly: "No monthly investment data",
      emptyYearly: "No yearly investment data"
    };
  }
  return {
    dataName: "expense",
    plural: "expenses",
    singular: "expense category",
    emptyMonthly: "No monthly expense data",
    emptyYearly: "No yearly expense data"
  };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultState();
  }

  try {
    const parsed = JSON.parse(saved);
    const currency = normalizeCurrency(parsed.settings?.currency || "USD");
    return {
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions.map((item) => normalizeTransaction(item, currency)) : [],
      goals: Array.isArray(parsed.goals) ? parsed.goals.map((goal) => normalizeGoal(goal)) : [],
      settings: {
        currency,
        rates: normalizeRates(parsed.settings?.rates || {}, currency),
        theme: normalizeTheme(parsed.settings?.theme || "light"),
        browserSavedAt: parsed.settings?.browserSavedAt || "",
        fileSavedAt: parsed.settings?.fileSavedAt || ""
      }
    };
  } catch {
    return defaultState();
  }
}

function defaultState() {
  return { transactions: [], goals: [], settings: { currency: "USD", rates: normalizeRates({}, "USD"), theme: "light", browserSavedAt: "", fileSavedAt: "" } };
}

function saveState() {
  state.settings = state.settings || {};
  state.settings.browserSavedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(String(value || ""));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function deriveBackupKey(password, salt) {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptBackupPayload(payload, password) {
  if (!crypto.subtle) {
    throw new Error("Password-protected files need a modern secure browser context.");
  }
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveBackupKey(password, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(payload)
  );
  return JSON.stringify({
    app: "Solo Budget",
    encrypted: true,
    version: 1,
    algorithm: "PBKDF2-SHA256-AES-GCM",
    iterations: 250000,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    data: bytesToBase64(new Uint8Array(encrypted))
  }, null, 2);
}

async function decryptBackupPayload(parsed, password) {
  if (!parsed?.encrypted) return parsed;
  if (!crypto.subtle) {
    throw new Error("Password-protected files need a modern secure browser context.");
  }
  if (parsed.algorithm !== "PBKDF2-SHA256-AES-GCM" || parsed.version !== 1) {
    throw new Error("Unsupported encrypted budget file");
  }
  const salt = base64ToBytes(parsed.salt);
  const iv = base64ToBytes(parsed.iv);
  const encrypted = base64ToBytes(parsed.data);
  const key = await deriveBackupKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
  return JSON.parse(new TextDecoder().decode(decrypted));
}

function todayISO() {
  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function normalizeCurrency(currency) {
  if (currency === "BGN") return "EUR";
  return supportedCurrencies.includes(currency) ? currency : "USD";
}

function normalizeTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

function cleanText(value, maxLength = 160) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength);
}

function cleanId(value) {
  const text = cleanText(value, 80);
  return /^[a-zA-Z0-9_-]{1,80}$/.test(text) ? text : crypto.randomUUID();
}

function cleanDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? String(value) : todayISO();
}

function cleanDateTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function cleanAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

function applyTheme() {
  const theme = normalizeTheme(state.settings?.theme || "light");
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  syncThemeControl(theme);
}

function syncThemeControl(theme = normalizeTheme(state.settings?.theme || "light")) {
  els.themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
}

function normalizeRates(rates, defaultCurrency) {
  const cleaned = {};
  supportedCurrencies.forEach((currency) => {
    const value = Number(rates[currency]);
    cleaned[currency] = currency === defaultCurrency ? 1 : (Number.isFinite(value) && value > 0 ? value : "");
  });
  return cleaned;
}

function normalizeTransaction(item = {}, fallbackCurrency = "USD") {
  const defaultCurrency = normalizeCurrency(item.currency || fallbackCurrency);
  const type = ["income", "expense", "savings", "investment"].includes(item.type) ? item.type : "expense";
  return {
    id: cleanId(item.id),
    type,
    date: cleanDate(item.date),
    description: cleanText(item.description, 180),
    category: cleanText(item.category, 80),
    amount: cleanAmount(item.amount),
    merchant: cleanText(item.merchant, 120),
    account: cleanText(item.account, 120),
    currency: defaultCurrency,
    exchangeRate: Number(item.exchangeRate) > 0 ? Number(item.exchangeRate) : 1,
    createdAt: cleanDateTime(item.createdAt),
    updatedAt: item.updatedAt ? cleanDateTime(item.updatedAt) : cleanDateTime(item.createdAt)
  };
}

function convertedAmount(item) {
  const itemCurrency = normalizeCurrency(item.currency || state.settings.currency);
  if (itemCurrency === state.settings.currency) return Number(item.amount) || 0;
  const rate = Number(item.exchangeRate) || Number(state.settings.rates?.[itemCurrency]) || 1;
  return (Number(item.amount) || 0) * rate;
}

function currentMonthValue() {
  return todayISO().slice(0, 7);
}

function ensureReportMonth() {
  if (!/^\d{4}-\d{2}$/.test(els.reportMonth.value)) {
    els.reportMonth.value = currentMonthValue();
  }
}

function selectedReportYear() {
  ensureReportMonth();
  return els.reportMonth.value.slice(0, 4);
}

function currency(value) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: state.settings.currency || "USD" }).format(value || 0);
}

function percentOf(value, total) {
  return total ? (Number(value) / total) * 100 : 0;
}

function percentLabel(value, total) {
  const rounded = Math.round(percentOf(value, total) * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}%`;
}

function displayDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(`${value}T00:00:00`));
}

function displayDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function activeType() {
  return new FormData(els.form).get("type") || "expense";
}

function categoryPool(type = activeType()) {
  const defaults = type === "income"
    ? defaultIncomeCategories
    : type === "savings"
      ? defaultSavingsCategories
      : type === "investment"
        ? defaultInvestmentCategories
        : defaultExpenseCategories;
  const custom = state.transactions
    .filter((item) => item.type === type)
    .map((item) => item.category)
    .filter(Boolean);
  return [...new Set([...defaults, ...custom])].sort((a, b) => a.localeCompare(b));
}

function renderCategoryOptions() {
  els.categoryOptions.innerHTML = categoryPool().map((category) => `<option value="${escapeHTML(category)}"></option>`).join("");
}

function suggestCategory() {
  const type = activeType();
  const haystack = `${els.description.value} ${els.merchant.value} ${els.account.value}`.toLowerCase();
  if (!haystack.trim()) return;

  const match = recognitionRules.find((rule) => {
    if (rule.type && rule.type !== type) return false;
    if (!rule.type && type !== "expense") return false;
    return rule.words.some((word) => haystack.includes(word));
  });

  if (match && !els.category.value) {
    els.category.value = match.category;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function monthItems(monthValue) {
  return state.transactions.filter((item) => item.date && item.date.startsWith(monthValue));
}

function yearItems(yearValue) {
  return state.transactions.filter((item) => item.date && item.date.startsWith(String(yearValue)));
}

function sum(items, type) {
  return items.filter((item) => item.type === type).reduce((total, item) => total + convertedAmount(item), 0);
}

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const key = item.category || "Uncategorized";
    acc[key] = (acc[key] || 0) + convertedAmount(item);
    return acc;
  }, {});
}

function renderMetrics(monthTransactions) {
  const income = sum(monthTransactions, "income");
  const expenses = sum(monthTransactions, "expense");
  const savings = sum(monthTransactions, "savings");
  const investments = sum(monthTransactions, "investment");
  const balance = income - expenses - savings - investments;

  const metrics = [
    ["Income", currency(income)],
    ["Expenses", currency(expenses)],
    ["Savings", currency(savings)],
    ["Available", currency(balance)]
  ];

  els.metricsGrid.innerHTML = metrics.map(([label, value]) => `
    <div class="metric metric-${label.toLowerCase().replaceAll(" ", "-")}">
      <div class="metric-header">
        <span class="metric-label">${escapeHTML(label)}</span>
        <span class="metric-icon" aria-hidden="true">${metricIcon(label)}</span>
      </div>
      <strong>${escapeHTML(value)}</strong>
    </div>
  `).join("");

  renderMonthlyPictureChart();
}

function allTimeTotal(type) {
  return sum(state.transactions, type);
}

function savingsAvailableForGoals() {
  return allTimeTotal("savings") - allTimeTotal("investment");
}

function normalizeGoal(goal = {}) {
  return {
    id: cleanId(goal.id),
    name: cleanText(goal.name, 180),
    amount: cleanAmount(goal.amount),
    createdAt: cleanDateTime(goal.createdAt),
    updatedAt: goal.updatedAt ? cleanDateTime(goal.updatedAt) : cleanDateTime(goal.createdAt)
  };
}

function metricIcon(label) {
  const icons = {
    Income: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M4 7.5h13.5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"></path>
        <path d="M16 7.5V5.8a2 2 0 0 0-2.5-1.9L5.7 6"></path>
        <path d="M16.5 12.2h3"></path>
        <path d="M16.5 15.2h3"></path>
      </svg>`,
    Expenses: `
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="3" y="6" width="18" height="12" rx="2"></rect>
        <path d="M3 10h18"></path>
        <path d="M7 15h4"></path>
        <path d="M15.5 15h1.5"></path>
      </svg>`,
    Savings: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M6.5 10.5a5.7 5.7 0 0 1 5.7-4.2h2.3a5.6 5.6 0 0 1 5.5 5.6v1.3a5.6 5.6 0 0 1-4.1 5.4l-.4 2H8.2l-.5-2.1A5.7 5.7 0 0 1 4 13.1v-1.2h2.5Z"></path>
        <path d="M9.4 6.8 8.3 4.6h2.9"></path>
        <path d="M14.2 9.3h-3.3"></path>
        <circle cx="16.6" cy="11.3" r=".5"></circle>
      </svg>`,
    Available: `
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="3" y="5.5" width="18" height="13" rx="2"></rect>
        <path d="M3 9.5h18"></path>
        <path d="M6.5 15h5.5"></path>
      </svg>`,
    "Biggest expense": `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M6 3.8h12v16.4l-2-1.1-2 1.1-2-1.1-2 1.1-2-1.1-2 1.1V3.8Z"></path>
        <path d="M9 8h6"></path>
        <path d="M9 12h6"></path>
        <path d="M9 16h3"></path>
      </svg>`
  };
  return icons[label] || icons.Available;
}

function renderMoneyFlow(container, insightElement, income, expenses, savings, balance) {
  const max = Math.max(income, expenses, savings, Math.max(balance, 0), 1);
  const hasEntries = income || expenses || savings;
  const remaining = Math.max(balance, 0);
  const overBudget = balance < 0;
  insightElement.textContent = !hasEntries
    ? "Add entries to see this picture."
    : overBudget
    ? `Over by ${currency(Math.abs(balance))}.`
    : `Left after expenses and savings: ${currency(remaining)}.`;

  const rows = [
    ["Income", income, "flow-income"],
    ["Expenses", expenses, "flow-expense"],
    ["Savings", savings, "flow-savings"],
    [overBudget ? "Over budget" : "Left", overBudget ? Math.abs(balance) : remaining, "flow-remaining"]
  ];

  container.innerHTML = rows.map(([label, value, className]) => {
    const width = Math.max(2, Math.round((Number(value) / max) * 100));
    return `
      <div class="flow-track ${className}">
        <div class="flow-top"><strong>${escapeHTML(label)}</strong><span>${escapeHTML(currency(Number(value)))}</span></div>
        <div class="flow-bar"><span style="width:${width}%"></span></div>
      </div>
    `;
  }).join("");
}

function renderMonthlyPictureChart() {
  const canvas = els.monthlyPictureChart;
  if (!canvas) return;
  monthlyChartBars = [];
  hideMonthlyChartTooltip();
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const styles = getComputedStyle(document.documentElement);
  const colors = {
    income: styles.getPropertyValue("--income").trim() || "#2563eb",
    expense: styles.getPropertyValue("--expense").trim() || "#dc4c4c",
    savings: styles.getPropertyValue("--savings").trim() || "#059669",
    investment: "#7c3aed",
    panel: styles.getPropertyValue("--chart-bg").trim() || "#ffffff",
    muted: styles.getPropertyValue("--muted").trim() || "#637083",
    line: styles.getPropertyValue("--line").trim() || "#dfe5ee",
    ink: styles.getPropertyValue("--ink").trim() || "#0f1f3d"
  };

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = colors.panel;
  ctx.fillRect(0, 0, width, height);

  const year = selectedReportYear();
  const rows = Array.from({ length: 12 }, (_, index) => {
    const month = `${year}-${String(index + 1).padStart(2, "0")}`;
    const items = monthItems(month);
    return {
      label: monthName(month),
      income: sum(items, "income"),
      expense: sum(items, "expense"),
      savings: sum(items, "savings"),
      investment: sum(items, "investment")
    };
  });

  const max = Math.max(...rows.flatMap((row) => [row.income, row.expense, row.savings, row.investment]), 0);
  if (!max) {
    drawEmptyCanvas(ctx, width, height, `Add entries in ${year} to see this chart.`);
    els.overviewInsight.textContent = `Add entries in ${year} to see monthly trends.`;
    return;
  }

  const highestIncome = rows.reduce((best, row) => row.income > best.income ? row : best, rows[0]);
  const highestExpense = rows.reduce((best, row) => row.expense > best.expense ? row : best, rows[0]);
  els.overviewInsight.textContent = `Highest income: ${highestIncome.label}. Highest expenses: ${highestExpense.label}.`;

  const step = niceStep(max);
  const scaleMax = Math.ceil(max / step) * step;
  const yAxisLabels = [];
  for (let value = 0; value <= scaleMax; value += step) {
    yAxisLabels.push(compactCurrency(value));
  }

  ctx.font = "12px system-ui";
  const widestYAxisLabel = yAxisLabels.reduce((widest, label) => Math.max(widest, ctx.measureText(label).width), 0);
  const padding = { top: 52, right: 24, bottom: 44, left: Math.max(72, Math.ceil(widestYAxisLabel) + 22) };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const groupWidth = chartWidth / 12;
  const barWidth = Math.max(7, Math.min(12, groupWidth / 7));

  ctx.strokeStyle = colors.line;
  ctx.fillStyle = colors.muted;
  ctx.lineWidth = 1;
  ctx.font = "12px system-ui";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  for (let value = 0; value <= scaleMax; value += step) {
    const y = padding.top + chartHeight - (value / scaleMax) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(compactCurrency(value), padding.left - 10, y);
  }

  drawLegend(ctx, [
    ["Income", colors.income],
    ["Expenses", colors.expense],
    ["Savings", colors.savings],
    ["Invested", colors.investment]
  ], padding.left, 22, colors.ink);

  rows.forEach((row, index) => {
    const baseX = padding.left + index * groupWidth + groupWidth / 2;
    const gap = barWidth + 3;
    monthlyChartBars.push(
      { ...drawBar(ctx, baseX - gap * 1.5, row.income, scaleMax, chartHeight, padding, barWidth, colors.income), month: row.label, label: "Income", value: row.income },
      { ...drawBar(ctx, baseX - gap * 0.5, row.expense, scaleMax, chartHeight, padding, barWidth, colors.expense), month: row.label, label: "Expenses", value: row.expense },
      { ...drawBar(ctx, baseX + gap * 0.5, row.savings, scaleMax, chartHeight, padding, barWidth, colors.savings), month: row.label, label: "Savings", value: row.savings },
      { ...drawBar(ctx, baseX + gap * 1.5, row.investment, scaleMax, chartHeight, padding, barWidth, colors.investment), month: row.label, label: "Invested", value: row.investment }
    );
    ctx.fillStyle = colors.muted;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(row.label, baseX, height - padding.bottom + 18);
  });
}

function drawBar(ctx, x, value, scaleMax, chartHeight, padding, barWidth, color) {
  const barHeight = scaleMax ? (value / scaleMax) * chartHeight : 0;
  const y = padding.top + chartHeight - barHeight;
  ctx.fillStyle = color;
  const visibleHeight = Math.max(1, barHeight);
  ctx.fillRect(x - barWidth / 2, y, barWidth, visibleHeight);
  return { color, height: visibleHeight, width: barWidth, x: x - barWidth / 2, y };
}

function handleMonthlyChartHover(event) {
  const canvas = els.monthlyPictureChart;
  const tooltip = els.monthlyChartTooltip;
  if (!canvas || !tooltip || !monthlyChartBars.length) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const tolerance = 6;
  const hit = monthlyChartBars.find((bar) => (
    x >= bar.x - tolerance &&
    x <= bar.x + bar.width + tolerance &&
    y >= bar.y - tolerance &&
    y <= bar.y + bar.height + tolerance
  ));

  if (!hit) {
    hideMonthlyChartTooltip();
    return;
  }

  tooltip.innerHTML = `<strong>${escapeHTML(hit.month)} ${escapeHTML(hit.label)}</strong><span>${currency(hit.value)}</span>`;
  tooltip.style.left = `${event.clientX - rect.left}px`;
  tooltip.style.top = `${event.clientY - rect.top}px`;
  tooltip.hidden = false;
}

function hideMonthlyChartTooltip() {
  if (els.monthlyChartTooltip) els.monthlyChartTooltip.hidden = true;
}

function drawLegend(ctx, items, x, y, textColor = "#0f1f3d") {
  ctx.font = "12px system-ui";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  items.forEach(([label, color], index) => {
    const itemX = x + index * 112;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(itemX, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.fillText(label, itemX + 11, y);
  });
}

function compactCurrency(value) {
  const absolute = Math.abs(Number(value) || 0);
  if (absolute >= 1000000) return `${state.settings.currency} ${(value / 1000000).toFixed(1)}M`;
  if (absolute >= 1000) return `${state.settings.currency} ${Math.round(value / 1000)}K`;
  return new Intl.NumberFormat(undefined, { style: "currency", currency: state.settings.currency || "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function niceStep(max) {
  const rough = Math.max(max / 5, 1);
  const power = Math.pow(10, Math.floor(Math.log10(rough)));
  const fraction = rough / power;
  if (fraction <= 1) return power;
  if (fraction <= 2) return power * 2;
  if (fraction <= 5) return power * 5;
  return power * 10;
}

function renderBreakdown() {
  const period = els.breakdownPeriod.value;
  const selectedItems = period === "yearly" ? yearItems(selectedReportYear()) : monthItems(els.reportMonth.value);
  const viewItems = selectedItems.filter((item) => item.type === breakdownView);
  const grouped = Object.entries(groupByCategory(viewItems)).sort((a, b) => b[1] - a[1]);
  const total = grouped.reduce((acc, [, value]) => acc + value, 0);
  const labels = reportLabels(breakdownView);
  const emptyText = period === "yearly" ? labels.emptyYearly : labels.emptyMonthly;
  breakdownChartItems = drawPieChart(els.breakdownChart, grouped, emptyText);
  hideBreakdownChartTooltip();

  if (!grouped.length) {
    els.breakdownList.innerHTML = `<p class="empty-state">No ${labels.plural} for this ${period === "yearly" ? "year" : "month"}.</p>`;
    els.breakdownInsight.textContent = `Add ${labels.plural} to see this breakdown.`;
    return;
  }

  const biggest = grouped[0];
  const smallest = grouped[grouped.length - 1];
  els.breakdownInsight.textContent = `Biggest ${labels.singular}: ${biggest[0]} at ${currency(biggest[1])}. Smallest: ${smallest[0]} at ${currency(smallest[1])}.`;

  els.breakdownList.innerHTML = grouped.map(([category, value]) => {
    const percent = percentOf(value, total);
    return `
      <div class="breakdown-item">
        <div class="breakdown-top"><strong>${escapeHTML(category)}</strong><span>${currency(value)} · ${percentLabel(value, total)}</span></div>
        <div class="bar"><span style="width:${percent}%"></span></div>
      </div>
    `;
  }).join("");
}

function renderYearReport() {
  const year = selectedReportYear();
  const allYearItems = yearItems(year);
  const yearIncome = sum(allYearItems, "income");
  const yearExpensesTotal = sum(allYearItems, "expense");
  const yearSavingsTotal = sum(allYearItems, "savings");
  const yearInvestmentsTotal = sum(allYearItems, "investment");
  renderYearDonut(yearIncome, yearExpensesTotal, yearSavingsTotal, yearInvestmentsTotal, year);
}

function renderYearDonut(income, expenses, savings, investments = 0, year = selectedReportYear()) {
  const available = income - expenses - savings - investments;
  const safeAvailable = Math.max(available, 0);
  const overBudget = Math.max(Math.abs(Math.min(available, 0)), 0);
  const styles = getComputedStyle(document.documentElement);
  const colors = {
    income: styles.getPropertyValue("--income").trim() || "#2563eb",
    expense: styles.getPropertyValue("--expense").trim() || "#dc4c4c",
    savings: styles.getPropertyValue("--savings").trim() || "#059669",
    remaining: styles.getPropertyValue("--remaining").trim() || "#475569",
    danger: styles.getPropertyValue("--danger-ink").trim() || "#b4232d"
  };
  const donutSegments = [
    ["Expenses", expenses, colors.expense],
    ["Savings", savings, colors.savings],
    ["Invested", investments, "#7c3aed"],
    ["Available", safeAvailable, colors.remaining]
  ].filter(([, value]) => value > 0);
  const donutTotal = donutSegments.reduce((acc, [, value]) => acc + value, 0);
  const legendRows = [
    ["Expenses", expenses, colors.expense],
    ["Savings", savings, colors.savings],
    ["Invested", investments, "#7c3aed"],
    ["Available", safeAvailable, colors.remaining]
  ];

  els.yearOverviewInsight.textContent = !donutTotal
    ? income ? `No expenses, savings, or investments in ${year} yet.` : `Add entries in ${year} to see the year.`
    : available < 0
    ? `Over budget by ${currency(overBudget)}.`
    : `Available after expenses, savings, and investments: ${currency(safeAvailable)}.`;

  if (!donutTotal) {
    yearDonutSlices = [];
    els.yearOverviewFlow.innerHTML = `<p class="empty-state">No yearly data yet.</p>`;
    return;
  }

  let cursor = 0;
  yearDonutSlices = donutSegments.map(([label, value, color]) => {
    const start = cursor;
    const end = cursor + (value / donutTotal) * 100;
    cursor = end;
    return {
      color,
      endDegrees: (end / 100) * 360,
      label,
      percent: percentLabel(value, donutTotal),
      startDegrees: (start / 100) * 360,
      value
    };
  });
  const gradientStops = yearDonutSlices.map((slice) => {
    return `${slice.color} ${(slice.startDegrees / 360) * 100}% ${(slice.endDegrees / 360) * 100}%`;
  }).join(", ");
  const fallbackTooltip = yearDonutSlices
    .map((slice) => `<span>${escapeHTML(slice.label)}: ${currency(slice.value)} (${slice.percent})</span>`)
    .join("");

  els.yearOverviewFlow.innerHTML = `
    <div class="donut-chart" style="--donut:${gradientStops}" tabindex="0" title="${escapeHTML(yearDonutSlices.map((slice) => `${slice.label}: ${currency(slice.value)} (${slice.percent})`).join(" | "))}" aria-label="Yearly breakdown. Hover over the chart to see slice values.">
      <span class="donut-center" data-default="${escapeHTML(year)}">${year}</span>
      <div class="donut-tooltip chart-tooltip" aria-hidden="true"><strong>Yearly breakdown</strong>${fallbackTooltip}</div>
    </div>
    <div class="donut-details">
      <div class="donut-legend">
        ${legendRows.map(([label, value, color]) => `
          <div class="donut-row" data-donut-label="${escapeHTML(label)}">
            <span class="dot" style="background:${color}"></span>
            <strong>${escapeHTML(label)}</strong>
            <span>${currency(value)}</span>
            <em>${value ? percentLabel(value, donutTotal) : "0%"}</em>
          </div>
        `).join("")}
      </div>
      <div class="year-status-list">
        <div class="year-status ${overBudget ? "is-over" : ""}">
          <strong>Over budget</strong>
          <span>${currency(overBudget)}</span>
        </div>
      </div>
    </div>
  `;
}

function handleYearDonutHover(event) {
  const chart = event.target.closest(".donut-chart");
  if (!chart || !els.yearOverviewFlow.contains(chart) || !yearDonutSlices.length) {
    hideYearDonutTooltip();
    return;
  }

  const tooltip = chart.querySelector(".donut-tooltip");
  const center = chart.querySelector(".donut-center");
  if (!tooltip) return;

  const rect = chart.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const dx = x - centerX;
  const dy = y - centerY;
  const distance = Math.hypot(dx, dy);
  const outerRadius = Math.min(rect.width, rect.height) / 2;

  if (distance > outerRadius) {
    hideYearDonutTooltip();
    return;
  }

  const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 360) % 360;
  const slice = yearDonutSlices.find((item) => angle >= item.startDegrees && angle < item.endDegrees) || yearDonutSlices[yearDonutSlices.length - 1];
  tooltip.innerHTML = `<strong>${escapeHTML(slice.label)}</strong><span>${currency(slice.value)} (${slice.percent})</span>`;
  if (center) {
    center.innerHTML = `<strong>${currency(slice.value)}</strong><small>${escapeHTML(slice.label)} · ${slice.percent}</small>`;
  }
  tooltip.style.left = `${Math.min(Math.max(x, 56), rect.width - 56)}px`;
  tooltip.style.top = `${Math.min(Math.max(y, 34), rect.height - 22)}px`;
  tooltip.classList.add("is-visible");
  tooltip.setAttribute("aria-hidden", "false");
}

function hideYearDonutTooltip() {
  const tooltip = els.yearOverviewFlow.querySelector(".donut-tooltip");
  const center = els.yearOverviewFlow.querySelector(".donut-center");
  if (tooltip) {
    tooltip.classList.remove("is-visible");
    tooltip.setAttribute("aria-hidden", "true");
  }
  if (center) center.textContent = center.dataset.default || selectedReportYear();
}

function showYearDonutSlice(slice) {
  const chart = els.yearOverviewFlow.querySelector(".donut-chart");
  if (!chart || !slice) return;
  const tooltip = chart.querySelector(".donut-tooltip");
  const center = chart.querySelector(".donut-center");
  if (center) {
    center.innerHTML = `<strong>${currency(slice.value)}</strong><small>${escapeHTML(slice.label)} · ${slice.percent}</small>`;
  }
  if (tooltip) {
    tooltip.innerHTML = `<strong>${escapeHTML(slice.label)}</strong><span>${currency(slice.value)} (${slice.percent})</span>`;
    tooltip.classList.add("is-visible");
    tooltip.setAttribute("aria-hidden", "false");
  }
}

function monthlyTotals(items) {
  const totals = Array.from({ length: 12 }, () => 0);
  items.forEach((item) => {
    const monthIndex = Number(item.date.slice(5, 7)) - 1;
    totals[monthIndex] += convertedAmount(item);
  });
  return totals;
}

function monthlyComparisonRows(year) {
  return Array.from({ length: 12 }, (_, index) => {
    const month = `${year}-${String(index + 1).padStart(2, "0")}`;
    const items = monthItems(month);
    const income = sum(items, "income");
    const expenses = sum(items, "expense");
    const savings = sum(items, "savings");
    const investments = sum(items, "investment");
    const left = income - expenses - savings - investments;
    return { month, income, expenses, savings, investments, left };
  });
}

function renderMonthComparison() {
  const year = selectedReportYear();
  const rows = monthlyComparisonRows(year);

  const mostIncome = rows.reduce((best, row) => row.income > best.income ? row : best, rows[0]);
  const mostExpenses = rows.reduce((best, row) => row.expenses > best.expenses ? row : best, rows[0]);
  const mostSavings = rows.reduce((best, row) => row.savings > best.savings ? row : best, rows[0]);
  const mostInvested = rows.reduce((best, row) => row.investments > best.investments ? row : best, rows[0]);
  const hasData = rows.some((row) => row.income || row.expenses || row.savings || row.investments);

  els.monthComparisonHead.innerHTML = `
    <tr>
      <th>Month</th>
      <th class="amount-cell">Income</th>
      <th class="amount-cell">Expenses</th>
      <th class="amount-cell">Savings</th>
      <th class="amount-cell">Invested</th>
      <th class="amount-cell">Available</th>
      <th>Note</th>
    </tr>
  `;
  const insightParts = [`Showing all months in ${year}.`];
  if (mostIncome.income) insightParts.push(`Highest income: ${monthName(mostIncome.month)}.`);
  if (mostExpenses.expenses) insightParts.push(`Highest expenses: ${monthName(mostExpenses.month)}.`);
  if (mostSavings.savings) insightParts.push(`Most saved: ${monthName(mostSavings.month)}.`);
  if (mostInvested.investments) insightParts.push(`Most invested: ${monthName(mostInvested.month)}.`);
  els.monthComparisonInsight.textContent = hasData ? insightParts.join(" ") : `Add entries in ${year} to compare months.`;

  els.monthComparisonTable.innerHTML = rows.map((row) => `
    <tr>
      <td>${monthName(row.month)}</td>
      <td class="amount-cell">${currency(row.income)}</td>
      <td class="amount-cell">${currency(row.expenses)}</td>
      <td class="amount-cell">${currency(row.savings)}</td>
      <td class="amount-cell">${currency(row.investments)}</td>
      <td class="amount-cell ${row.left < 0 ? "negative-amount" : ""}">${currency(row.left)}</td>
      <td>${escapeHTML(monthNote(row, mostIncome, mostExpenses, mostSavings, mostInvested))}</td>
    </tr>
  `).join("");
}

function monthName(monthValue) {
  return new Intl.DateTimeFormat(undefined, { month: "short" }).format(new Date(`${monthValue}-01T00:00:00`));
}

function monthNote(row, mostIncome, mostExpenses, mostSavings, mostInvested) {
  const notes = [];
  if (row.income && row.month === mostIncome.month) notes.push("highest income");
  if (row.expenses && row.month === mostExpenses.month) notes.push("highest expenses");
  if (row.savings && row.month === mostSavings.month) notes.push("most saved");
  if (row.investments && row.month === mostInvested.month) notes.push("most invested");
  if (row.left < 0) notes.push("over budget");
  return notes.join(", ");
}

function normalizeRadians(angle) {
  const circle = Math.PI * 2;
  return ((angle % circle) + circle) % circle;
}

function angleWithinSlice(angle, start, end) {
  return start <= end ? angle >= start && angle <= end : angle >= start || angle <= end;
}

function drawPieChart(canvas, data, emptyText = "No monthly expense data") {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const styles = getComputedStyle(document.documentElement);
  const ink = styles.getPropertyValue("--ink").trim() || "#0f1f3d";
  const panel = styles.getPropertyValue("--chart-bg").trim() || "#ffffff";
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = panel;
  ctx.fillRect(0, 0, width, height);
  const total = data.reduce((acc, [, value]) => acc + value, 0);
  if (!total) {
    drawEmptyCanvas(ctx, width, height, emptyText);
    return [];
  }

  let angle = -Math.PI / 2;
  const radius = Math.min(width, height) * 0.32;
  const cx = width * 0.35;
  const cy = height / 2;
  const chartItems = [];

  data.forEach(([category, value], index) => {
    const slice = (value / total) * Math.PI * 2;
    const startAngle = angle;
    const endAngle = angle + slice;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = categoryColors[index % categoryColors.length];
    ctx.fill();
    chartItems.push({
      category,
      color: categoryColors[index % categoryColors.length],
      endAngle: normalizeRadians(endAngle),
      fullCircle: slice >= Math.PI * 2 - 0.0001,
      percent: percentLabel(value, total),
      radius,
      startAngle: normalizeRadians(startAngle),
      type: "slice",
      value,
      x: cx,
      y: cy
    });
    angle = endAngle;
  });

  ctx.font = "14px system-ui";
  data.slice(0, 6).forEach(([category, value], index) => {
    const y = 58 + index * 32;
    ctx.fillStyle = categoryColors[index % categoryColors.length];
    ctx.fillRect(width * 0.64, y - 12, 16, 16);
    ctx.fillStyle = ink;
    ctx.fillText(`${category} (${percentLabel(value, total)})`, width * 0.64 + 26, y);
    chartItems.push({
      category,
      color: categoryColors[index % categoryColors.length],
      height: 24,
      percent: percentLabel(value, total),
      type: "legend",
      value,
      width: width * 0.34,
      x: width * 0.64,
      y: y - 16
    });
  });
  return chartItems;
}

function handleBreakdownChartHover(event) {
  const canvas = els.breakdownChart;
  const tooltip = els.breakdownChartTooltip;
  if (!canvas || !tooltip || !breakdownChartItems.length) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const sliceHit = breakdownChartItems.find((item) => {
    if (item.type !== "slice") return false;
    const dx = x - item.x;
    const dy = y - item.y;
    if (Math.hypot(dx, dy) > item.radius) return false;
    if (item.fullCircle) return true;
    return angleWithinSlice(normalizeRadians(Math.atan2(dy, dx)), item.startAngle, item.endAngle);
  });
  const legendHit = breakdownChartItems.find((item) => (
    item.type === "legend" &&
    x >= item.x &&
    x <= item.x + item.width &&
    y >= item.y &&
    y <= item.y + item.height
  ));
  const hit = sliceHit || legendHit;

  if (!hit) {
    hideBreakdownChartTooltip();
    return;
  }

  tooltip.innerHTML = `<strong>${escapeHTML(hit.category)}</strong><span>${currency(hit.value)} (${hit.percent})</span>`;
  tooltip.style.left = `${event.clientX - rect.left}px`;
  tooltip.style.top = `${event.clientY - rect.top}px`;
  tooltip.hidden = false;
}

function hideBreakdownChartTooltip() {
  if (els.breakdownChartTooltip) els.breakdownChartTooltip.hidden = true;
}

function drawBarChart(canvas, totals, emptyText = "No yearly expense data") {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const styles = getComputedStyle(document.documentElement);
  const muted = styles.getPropertyValue("--muted").trim() || "#647084";
  const income = styles.getPropertyValue("--income").trim() || "#2563eb";
  const panel = styles.getPropertyValue("--chart-bg").trim() || "#ffffff";
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = panel;
  ctx.fillRect(0, 0, width, height);
  const max = Math.max(...totals);
  if (!max) {
    drawEmptyCanvas(ctx, width, height, emptyText);
    return;
  }

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / 12 - 8;
  ctx.font = "12px system-ui";
  ctx.fillStyle = muted;

  totals.forEach((value, index) => {
    const barHeight = (value / max) * chartHeight;
    const x = padding + index * (chartWidth / 12) + 4;
    const y = height - padding - barHeight;
    ctx.fillStyle = income;
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = muted;
    ctx.fillText(String(index + 1).padStart(2, "0"), x + 2, height - 16);
  });
}

function drawEmptyCanvas(ctx, width, height, text) {
  const styles = getComputedStyle(document.documentElement);
  ctx.fillStyle = styles.getPropertyValue("--chart-bg").trim() || "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = styles.getPropertyValue("--muted").trim() || "#647084";
  ctx.font = "16px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height / 2);
  ctx.textAlign = "left";
}

function renderGoals() {
  const available = savingsAvailableForGoals();
  const goals = [...state.goals].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  els.goalsInsight.textContent = `${currency(Math.max(available, 0))} savings available after investments.`;

  if (!goals.length) {
    els.goalsList.innerHTML = `<p class="empty-state">No goals yet. Add a target amount to check if your savings can cover it.</p>`;
    return;
  }

  els.goalsList.innerHTML = goals.map((goal) => {
    const progress = goal.amount ? Math.min(100, Math.round((Math.max(available, 0) / goal.amount) * 100)) : 0;
    const enough = available >= goal.amount;
    const remaining = Math.max(goal.amount - available, 0);
    return `
      <article class="goal-item">
        <div class="goal-top">
          <div>
            <strong>${escapeHTML(goal.name)}</strong>
            <span>${enough ? "You have enough savings for this goal." : `${currency(remaining)} still needed.`}</span>
          </div>
          <button class="danger-button" type="button" data-goal-action="delete" data-id="${goal.id}">Remove</button>
        </div>
        <div class="goal-meta">
          <span>Goal: ${currency(goal.amount)}</span>
          <span>Available: ${currency(Math.max(available, 0))}</span>
        </div>
        <div class="bar"><span style="width:${progress}%"></span></div>
      </article>
    `;
  }).join("");
}

function renderInvestments() {
  const investments = state.transactions.filter((item) => item.type === "investment");
  const total = sum(investments, "investment");
  const grouped = Object.entries(groupByCategory(investments)).sort((a, b) => b[1] - a[1]);
  els.investmentsInsight.textContent = `Total invested: ${currency(total)}.`;

  if (!grouped.length) {
    els.investmentsList.innerHTML = `<p class="empty-state">No investments yet. Add an Investment entry to track what you invested in.</p>`;
    return;
  }

  els.investmentsList.innerHTML = grouped.map(([category, value]) => {
    const percent = percentOf(value, total);
    return `
      <div class="investment-item">
        <div class="breakdown-top"><strong>${escapeHTML(category)}</strong><span>${currency(value)} &middot; ${percentLabel(value, total)}</span></div>
        <div class="bar"><span style="width:${percent}%"></span></div>
      </div>
    `;
  }).join("");
}

function renderTransactions() {
  const query = els.search.value.trim().toLowerCase();
  const typeFilter = els.typeFilter.value;
  const fromDate = els.dateFromFilter.value;
  const toDate = els.dateToFilter.value;
  const amountMode = els.amountModeFilter.value;
  const amountValue = Number(els.amountValueFilter.value);
  const hasAmountFilter = amountMode !== "any" && Number.isFinite(amountValue) && els.amountValueFilter.value !== "";
  const sortMode = els.sortFilter.value;
  const rows = [...state.transactions]
    .filter((item) => typeFilter === "all" || item.type === typeFilter)
    .filter((item) => !fromDate || item.date >= fromDate)
    .filter((item) => !toDate || item.date <= toDate)
    .filter((item) => {
      if (!hasAmountFilter) return true;
      const amount = convertedAmount(item);
      if (amountMode === "exact") return Math.abs(amount - amountValue) < 0.005;
      if (amountMode === "above") return amount > amountValue;
      if (amountMode === "below") return amount < amountValue;
      return true;
    })
    .filter((item) => {
      if (!query) return true;
      return [item.description, item.merchant, item.category, item.account]
        .join(" ")
        .toLowerCase()
        .includes(query);
    })
    .sort((a, b) => sortTransactions(a, b, sortMode));

  els.transactionCount.textContent = `${rows.length} shown`;

  if (!rows.length) {
    els.transactionsTable.innerHTML = els.emptyRowTemplate.innerHTML;
    return;
  }

  els.transactionsTable.innerHTML = rows.map((item) => `
    <tr>
      <td>${displayDate(item.date)}</td>
      <td><span class="type-pill ${item.type}">${item.type}</span></td>
      <td>
        <strong>${escapeHTML(item.description)}</strong><br />
        <span class="muted">${escapeHTML(item.merchant || item.account || "")}</span>
      </td>
      <td>${escapeHTML(item.category || "Uncategorized")}</td>
      <td class="amount-cell">${transactionAmountLabel(item)}</td>
      <td>
        <div class="row-actions">
          <button class="secondary-button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="danger-button" data-action="delete" data-id="${item.id}">Remove</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function updateAmountFilterUI() {
  const filteringByAmount = els.amountModeFilter.value !== "any";
  els.amountValueFilter.disabled = !filteringByAmount;
  if (!filteringByAmount) els.amountValueFilter.value = "";
  els.amountValueFilter.placeholder = filteringByAmount ? "0.00" : "Not used";
}

function sortTransactions(a, b, sortMode) {
  if (sortMode === "oldest") return `${a.date}${a.createdAt}`.localeCompare(`${b.date}${b.createdAt}`);
  if (sortMode === "amount-desc") return convertedAmount(b) - convertedAmount(a) || `${b.date}${b.createdAt}`.localeCompare(`${a.date}${a.createdAt}`);
  if (sortMode === "amount-asc") return convertedAmount(a) - convertedAmount(b) || `${b.date}${b.createdAt}`.localeCompare(`${a.date}${a.createdAt}`);
  return `${b.date}${b.createdAt}`.localeCompare(`${a.date}${a.createdAt}`);
}

function transactionAmountLabel(item) {
  const itemCurrency = normalizeCurrency(item.currency || state.settings.currency);
  const original = new Intl.NumberFormat(undefined, { style: "currency", currency: itemCurrency }).format(Number(item.amount) || 0);
  if (itemCurrency === state.settings.currency) return escapeHTML(original);
  return `${escapeHTML(original)}<br /><span class="muted">${escapeHTML(currency(convertedAmount(item)))}</span>`;
}

function renderAll() {
  ensureReportMonth();
  renderCategoryOptions();
  const monthTransactions = monthItems(els.reportMonth.value);
  renderMetrics(monthTransactions);
  renderYearReport();
  renderBreakdown();
  renderMonthComparison();
  renderGoals();
  renderInvestments();
  renderTransactions();
  renderStorageStatus();
}

function renderStorageStatus() {
  if (!els.storageStatus) return;
  const entries = state.transactions.length;
  if (!entries && !(state.goals || []).length) {
    els.storageStatus.textContent = "No budget data saved yet.";
    return;
  }

  const browserSaved = displayDateTime(state.settings?.browserSavedAt);
  const fileSaved = displayDateTime(state.settings?.fileSavedAt);
  const browserText = browserSaved ? `Saved in this browser: ${browserSaved}.` : "Saved in this browser.";
  const fileText = fileSaved ? ` Last budget file: ${fileSaved}.` : " Save a budget file before using another device.";
  els.storageStatus.textContent = `${browserText}${fileText}`;
}

function setActiveNav(hash) {
  els.navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
}

function updateActiveNav() {
  const links = Array.from(els.navLinks);
  if (!links.length) return;

  if (window.scrollY < 160) {
    setActiveNav("#dashboard");
    return;
  }

  const triggerY = Math.min(window.innerHeight * 0.38, 360);
  const sections = links
    .map((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || link.getAttribute("href") === "#dashboard") return null;
      const rect = target.getBoundingClientRect();
      return {
        hash: link.getAttribute("href"),
        top: rect.top
      };
    })
    .filter(Boolean);

  const current = sections.reduce((active, item) => item.top <= triggerY ? item : active, sections[0]);
  if (current) setActiveNav(current.hash);
}

function closeSidebarMenu() {
  els.sidebar?.classList.remove("nav-open");
  if (window.matchMedia("(max-width: 1200px)").matches) {
    els.menuButton?.setAttribute("aria-expanded", "false");
    if (els.menuButton) {
      els.menuButton.textContent = "Menu";
      els.menuButton.setAttribute("aria-label", "Open menu");
    }
  }
}

function toggleSidebarMenu() {
  if (!els.appShell || !els.sidebar || !els.menuButton) return;
  if (window.matchMedia("(max-width: 1200px)").matches) {
    const isOpen = els.sidebar.classList.toggle("nav-open");
    els.menuButton.setAttribute("aria-expanded", String(isOpen));
    els.menuButton.textContent = isOpen ? "Hide menu" : "Menu";
    els.menuButton.setAttribute("aria-label", isOpen ? "Hide menu" : "Open menu");
    return;
  }

  const isCollapsed = els.appShell.classList.toggle("sidebar-collapsed");
  els.menuButton.setAttribute("aria-expanded", String(!isCollapsed));
  els.menuButton.textContent = isCollapsed ? "Show menu" : "Hide menu";
  els.menuButton.setAttribute("aria-label", isCollapsed ? "Show menu" : "Hide menu");
}

function syncSidebarForViewport() {
  if (!els.appShell || !els.sidebar || !els.menuButton) return;
  const narrow = window.matchMedia("(max-width: 1200px)").matches;
  if (narrow) {
    els.appShell.classList.remove("sidebar-collapsed");
    const isOpen = els.sidebar.classList.contains("nav-open");
    els.menuButton.setAttribute("aria-expanded", String(isOpen));
    els.menuButton.textContent = isOpen ? "Hide menu" : "Menu";
    els.menuButton.setAttribute("aria-label", isOpen ? "Hide menu" : "Open menu");
    return;
  }

  els.sidebar.classList.remove("nav-open");
  const isCollapsed = els.appShell.classList.contains("sidebar-collapsed");
  els.menuButton.setAttribute("aria-expanded", String(!isCollapsed));
  els.menuButton.textContent = isCollapsed ? "Show menu" : "Hide menu";
  els.menuButton.setAttribute("aria-label", isCollapsed ? "Show menu" : "Hide menu");
}

function resetForm() {
  els.form.reset();
  els.transactionId.value = "";
  els.date.value = todayISO();
  els.transactionCurrency.value = state.settings.currency;
  els.exchangeRate.value = "1";
  els.cancelEdit.hidden = true;
  document.querySelector("input[name='type'][value='expense']").checked = true;
  updateTypeLabels();
  updateExchangeRateUI();
}

function updateTypeLabels() {
  const type = activeType();
  els.merchantLabel.textContent = type === "income" ? "Source" : "Merchant";
  if (type === "income") {
    els.merchantLabel.textContent = "Who paid you";
    els.merchant.placeholder = "Employer, client, platform...";
    els.account.placeholder = "Bank transfer, cash, PayPal...";
    els.description.placeholder = "Salary, freelance, refund...";
    els.category.placeholder = "Salary, freelance...";
  } else if (type === "savings") {
    els.merchantLabel.textContent = "Savings goal";
    els.merchant.placeholder = "Emergency fund, vacation...";
    els.account.placeholder = "Savings account, brokerage, cash...";
    els.description.placeholder = "Emergency fund, vacation, retirement...";
    els.category.placeholder = "Emergency fund, vacation...";
  } else if (type === "investment") {
    els.merchantLabel.textContent = "Investment platform";
    els.merchant.placeholder = "Broker, bank, app...";
    els.account.placeholder = "Brokerage account, retirement account...";
    els.description.placeholder = "ETF, stocks, bonds, crypto...";
    els.category.placeholder = "ETF, stocks, retirement...";
  } else {
    els.merchantLabel.textContent = "Store or person";
    els.merchant.placeholder = "Lidl, supermarket, pharmacy...";
    els.account.placeholder = "Debit card, cash, credit card...";
    els.description.placeholder = "Groceries, rent, utilities...";
    els.category.placeholder = "Auto suggested";
  }
  renderCategoryOptions();
}

function renderCurrencyOptions() {
  const options = supportedCurrencies.map((currency) => `<option value="${currency}">${currency}</option>`).join("");
  els.currency.innerHTML = options;
  els.transactionCurrency.innerHTML = options;
}

function updateExchangeRateUI() {
  const itemCurrency = els.transactionCurrency.value || state.settings.currency;
  const defaultCurrency = state.settings.currency;
  const sameCurrency = itemCurrency === defaultCurrency;
  els.exchangeRate.value = sameCurrency ? "1" : (state.settings.rates?.[itemCurrency] || els.exchangeRate.value || "");
  els.exchangeRate.disabled = sameCurrency;
  els.exchangeRate.required = !sameCurrency;
  els.exchangeRateLabel.classList.toggle("required-label", !sameCurrency);
  els.exchangeRate.closest("label").hidden = sameCurrency;
  els.exchangeRateLabel.textContent = sameCurrency
    ? `Exchange rate (${defaultCurrency})`
    : `1 ${itemCurrency} equals how many ${defaultCurrency}`;
}

function upsertTransaction(event) {
  event.preventDefault();
  const type = activeType();
  const amount = Number(els.amount.value);
  if (!Number.isFinite(amount) || amount <= 0) return;
  const itemCurrency = normalizeCurrency(els.transactionCurrency.value || state.settings.currency);
  const exchangeRate = itemCurrency === state.settings.currency ? 1 : Number(els.exchangeRate.value);
  if (!Number.isFinite(exchangeRate) || exchangeRate <= 0) {
    window.alert(`Enter a conversion rate for ${itemCurrency} to ${state.settings.currency}.`);
    return;
  }

  state.settings.rates = state.settings.rates || {};
  state.settings.rates[itemCurrency] = exchangeRate;

  const existingId = els.transactionId.value;
  const transaction = {
    id: existingId || crypto.randomUUID(),
    type,
    amount,
    currency: itemCurrency,
    exchangeRate,
    date: els.date.value,
    description: els.description.value.trim(),
    merchant: els.merchant.value.trim(),
    category: els.category.value.trim() || (type === "income" ? "Other income" : type === "savings" ? "Other savings" : type === "investment" ? "Other investment" : "Other"),
    account: els.account.value.trim(),
    createdAt: existingId ? state.transactions.find((item) => item.id === existingId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (existingId) {
    state.transactions = state.transactions.map((item) => item.id === existingId ? transaction : item);
  } else {
    state.transactions.push(transaction);
  }

  saveState();
  resetForm();
  renderAll();
}

function editTransaction(id) {
  const item = state.transactions.find((transaction) => transaction.id === id);
  if (!item) return;

  document.querySelector(`input[name='type'][value='${item.type}']`).checked = true;
  els.transactionId.value = item.id;
  els.amount.value = item.amount;
  els.transactionCurrency.value = normalizeCurrency(item.currency || state.settings.currency);
  els.exchangeRate.value = item.exchangeRate || "1";
  els.date.value = item.date;
  els.description.value = item.description;
  els.merchant.value = item.merchant || "";
  els.category.value = item.category || "";
  els.account.value = item.account || "";
  els.cancelEdit.hidden = false;
  updateTypeLabels();
  updateExchangeRateUI();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteTransaction(id) {
  const item = state.transactions.find((transaction) => transaction.id === id);
  if (!item) return;
  const itemCurrency = normalizeCurrency(item.currency || state.settings.currency);
  const original = new Intl.NumberFormat(undefined, { style: "currency", currency: itemCurrency }).format(Number(item.amount) || 0);
  const confirmed = window.confirm(`Remove "${item.description}" for ${original}?`);
  if (!confirmed) return;
  state.transactions = state.transactions.filter((transaction) => transaction.id !== id);
  saveState();
  renderAll();
}

function addGoal(event) {
  event.preventDefault();
  const name = els.goalName.value.trim();
  const amount = Number(els.goalAmount.value);
  if (!name || !Number.isFinite(amount) || amount <= 0) return;

  state.goals = state.goals || [];
  state.goals.push({
    id: crypto.randomUUID(),
    name,
    amount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  saveState();
  els.goalForm.reset();
  renderAll();
}

function deleteGoal(id) {
  state.goals = (state.goals || []).filter((goal) => goal.id !== id);
  saveState();
  renderAll();
}

async function exportData() {
  state.settings = state.settings || {};
  state.settings.fileSavedAt = new Date().toISOString();
  saveState();
  const password = window.prompt("Optional: enter a password to encrypt this budget file. Leave it blank to save an unencrypted file, or press Cancel to stop.");
  if (password === null) return;
  const payload = JSON.stringify({ ...state, exportedAt: state.settings.fileSavedAt, app: "Solo Budget" }, null, 2);
  const output = password ? await encryptBackupPayload(payload, password) : payload;
  const blob = new Blob([output], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = password ? `solo-budget-file-${todayISO()}-encrypted.json` : `solo-budget-file-${todayISO()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  renderStorageStatus();
}

function csvValue(value) {
  let text = String(value ?? "");
  if (/^[\s]*[=+\-@]/.test(text)) {
    text = `'${text}`;
  }
  return /[",\n\r]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}

function exportCsv() {
  const headers = [
    "Date",
    "Type",
    "Description",
    "Merchant or source",
    "Category",
    "Payment/source",
    "Original amount",
    "Original currency",
    "Exchange rate",
    `Amount in ${state.settings.currency}`
  ];

  const rows = [...state.transactions]
    .sort((a, b) => `${a.date}${a.createdAt}`.localeCompare(`${b.date}${b.createdAt}`))
    .map((item) => [
      item.date,
      item.type,
      item.description,
      item.merchant || "",
      item.category || "",
      item.account || "",
      Number(item.amount) || 0,
      normalizeCurrency(item.currency || state.settings.currency),
      Number(item.exchangeRate) || 1,
      convertedAmount(item).toFixed(2)
    ]);

  const csv = [headers, ...rows].map((row) => row.map(csvValue).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `solo-budget-spreadsheet-${todayISO()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const fileData = JSON.parse(String(reader.result));
      const password = fileData?.encrypted ? window.prompt("This budget file is encrypted. Enter its password to load it.") : "";
      if (fileData?.encrypted && password === null) return;
      const parsed = await decryptBackupPayload(fileData, password || "");
      if (!Array.isArray(parsed.transactions)) throw new Error("Missing transactions array");
      state = {
        transactions: parsed.transactions.map((item) => normalizeTransaction(item, normalizeCurrency(parsed.settings?.currency || state.settings.currency || "USD"))),
        goals: Array.isArray(parsed.goals) ? parsed.goals.map((goal) => normalizeGoal(goal)).filter((goal) => goal.name && goal.amount > 0) : [],
        settings: {
          currency: normalizeCurrency(parsed.settings?.currency || state.settings.currency || "USD"),
          rates: normalizeRates(parsed.settings?.rates || state.settings.rates || {}, normalizeCurrency(parsed.settings?.currency || state.settings.currency || "USD")),
          theme: normalizeTheme(parsed.settings?.theme || state.settings.theme || "light"),
          fileSavedAt: parsed.settings?.fileSavedAt || parsed.exportedAt || "",
          browserSavedAt: ""
        }
      };
      saveState();
      applyTheme();
      renderAll();
      window.alert("Budget file loaded.");
    } catch (error) {
      window.alert(`Could not import this file: ${error.message}`);
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function bindEvents() {
  let navScrollFrame = 0;
  els.form.addEventListener("submit", upsertTransaction);
  els.goalForm.addEventListener("submit", addGoal);
  els.cancelEdit.addEventListener("click", resetForm);
  els.menuButton.addEventListener("click", toggleSidebarMenu);
  els.monthlyPictureChart.addEventListener("mousemove", handleMonthlyChartHover);
  els.monthlyPictureChart.addEventListener("mouseleave", hideMonthlyChartTooltip);
  els.breakdownChart.addEventListener("mousemove", handleBreakdownChartHover);
  els.breakdownChart.addEventListener("mouseleave", hideBreakdownChartTooltip);
  els.yearOverviewFlow.addEventListener("mousemove", handleYearDonutHover);
  els.yearOverviewFlow.addEventListener("mouseover", (event) => {
    const row = event.target.closest(".donut-row");
    if (!row) return;
    const slice = yearDonutSlices.find((item) => item.label === row.dataset.donutLabel);
    showYearDonutSlice(slice);
  });
  els.yearOverviewFlow.addEventListener("mouseleave", hideYearDonutTooltip);
  els.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveNav(link.getAttribute("href"));
      if (window.matchMedia("(max-width: 1200px)").matches) closeSidebarMenu();
    });
  });
  window.addEventListener("hashchange", updateActiveNav);
  window.addEventListener("scroll", () => {
    if (navScrollFrame) return;
    navScrollFrame = requestAnimationFrame(() => {
      updateActiveNav();
      navScrollFrame = 0;
    });
  }, { passive: true });
  window.addEventListener("resize", () => {
    syncSidebarForViewport();
    updateActiveNav();
  });
  document.querySelectorAll("input[name='type']").forEach((input) => input.addEventListener("change", updateTypeLabels));
  els.reportMonth.addEventListener("input", () => {
    ensureReportMonth();
    renderAll();
  });
  els.breakdownPeriod.addEventListener("input", renderAll);
  document.querySelectorAll("[data-breakdown-view]").forEach((button) => {
    button.addEventListener("click", () => {
      breakdownView = button.dataset.breakdownView;
      document.querySelectorAll("[data-breakdown-view]").forEach((item) => item.classList.toggle("active", item === button));
      renderAll();
    });
  });
  els.transactionCurrency.addEventListener("input", updateExchangeRateUI);
  els.exchangeRate.addEventListener("input", () => {
    const itemCurrency = els.transactionCurrency.value;
    const rate = Number(els.exchangeRate.value);
    if (itemCurrency && itemCurrency !== state.settings.currency && Number.isFinite(rate) && rate > 0) {
      state.settings.rates = state.settings.rates || {};
      state.settings.rates[itemCurrency] = rate;
      saveState();
    }
  });
  [els.description, els.merchant, els.account].forEach((input) => input.addEventListener("blur", suggestCategory));
  [
    els.search,
    els.typeFilter,
    els.dateFromFilter,
    els.dateToFilter,
    els.amountModeFilter,
    els.amountValueFilter,
    els.sortFilter
  ].forEach((input) => input.addEventListener("input", renderAll));
  els.currency.addEventListener("input", () => {
    state.settings.currency = normalizeCurrency(els.currency.value);
    state.settings.rates = normalizeRates(state.settings.rates || {}, state.settings.currency);
    saveState();
    els.transactionCurrency.value = state.settings.currency;
    updateExchangeRateUI();
    renderAll();
  });
  els.themeButtons.forEach((button) => button.addEventListener("click", () => {
    state.settings.theme = normalizeTheme(button.dataset.themeChoice);
    applyTheme();
    saveState();
    renderAll();
  }));
  els.amountModeFilter.addEventListener("input", updateAmountFilterUI);
  els.exportData.addEventListener("click", () => {
    exportData().catch((error) => {
      window.alert(`Could not save this budget file: ${error.message}`);
    });
  });
  els.importData.addEventListener("change", importData);
  els.exportCsv.addEventListener("click", exportCsv);
  els.transactionsTable.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "edit") editTransaction(button.dataset.id);
    if (button.dataset.action === "delete") deleteTransaction(button.dataset.id);
  });
  els.goalsList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-goal-action]");
    if (!button) return;
    if (button.dataset.goalAction === "delete") deleteGoal(button.dataset.id);
  });
}

function init() {
  const today = todayISO();
  els.todayLabel.textContent = `Today: ${displayDate(today)}`;
  els.date.value = today;
  els.reportMonth.value = currentMonthValue();
  renderCurrencyOptions();
  els.currency.value = state.settings.currency || "USD";
  applyTheme();
  els.transactionCurrency.value = state.settings.currency || "USD";
  bindEvents();
  updateTypeLabels();
  updateExchangeRateUI();
  updateAmountFilterUI();
  renderAll();
  syncSidebarForViewport();
  updateActiveNav();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
