# MCP OAuth client lifecycle

Use the AI client's normal remote-MCP OAuth flow for:

```text
https://api.lunatalk.ai/mcp/card-writer
```

The LunaTalk browser page first authenticates the user, then shows a focused
consent page naming the client, Card Writer permission, and callback destination.
After approval it shows a LunaTalk authorization-complete transition before
returning to the client's registered callback. A loopback callback such as
`127.0.0.1` or `localhost` belongs to the local AI client; it is not a LunaTalk
error page.

## Token behavior

- Access tokens last 8 hours.
- Refresh sessions last up to 30 days.
- Public clients must replace the stored refresh token after every successful
  refresh. Refresh tokens rotate and the previous value must never be retried or
  used concurrently.
- A replayed refresh token revokes its authorization session. Start a new OAuth
  flow instead of repeatedly retrying.
- A 30-day access token is a server-selected compatibility fallback for an
  explicitly approved client that cannot use refresh tokens. Clients must not
  request, assume, or emulate this fallback.

Store credentials only in the AI client's normal credential store. Never print
tokens, cookies, authorization headers, OAuth codes, PKCE verifiers, or callback
URLs containing codes in prompts, logs, screenshots, reports, examples, or
Moonloom artifacts.

## Recovery

- If the browser says authorization is confirmed, leave the page open while it
  returns to the client. Use the visible return action if the automatic handoff
  does not occur.
- If the local callback is unavailable, restart the OAuth flow from the same AI
  client so it creates a fresh loopback listener and authorization transaction.
- If refresh returns `invalid_grant`, discard the access and refresh credentials
  for that authorization and sign in again.
- Do not exchange a code twice, retry an old refresh token, or copy credentials
  between clients.
