# Safety and Cost Notes

Moonloom tools operate through the authenticated LunaTalk account.

## Ownership

Only operate on roles owned by the authenticated account. Public roles must be
cloned or recreated as private roles before editing.

## Destructive and public actions

Publishing is public-facing. Do not call `publish_submit` until the author clearly
confirms submission in the agent conversation.

## Simulation cost

`simulate_private_chat` runs the real LunaTalk chat pipeline and deducts points or
credits under normal rules. Before running it, make sure the author asked for a
simulation or understands that this check costs real account resources.

## Credentials

Do not ask the author to paste secrets. Use environment variables or the AI
client's configured auth integration for account tokens.
