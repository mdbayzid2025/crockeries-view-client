// hooks/useOrderSummary.ts
import { useState, useEffect } from 'react';

interface OrderItem {
  price: number;
  quantity: number;
  discount: number;
}

interface OrderSummary {
  subTotal: number;
  totalDiscount: number;
  netTotal: number;
}

const useOrderSummary = (items: OrderItem[]) => {
  const [summary, setSummary] = useState<OrderSummary>({
    subTotal: 0,
    totalDiscount: 0,
    netTotal: 0,
  });

  useEffect(() => {
    const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = items.reduce((sum, item) => {
      const itemDiscount = (item.price * item.discount * item.quantity) / 100;
      return sum + itemDiscount;
    }, 0);
    
    setSummary({
      subTotal,
      totalDiscount,
      netTotal: subTotal - totalDiscount,
    });
  }, [items]);

  return summary;
};

export default useOrderSummary;