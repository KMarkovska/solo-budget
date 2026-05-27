# Solo Budget

Solo Budget is a private, single-person budgeting app that runs as static files. The app code can be shared through GitHub, GitHub Pages, or a ZIP download. Budget data stays on each user's own device unless they choose to export a budget file.

## Features

- Add, edit, remove, and search income, expense, and savings entries.
- Track multiple income sources and payment accounts.
- Set a default reporting currency.
- Record income or expenses in another currency and convert them into the default currency using a saved manual exchange rate.
- Auto-suggest expense or income categories from merchant/source/description keywords.
- Monthly reports with biggest and smallest expense insights and category breakdowns.
- Monthly expense, income, and savings views with category, source, or savings-goal breakdowns.
- Yearly expense, income, and savings views, month-by-month charts, and comparison between years.
- Month-by-month comparison for income, expenses, savings, and money left.
- Automatic saving in the current browser through `localStorage`.
- Save/load budget files for preserving the app data in OneDrive or SharePoint.
- Optional password-protected budget file exports using browser Web Crypto.
- Spreadsheet CSV export for opening transactions in Excel.
- PWA manifest and service worker for installable/offline use when hosted over HTTPS.

## Privacy model

Solo Budget has no server, login, analytics, or remote database. The GitHub repository should contain only the app code. Users' budget entries are stored in their own browser profile and in budget files they personally export.

This means:

- The app developer cannot see or edit another person's entries.
- One user's data is not shared with another user.
- Your own data on your laptop is separate from the app code you publish.
- If someone downloads the app, they get a clean copy with no budget entries.
- Exported `.json` budget files and `.csv` spreadsheet files contain private financial data and should not be committed to GitHub.

Important limitation: browser `localStorage` is private to the browser profile, but it is not encrypted. Someone with access to the same Windows account/browser profile may be able to read it. For safer backups, use a password when saving a budget file. If you forget that password, the encrypted budget file cannot be recovered.

## Recommended GitHub setup

Use GitHub for the app code and releases, not for personal budget data.

1. Create a GitHub repository for this app.
2. Commit only the app files: `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `icons/`, `README.md`, and `.gitignore`.
3. Do not commit budget files, CSV exports, screenshots, old ZIPs, or restore folders.
4. Publish with GitHub Pages if you want users to open the app from a URL.
5. Create GitHub Releases with ZIP files if you want users to download a copy.
6. When updating the app, change the code, bump the cache version in `index.html` and `sw.js`, test it, then publish a new release.

The included `.gitignore` is set up to avoid committing private budget exports and local test artifacts by accident.

## Currency conversion

Reports are shown in your default currency. If you enter a transaction in another currency, add the rate for `1 transaction currency = X default currency`. The app stores the last rate you used for that currency and reuses it next time.

This keeps the ZIP version private and usable offline. Live exchange rates would require an internet-connected service or API key.

## How to use from the ZIP

1. Extract the ZIP.
2. Open `index.html` in a browser.
3. Add income and expense entries.
4. Use `Save budget file` to download the full app data file.
5. Enter a password when saving if you want the exported budget file encrypted.
6. Keep that budget file in OneDrive or SharePoint if you want to move it between devices.
7. Use `Load budget file` to load the file back into the app. Encrypted files require the same password.
8. Use `Open in Excel` to download a CSV file that opens in Excel.

Some mobile browsers restrict local static apps. For phone access, the practical option is usually opening SharePoint or OneDrive files from the phone rather than treating this as a full mobile app.

## SharePoint or OneDrive suggestion

For personal use, the simplest reliable setup is:

1. Put the extracted app folder in OneDrive or a SharePoint document library.
2. Open `index.html` from the browser on each device.
3. Store `solo-budget-file-YYYY-MM-DD.json` files in the same OneDrive/SharePoint folder.
4. Store spreadsheet CSV exports when you want readable Excel-friendly history.
5. Load the latest budget file when you need to move the app data.

Automatic cross-device sync needs a shared backend. A good next version would add Microsoft Graph sign-in and save the encrypted budget JSON to the user's OneDrive. That would make phone and laptop edits appear on both devices without manual export/import.

## Privacy note

The app saves automatically in the browser you are using. That browser storage does not automatically sync to another device. Use `Save budget file` before switching devices or browsers, and protect budget files and spreadsheet exports because they contain financial history.

Encrypted budget files protect the exported JSON backup. They do not encrypt the live browser `localStorage` copy while you are actively using the app.
