# TestWebAI Static POC

依客戶提供的 `TestWebAI.html`、Excel 測試資料與操作腳本整理的靜態概念驗證網站。

## 功能

- 響應式繁體中文展示頁
- 無後端、無外部 JavaScript 依賴的互動表單
- 姓名、Email、角色、性別、興趣驗證
- 學生角色的條件式學校欄位
- 3 份獨立 Playwright E2E：學生、工程師、設計師
- 3 份獨立 Selenium E2E：學生、工程師、設計師
- 可直接部署至 GitHub Pages 或任何靜態主機

## 本機執行

```bash
npm install
npm run serve
```

開啟 <http://127.0.0.1:4173>。

## E2E

```bash
npx playwright install chromium
npm run test:e2e
```

測試資料忠實對應客戶 Excel 的三筆案例。

## Selenium E2E

需安裝 Python 3.10+ 與 Chrome：

```bash
python -m pip install -r requirements-selenium.txt
python -m unittest discover -s . -p 'test_*.py' -v
```

Selenium Manager 會自動管理相容的 ChromeDriver；如需指定 Chrome 執行檔，可設定 `CHROME_BINARY`。
