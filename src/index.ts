import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
//import { z } from "zod";

// Create an MCP server
const server = new Server({
    name: "Azure IoT Hub",
    version: "0.0.2"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async (_request: any) => ({
  tools: [
    {
      name: 'get_iot_device',
      description: "Get IoT device status and details",
      inputSchema: {
        type: 'object',
        properties: {
          deviceId: {
            type: 'string',
            description: "The ID of the device"
          }
        },
      },
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const toolName = request.params.name;
  //const toolInput = request.params.arguments.deviceId;
  switch (toolName) {
    case 'get_iot_device':
      const deviceId = request.params.arguments.deviceId;
      return {
        content: [
          {
            type: "text",
            text: `Device ${deviceId} is online and operational.`
          }
        ],      
      };
    default:
      return {
        content: [
          {
            type: "text",
            text: `Tool ${toolName} not found.`
          }
        ]
      };
  }
});

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