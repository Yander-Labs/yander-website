# MCP Server Health Check

Check and manage MCP server connections without restarting Claude Code.

## Instructions

1. **Check current status** by running the `/mcp` slash command to see all configured servers and their connection state

2. **For disconnected servers**, report:
   - Server name
   - Expected transport type (HTTP vs stdio)
   - Likely cause (token expired, Docker not running, network issue)

3. **Suggest fixes** based on the server type:
   - HTTP servers: Check URL accessibility, verify auth headers
   - Stdio/Docker servers: Verify Docker is running (`docker ps`)
   - Token-based: Remind user to check token expiration

4. **List available tools** from connected servers so the user knows what's working

5. **If manual intervention needed**, provide the exact commands:
   ```bash
   # Re-add a server
   claude mcp add --transport http <name> <url>

   # Remove and re-add
   claude mcp remove <name>
   claude mcp add ...

   # Check Docker status
   docker ps
   ```

## Common Issues

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| GitHub tools missing | Docker not running | Start Docker Desktop |
| Auth errors | Token expired | Generate new PAT, update ~/.claude.json |
| Timeout errors | Slow network/server | Increase MCP_TIMEOUT env var |
| Server not found | Config not loaded | Run `/mcp` to reload |
