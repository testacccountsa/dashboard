import { useEffect, useState } from 'react';
import { genesys } from '@/utils/genesysIntegration';

/**
 * Hook to detect if app is running in Genesys Cloud iframe
 */
export const useGenesys = () => {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const embedded = genesys.isEmbedded();
    setIsEmbedded(embedded);

    // Notify Genesys Cloud that app is ready
    if (embedded) {
      genesys.notifyReady();
      setIsReady(true);
    }

    // Listen for messages from Genesys Cloud
    const handleCustomerContext = (data: any) => {
      console.log('Received customer context from Genesys:', data);
    };

    genesys.on('CUSTOMER_CONTEXT', handleCustomerContext);

    return () => {
      genesys.off('CUSTOMER_CONTEXT', handleCustomerContext);
    };
  }, []);

  return {
    isEmbedded,
    isReady,
    sendToGenesys: genesys.sendToParent.bind(genesys),
    sendCustomerData: genesys.sendCustomerData.bind(genesys),
    logInteraction: genesys.logInteraction.bind(genesys)
  };
};
