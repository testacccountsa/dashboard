/**
 * Genesys Cloud iframe integration utilities
 * Handles communication between the embedded app and Genesys Cloud parent
 */

export interface GenesysMessage {
  type: string;
  data?: any;
}

export class GenesysIntegration {
  private static instance: GenesysIntegration;
  private isInIframe: boolean;
  private listeners: Map<string, Function[]> = new Map();

  private constructor() {
    this.isInIframe = window.self !== window.top;
    this.setupMessageListener();
  }

  static getInstance(): GenesysIntegration {
    if (!GenesysIntegration.instance) {
      GenesysIntegration.instance = new GenesysIntegration();
    }
    return GenesysIntegration.instance;
  }

  /**
   * Check if app is running inside an iframe
   */
  isEmbedded(): boolean {
    return this.isInIframe;
  }

  /**
   * Send message to Genesys Cloud parent
   */
  sendToParent(type: string, data?: any): void {
    if (!this.isInIframe || !window.parent) {
      console.warn('Not in iframe context, cannot send message to parent');
      return;
    }

    const message: GenesysMessage = { type, data };
    window.parent.postMessage(message, '*');
  }

  /**
   * Listen for messages from Genesys Cloud parent
   */
  on(messageType: string, callback: (data: any) => void): void {
    if (!this.listeners.has(messageType)) {
      this.listeners.set(messageType, []);
    }
    this.listeners.get(messageType)?.push(callback);
  }

  /**
   * Remove message listener
   */
  off(messageType: string, callback: Function): void {
    const callbacks = this.listeners.get(messageType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Setup listener for messages from parent window
   */
  private setupMessageListener(): void {
    window.addEventListener('message', (event: MessageEvent) => {
      // Validate message origin in production
      // if (event.origin !== 'https://apps.mypurecloud.com') return;

      const message = event.data as GenesysMessage;
      if (message && message.type) {
        const callbacks = this.listeners.get(message.type);
        if (callbacks) {
          callbacks.forEach(callback => callback(message.data));
        }
      }
    });
  }

  /**
   * Notify parent that app is ready
   */
  notifyReady(): void {
    this.sendToParent('APP_READY', {
      timestamp: new Date().toISOString(),
      app: 'Toyota Customer Management'
    });
  }

  /**
   * Send customer data to Genesys Cloud
   */
  sendCustomerData(customerId: string, customerData: any): void {
    this.sendToParent('CUSTOMER_DATA', {
      customerId,
      ...customerData
    });
  }

  /**
   * Update iframe height (for responsive embedding)
   */
  updateHeight(height: number): void {
    this.sendToParent('RESIZE', { height });
  }

  /**
   * Log interaction for Genesys analytics
   */
  logInteraction(action: string, details?: any): void {
    this.sendToParent('LOG_INTERACTION', {
      action,
      details,
      timestamp: new Date().toISOString()
    });
  }
}

export const genesys = GenesysIntegration.getInstance();
