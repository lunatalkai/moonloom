# Moonloom

**[繁體中文](README.md) · [English](README.en.md) · [日本語](README.ja.md) · 한국어**

Moonloom은 LunaTalk의 창작 도구 모음입니다. 평소 쓰던 AI 어시스턴트에 설치하면,
그 어시스턴트가 LunaTalk의 실제 규칙에 따라 롤 카드를 함께 구상하고 다듬고
실제로 시험하고 심사에 제출하는 것까지 도와줍니다.

결정은 당신이 합니다. 초안과 점검, 번거로운 작업은 어시스턴트의 몫입니다.

## 시작하기 전에

- LunaTalk 계정. 카드는 본인 계정 아래에 만들어지며, 제출하기 전까지 비공개입니다.
- 아래 AI 클라이언트 중 하나.

## 설치

### Claude(데스크톱 앱 또는 웹)

1. 왼쪽 사이드바에서 **Customize**를 열고 **Plugins** 탭으로 이동합니다.
   Claude Cowork에서는 **Cowork** 탭을 먼저 엽니다.
2. **Personal plugins** 영역에서 **+** → **Add marketplace**.
3. **Add from a repository**를 고르고 다음 주소를 붙여 넣습니다:
   `https://github.com/lunatalkai/moonloom`
4. 목록에서 **Moonloom**을 찾아 **Install**을 누릅니다.

### Claude Code(명령줄)

```bash
claude plugin marketplace add lunatalkai/moonloom
claude plugin install moonloom
```

설치 후 Claude Code를 한 번 재시작하면 플러그인이 로드됩니다. 세션 안에서는
`/plugin`으로도 같은 작업을 할 수 있습니다.

나중에 업데이트할 때:

```bash
claude plugin update moonloom
```

### ChatGPT Work / Codex

아래 명령은 본인 컴퓨터의 터미널에서 직접 실행하세요. Windows에서는 PowerShell이나
명령 프롬프트를 사용할 수 있습니다. 로그인 명령을 ChatGPT에게 대신 실행해 달라고 하지
마세요. 어시스턴트의 샌드박스에서는 인터넷에 연결하거나 로그인 콜백을 받지 못할 수 있습니다.

