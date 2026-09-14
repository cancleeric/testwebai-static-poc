# TestWebAI Static POC

依客戶提供的 `TestWebAI.html`、Excel 測試資料與操作腳本整理的靜態概念驗證網站。

## 功能

- 響應式繁體中文展示頁
- 無後端、無外部 JavaScript 依賴的互動表單
- 姓名、Email、角色、性別、興趣驗證
- 學生角色的條件式學校欄位
- 3 份獨立 Playwright E2E：學生、工程師、設計師
- 3 份獨立 Selenium E2E：學生、工程師、設計師
- 完整 `TestWebAIScript1.xlsx`：3 個工作表分別對應學生、工程師、設計師，供客戶既有主程式逐案執行
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

## 客戶 Excel 指令檔

`TestWebAIScript1.xlsx` 已依 `TestWebAI輸入資料案例.xlsx` 補齊三筆案例：

- `script1-student`：apple／學生／台灣大學／女／看電影
- `script2-developer`：charles／工程師／男／寫程式
- `script3-designer`：david／設計師／男／打電動＋看電影

如需由來源檔重新產生：

```bash
python -m pip install -r requirements-xlsx.txt
python tools/generate_testwebai_scripts.py
```
