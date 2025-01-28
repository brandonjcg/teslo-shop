'use client';

import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { NEXT_PUBLIC_PAYPAL_CLIENT_ID } from '@/config';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        intent: 'capture',
        currency: 'USD',
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
};
