import dotenv from 'dotenv';
import { IotHubConfig } from '../types/iotHub';

// Load environment variables from .env file
dotenv.config();

/**
 * Get IoT Hub configuration from environment variables
 * @returns IoT Hub configuration
 */
export function getIotHubConfig(): IotHubConfig {
  const config: IotHubConfig = {
    subscriptionId: process.env.AZURE_SUBSCRIPTION_ID || '',
    resourceGroupName: process.env.AZURE_RESOURCE_GROUP || '',
    iotHubName: process.env.AZURE_IOT_HUB_NAME || '',
  };
  
  // Validate configuration
  if (!config.subscriptionId) {
    throw new Error('AZURE_SUBSCRIPTION_ID environment variable is not set');
  }
  if (!config.resourceGroupName) {
    throw new Error('AZURE_RESOURCE_GROUP environment variable is not set');
  }
  if (!config.iotHubName) {
    throw new Error('AZURE_IOT_HUB_NAME environment variable is not set');
  }
  
  return config;
}