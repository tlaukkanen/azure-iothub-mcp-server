/**
 * IoT Hub device information structure
 */
export interface IotHubDevice {
  deviceId: string;
  status: string;
  connectionState: string;
  lastActivityTime?: Date;
  cloudToDeviceMessageCount?: number;
  authenticationType?: string;
  capabilities?: {
    iotEdge: boolean;
  };
  deviceScope?: string;
  properties?: {
    desired?: Record<string, any>;
    reported?: Record<string, any>;
  };
}

/**
 * IoT Hub connection configuration
 */
export interface IotHubConfig {
  subscriptionId: string;
  resourceGroupName: string;
  iotHubName: string;
}