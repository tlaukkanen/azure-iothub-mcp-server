import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

// Get IoT Hub configuration from environment variables
const iotHubName = process.env.AZURE_IOT_HUB_NAME || 'your-iot-hub-name';
const resourceGroup = process.env.AZURE_RESOURCE_GROUP_NAME || 'your-resource-group';

/**
 * IoT Hub service for interacting with Azure IoT Hub
 */
export class IotHubService {

    async getIotDevice(deviceId: string): Promise<any> {
        try {
          const cmd = "az iot hub device-identity show "
          + `--device-id ${deviceId} `
          + `--hub-name ${iotHubName} `
          + `--resource-group ${resourceGroup} `
          + `--query "{ deviceId: deviceId, connectionState: connectionState, connectionStateUpdatedTime: connectionStateUpdatedTime, lastActivityTime: lastActivityTime, status: status, statusUpdatedTime: statusUpdatedTime }" `
          + `--output json`;
          
          const { stdout } = await execAsync(cmd);
          const device = JSON.parse(stdout);
      
          console.error('✅ Device details retrieved successfully');
          return device;
        } catch (err: any) {
          console.error(`❌ Failed to fetch device info from ${iotHubName}: ${err.stderr || err.message}`);
          // Check if error message has DeviceNotFound
          if (err.message.includes('DeviceNotFound')) {
            return `Device with ID '${deviceId}' not found in IoT Hub '${iotHubName}'.`;
          }
          if (err.message.includes('Unable to find IoT Hub')) {
            return `IoT Hub '${iotHubName}' not found. Please check your configuration.`;
        }
          return `Failed to fetch device info. Device doesn't exist or Azure CLI is not authenticated.`;
        }
      }
    
}