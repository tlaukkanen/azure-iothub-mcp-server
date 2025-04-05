import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
    name: "Azure IoT Hub",
    version: "0.0.2"
  }
);

// Define the tools
server.tool(
  "get_iot_device", 
  "Get details and status of an IoT device",
  {
    deviceId: z.string().describe("The ID of the IoT device to check"),
  },
  async ({ deviceId }) => {
    // Simulate a call to the IoT Hub to check the device status
    return {
      content: [
        {
          type: "text",
          text: `Device ${deviceId} is online and operational.`
        }
      ],
    };
  }
);

async function main() {
  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server started");
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});