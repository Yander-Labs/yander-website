# MCP Server Rules

## Automatic Recovery on Failure

When an MCP tool call fails with a connection or timeout error:

1. **Identify the server** - Note which MCP server the failed tool belongs to
2. **Run `/mcp`** - Check current connection status
3. **Report clearly** - Tell the user which server is disconnected and why
4. **Suggest fix** - Provide actionable next steps

Example response:
> The GitHub MCP server appears disconnected. This usually means Docker isn't running or the token expired. Run `/mcp` to check status, or start Docker Desktop if it's not running.

## Proactive Verification

Before starting tasks that heavily rely on MCP services, verify connectivity:

| Task Type | Verify These Servers |
|-----------|---------------------|
| GitHub operations (PRs, issues) | `github` |
| Error monitoring | `sentry` |
| CMS content management | `sanity` |
| Documentation lookup | `context7` |
| Image generation | `replicate`, `stability-ai` |

## Don't Fail Silently

If an MCP tool returns an unexpected error:
- Do NOT retry silently multiple times
- Do NOT proceed assuming the tool worked
- DO inform the user immediately with the error details
- DO suggest running `/mcp-check` skill for diagnosis

## Configuration Locations

Reference for troubleshooting:

| Scope | File Location |
|-------|---------------|
| User (global) | `~/.claude.json` under `mcpServers` |
| Project (shared) | `.mcp.json` in project root |
| Project (private) | `.claude/settings.json` under `mcpServers` |

## Useful Commands

```bash
# List all servers
claude mcp list

# Get specific server details
claude mcp get <server-name>

# Re-add a server without restart
claude mcp add --transport http <name> <url>

# Remove problematic server
claude mcp remove <name>

# Reset project auth choices
claude mcp reset-project-choices
```
