# Moonloom

**繁體中文 · [English](README.en.md) · [日本語](README.ja.md) · [한국어](README.ko.md)**

Moonloom 是 LunaTalk 的創作工具包，裝進你本來就在用的 AI 助手裡。裝好之後，那個
助手就會照 LunaTalk 實際的規則，跟你一起構思、修改、實測、送審角色卡。

決定由你下，草稿、檢查和瑣事交給它。

## 開始之前

- 一個 LunaTalk 帳號。卡片建在你自己的帳號底下，在你送審之前都是私有的。
- 下面其中一種 AI 客戶端。

## 安裝

### Claude（桌面 App 或網頁）

1. 左側點 **Customize**，切到 **Plugins** 分頁。
   用 Claude Cowork 的話，先進 **Cowork** 分頁再開 Customize。
2. 在 **Personal plugins** 區塊按 **+** → **Add marketplace**。
3. 選 **Add from a repository**，貼上：
   `https://github.com/lunatalkai/moonloom`
4. 在清單裡找到 **Moonloom**，按 **Install**。

### Claude Code（命令列）

```bash
claude plugin marketplace add lunatalkai/moonloom
claude plugin install moonloom
```

裝完重開一次 Claude Code，外掛才會載入。在對話中也可以用 `/plugin` 互動操作。

之後要更新：

```bash
claude plugin update moonloom
```

### ChatGPT Work / Codex

先在命令列加來源：

```bash
codex plugin marketplace add lunatalkai/moonloom
```

然後重啟 ChatGPT 桌面 App，打開 **Plugins Directory**，選這個來源，安裝
**Moonloom**。

之後要更新：`codex plugin marketplace upgrade`。

### Cursor

這個倉庫也附了 Cursor 的外掛描述檔，照 Cursor 自己「從 Git 倉庫加外掛」的說明操作
即可。

## 第一次登入

Moonloom 是透過線上連線跟 LunaTalk 溝通，所以助手第一次呼叫 LunaTalk 的工具時，
瀏覽器會跳出來要你登入並授權。同意一次之後就能繼續用。

- 授權有效 8 小時，最長 30 天內會自動續期，之後才會再問一次。
- 如果瀏覽器顯示授權完成，先別關頁面，等它跳回你的 AI 客戶端。

細節見 [`references/oauth-client-lifecycle.md`](references/oauth-client-lifecycle.md)。

## 確認裝好了

跟你的助手說：

> 用 Moonloom 列出我的 LunaTalk 角色卡。

它把你的卡列出來，就是裝好了。

## 接下來可以說什麼

Moonloom 不是一份指令清單，用你自己的話講就行：

> 我想做一個為了保護別人而說謊的偵探，幫我做一張卡。

> 這張卡聊三輪就沒東西了，幫我查為什麼，然後修掉。

> 幫我實際玩一輪這張卡，告訴我玩家會在哪裡失去興趣。

> 這張卡可以送審了嗎？

助手會自己挑對應的流程、擬欄位、檢查技術要求，在你同意花費之後跑真實對話測試，
最後告訴你還差什麼。

## 你的卡會被用兩種方式玩

玩家可以照一般方式跟你的卡聊天，也可以把對話切成 **Agent 模式**——那時候角色會
在回覆之前，自己去翻你寫的東西。

這會改變「一個世界書條目怎樣才找得到」。一般模式下，條目是因為觸發詞被命中才浮
上來；Agent 模式是角色自己瀏覽與搜尋，它**先看到條目名稱**，再搜內文的用詞。取名
叫「地點三」的條目，在那裡等於是隱形的。

Moonloom 寫卡時兩種都顧、測試時兩種都跑，也會告訴你這張卡實際上是在哪一種模式下
驗過的。見 [`references/agent-mode-runtime.md`](references/agent-mode-runtime.md)。

## 費用與界線

- 構思、審稿、技術驗證本身不額外收費，只花你 AI 客戶端自己的用量。
- 真實對話測試走 LunaTalk 正常的聊天計費，會扣點。助手會先問過你再花。Agent 模式
  的測試回合按實際用量計費，比較貴。
- Moonloom 只動你帳號底下的私有卡；沒有你明確說要送審，它不會把卡送出去。

## 遇到問題

- **助手看不到任何 LunaTalk 工具**：裝完或更新完要重開客戶端，外掛是啟動時載入的。
- **瀏覽器說授權完成了，助手還在等**：別關頁面，用頁面上的返回動作跳回去。
- **Agent 模式被拒絕**：免費模型不能跑，換一個付費模型；模型清單上有標示哪些可以。
- **某張卡改不動**：公開卡是唯讀的，先複製成自己的私有卡再改。

---

## 這個工具包裡有什麼

下面是給想深入了解的人看的。Moonloom 內部由一組技能與共用參考文件組成，助手會依
當下的任務載入需要的那幾份；完整清單見 [English README](README.en.md#what-is-included)。

- **技能（`skills/`）**：從構思、角色核心、世界觀、開場、聲線、互動迴圈、狀態經濟、
  版面呈現、token 配置，到彩排、實測、迭代與送審前檢查，各有專責技能。不確定該用哪
  一個時，`using-moonloom` 是入口路由。
- **參考文件（`references/`）**：技能共用的公開指南，例如寫卡框架、召回與世界書設
  計、Theme V3／XMLV3 呈現、兩種執行模式的差異、品質評分表、安全與成本邊界。
- **MCP 工具**：實際建立、修改、驗證、預覽、實測與送審角色卡的介面，端點是
  `https://api.lunatalk.ai/mcp/card-writer`。Moonloom 不另外開權限範圍，伺服器套用
  跟 App 一樣的登入身分、擁有權、配額、審核、發布與計費規則。

要在本機改 Moonloom 本身，用 `npm test` 與 `npm run validate`。
