import { CartItem, Coupon } from '../../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;

  let itemTotal = 0;
  const discount = item.product.discounts.reduce((maxDiscount, d) => {
    return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
  }, 0);

  itemTotal = price * quantity * (1 - discount);

  return itemTotal;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;

    totalBeforeDiscount += price * quantity;
    totalAfterDiscount += calculateItemTotal(item);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id !== productId) return item;
      return { ...item, quantity: Math.max(0, Math.min(newQuantity, item.product.stock)) };
    })
    .filter((item) => item.quantity > 0);
};
