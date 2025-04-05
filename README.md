# Azure IoT Hub MCP Server

MCP Server for Azure IoT Hub mainly for read-only monitoring purposes. Uses Azure CLI for authentication and uses Azure CLI `azure-iot` extension for reading device details.

# Prerequisites

* Azure CLI installed
* Azure CLI authenticated to subscription where your IoT Hub is located
* Azure CLI `azure-iot` extension installed (`az extension add -n azure-iot`)

# Azure Identity Authentication

Be sure you are logged in to Azure CLI with az login then add the following to your `mcpServers`:

```
{
  "mcpServers": {

    "azureIoTHub": {
      "command": "npx",
      "args": ["-y", "@tlaukkanen/azure-iothub-mcp-server"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "Azure Subscription ID where you have your IoT Hub",
        "AZURE_IOTHUB_NAME": "Your Azure IoT Hub name"
      }
    }

  }
}
```