import { useState } from 'react';
import { Coupon } from '../../types.ts';

export const useNewCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });

  const handleAddCoupon = (onCouponAdd: (newCoupon: Coupon) => void) => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    });
  };

  return { newCoupon, setNewCoupon, handleAddCoupon };
};
