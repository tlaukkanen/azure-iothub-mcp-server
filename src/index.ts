import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { IotHubService } from "./services/iotHubService";
import dotenv from 'dotenv';

dotenv.config();

// Initialize the IoT Hub service
const iotHubService = new IotHubService();

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
    try {
      // Get device information from IoT Hub
      const device = await iotHubService.getIotDevice(deviceId);
      
      if (!device || typeof device === 'string') {
        return {
          content: [
            {
              type: "text",
              text: typeof device === 'string' ? device : `Device with ID '${deviceId}' was not found.`
            }
          ],
        };
      }

      // Create a formatted response with device details
      const status = `- Status: ${device.status}\n- Connection: ${device.connectionState}`;
      
      const lastActivityTime = device.lastActivityTime && device.lastActivityTime !== "0001-01-01T00:00:00.0000000Z"
        ? `- Last activity: ${device.lastActivityTime}`
        : "- No activity recorded";
      
      const connectionStateUpdated = device.connectionStateUpdatedTime && device.connectionStateUpdatedTime !== "0001-01-01T00:00:00.0000000Z"
        ? `- Connection state updated: ${device.connectionStateUpdatedTime}`
        : "";
      
      const statusUpdated = device.statusUpdatedTime && device.statusUpdatedTime !== "0001-01-01T00:00:00.0000000Z"
        ? `- Status updated: ${device.statusUpdatedTime}`
        : "- No status update recorded";

      return {
        content: [
          {
            type: "text",
            text: `Device ${deviceId} details:\n${status}\n${lastActivityTime}${connectionStateUpdated ? '\n' + connectionStateUpdated : ''}${statusUpdated ? '\n' + statusUpdated : ''}`
          }
        ],
      };
    } catch (error) {
      console.error(`Error in get_iot_device tool: ${error}`);
      return {
        content: [
          {
            type: "text", 
            text: `Error retrieving device information: ${error instanceof Error ? error.message : String(error)}`
          }
        ],
      };
    }
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