`codex` 명령을 찾을 수 없다면 [Node.js LTS](https://nodejs.org/)를 설치하고 터미널을
다시 연 뒤 Codex CLI를 설치하세요. ChatGPT 데스크톱 앱만 설치하면 `codex` 명령이
없을 수 있습니다.

```bash
npm install -g @openai/codex
```

Windows PowerShell에서 `npm.ps1` 실행이 차단되거나 스크립트를 실행할 수 없다는 메시지가
나오면 명령 프롬프트를 열어 같은 명령을 실행하세요.

이어서 소스를 추가합니다:

```bash
codex plugin marketplace add lunatalkai/moonloom
```

그다음 ChatGPT 데스크톱 앱을 재시작하고 **Plugins Directory**를 연 뒤 이 소스를
선택해 **Moonloom**을 설치합니다.

Moonloom 설치가 끝나면 컴퓨터의 터미널로 돌아가 다음 명령을 직접 실행하세요:

```bash
codex mcp login lunatalk-card-writer
```

브라우저에서 LunaTalk 로그인 및 권한 승인 페이지가 열립니다. 승인을 마친 뒤
ChatGPT 또는 Codex로 돌아가면 됩니다.

나중에 업데이트할 때: `codex plugin marketplace upgrade`.

### Cursor

이 저장소에는 Cursor용 플러그인 정의도 함께 들어 있습니다. Git 저장소에서 플러그인을
추가하는 Cursor 쪽 안내를 따르세요.

## 처음 로그인

ChatGPT Work 또는 Codex에서는 위 안내에 따라 본인 컴퓨터의 터미널에서
`codex mcp login lunatalk-card-writer`를 직접 실행하고 LunaTalk 접근을 승인하세요.

다른 클라이언트에서는 LunaTalk 도구를 처음 호출할 때 브라우저가 열리고 로그인과
권한 승인을 요청합니다. 한 번 승인하면 이후에는 그대로 사용할 수 있습니다.

- 승인은 8시간 유효하며, 최대 30일까지 자동으로 갱신됩니다.
- 브라우저에 승인 완료가 표시되면, AI 클라이언트로 돌아갈 때까지 페이지를 닫지 말고
  잠시 기다려 주세요.

자세한 내용은 [`references/oauth-client-lifecycle.md`](references/oauth-client-lifecycle.md).

## 설치 확인

어시스턴트에게 이렇게 말해 보세요:

> Moonloom으로 내 LunaTalk 롤 카드를 보여 줘.

본인 카드가 나오면 준비가 끝난 것입니다.

## 다음에 할 말

Moonloom은 명령어 목록이 아닙니다. 평소 쓰는 말로 이야기하면 됩니다:

> 사람을 지키려고 거짓말하는 탐정 카드를 만들어 줘.

> 이 카드는 세 턴이면 지루해져. 이유를 찾아서 고쳐 줘.

> 이 카드를 실제로 플레이해 보고, 플레이어가 어디서 흥미를 잃는지 알려 줘.

> 이 카드는 심사에 제출할 수 있는 상태야?

어시스턴트가 알맞은 흐름을 고르고, 항목 초안을 쓰고, 기술 요건을 확인하고, 비용에
동의하면 실제 대화 테스트까지 돌린 다음, 아직 부족한 점을 알려 줍니다.

## 카드는 두 가지 방식으로 플레이됩니다

플레이어는 평소처럼 대화할 수도 있고, 대화를 **Agent 모드**로 바꿀 수도 있습니다.
Agent 모드에서는 캐릭터가 답장하기 전에 당신이 쓴 자료를 직접 찾아 나섭니다.

이는 '세계관 항목이 어떻게 발견되는가'를 바꿉니다. 평소에는 트리거 단어가 맞아서
항목이 떠오릅니다. Agent 모드에서는 캐릭터가 직접 목록을 훑고 검색하므로 **항목
이름**이 가장 먼저 눈에 들어오고, 그다음이 본문의 표현입니다. '장소 3' 같은 이름의
항목은 그곳에서는 사실상 보이지 않습니다.

Moonloom은 양쪽 모두를 염두에 두고 쓰며, 양쪽에서 시험하고, 그 카드가 실제로 어떤
모드에서 확인되었는지 명시합니다.
[`references/agent-mode-runtime.md`](references/agent-mode-runtime.md) 참고.

## 비용과 범위

- 구상, 검토, 기술 검증 자체에는 추가 비용이 없습니다(AI 클라이언트 사용량만 듭니다).
- 실제 대화 테스트는 LunaTalk의 일반 채팅 과금으로 포인트가 차감됩니다. 어시스턴트가
  쓰기 전에 먼저 확인합니다. Agent 모드 테스트는 실제 사용량 기준이라 더 비쌉니다.
- Moonloom은 본인 계정의 비공개 카드만 수정하며, 명확히 요청하기 전에는 카드를 심사에
  제출하지 않습니다.

## 문제가 있을 때

- **`codex` 명령을 찾을 수 없다면**: Node.js LTS를 설치하고 위의 Codex CLI 설치 명령을
  실행한 다음 터미널을 다시 여세요. PowerShell에서 `npm.ps1`이 차단되면 명령 프롬프트를
  사용하세요.
- **로그인 중 `OAuth metadata discovery failed ... error decoding response body`가 나온다면**:
  백신의 웹 보호 기능이 연결을 가로막을 수 있습니다. 해당 기능의 신뢰할 수 있는 사이트에
  `api.lunatalk.ai`를 추가하거나 웹 보호를 잠시 끈 다음, 컴퓨터의 터미널에서
  `codex mcp login lunatalk-card-writer`를 다시 실행하세요. 웹 보호를 껐다면 확인 후
  다시 켜세요.
- **LunaTalk 도구가 보이지 않습니다**: 설치하거나 업데이트한 뒤에는 클라이언트를
  재시작하세요. 플러그인은 시작할 때 로드됩니다.
- **브라우저는 승인이 끝났는데 어시스턴트가 계속 기다립니다**: 페이지를 닫지 말고
  화면에 표시된 돌아가기 동작을 사용하세요.
- **Agent 모드가 거부됩니다**: 무료 모델에서는 실행할 수 없습니다. 유료 모델을
  고르세요. 지원 여부는 모델 목록에 표시됩니다.
- **카드를 수정할 수 없습니다**: 공개 카드는 읽기 전용입니다. 먼저 본인의 비공개
  카드로 복제하세요.

---

## 이 도구 모음에 들어 있는 것

Moonloom은 여러 스킬과 공유 참고 문서로 이루어져 있고, 어시스턴트는 그때그때 필요한
것만 읽어 들입니다. 전체 목록은
[English README](README.en.md#what-is-included)를 참고하세요.

- **스킬(`skills/`)**: 구상, 캐릭터의 핵, 세계관, 오프닝, 목소리, 상호작용 루프,
  상태 설계, 표현, 토큰 배분부터 렌더 확인, 실제 플레이, 반복 개선, 제출 전 점검까지
  각각 전담 스킬이 있습니다. 무엇을 쓸지 모를 때는 `using-moonloom`이 입구입니다.
- **참고 문서(`references/`)**: 카드 집필 프레임워크, 세계관 항목과 상기 설계,
  Theme V3/XMLV3 표현, 두 실행 모드의 차이, 품질 스코어카드, 안전과 비용 경계 등
  공개된 지침입니다.
- **MCP 도구**: 카드를 실제로 만들고 수정하고 검증하고 미리 보고 시험하고 제출하는
  인터페이스이며, 엔드포인트는 `https://api.lunatalk.ai/mcp/card-writer`입니다.
  Moonloom은 별도의 권한 범위를 두지 않으며, 서버가 앱과 동일한 로그인 신원, 소유권,
  할당량, 심사, 공개, 과금 규칙을 적용합니다.
