# practice_playwright

# How to configure Playwright MCP Server
1. Install Github Copilot chat extension in VS Code
2. Open Command Pallete (Cmd + Shift +P) and seach MCP: Add Server
3. Select npm package and press enter
4. Enter package name as @playwright/mcp
5. make sure mcp.json file created has below:
{
	"servers": {
		"playwright-mcp": {
			"type": "stdio",
			"sandboxEnabled": false,
			"command": "npx",
			"args": [
				"@playwright/mcp@0.0.79"
			],
			"cwd": "${workspaceFolder}"
		}
	},
	"inputs": []
}


6. Go to mcp.json file and click "Start" written above playwright-mcp
7. Verify that Playwright MCP server is now connected in Co-pilot by clicking on gear icon and going to MCP servers

** The MCP Server simply acts as a bridge allowing an AI agent like (Claude, Co-pilot, Cursor, kiro etc) to interact with a live browser , execute actions and generate playwright code.**

**Playwright custom fixtures let you encapsulate reusable setup, teardown, and Page Object Models (POMs) using test.extend(), keeping your test files clean and isolated.**