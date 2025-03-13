'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { setIdTransactionToOrder } from '@/actions/payments/set-id-transaction-from-paypal';
import { paypalCheckPayment } from '@/actions/payments/paypal-check-payment';

export const PaypalButton = ({
  idOrder,
  amount,
}: {
  idOrder: string;
  amount: number;
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const amountTwoDecimals = Math.round(amount * 100) / 100;
  if (isPending)
    return (
      <div className="animate-pulse mb-16">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded mt-2"></div>
      </div>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ) => {
    const idTransaction = await actions.order.create({
      purchase_units: [
        {
          invoice_id: idOrder,
          amount: {
            value: `${amountTwoDecimals}`,
            currency_code: 'USD',
          },
        },
      ],
      intent: 'CAPTURE',
    });
    if (!idTransaction) throw new Error('Server could not create order');

    await setIdTransactionToOrder({ idOrder, idTransaction });

    return idTransaction;
  };
  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) throw new Error('Server could not capture order');

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
