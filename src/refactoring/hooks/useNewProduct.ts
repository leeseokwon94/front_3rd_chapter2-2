import { useState } from 'react';
import { Product } from '../../types.ts';

const initialNewProduct: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};

export const useNewProduct = () => {
  // State
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(initialNewProduct);
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  // Action
  // Action 일 떄, 항상 return이 void일 필요는 없나? customHook 내부 state의 action이면서 외부 state 변경값을 return할 수도 있는거 아닌가
  const addNewProduct = (onProductAdd: (newProduct: Product) => void) => {
    const createdProduct = { ...newProduct, id: Date.now().toString() };

    onProductAdd(createdProduct);
    setNewProduct(initialNewProduct);
    setShowNewProductForm(false);
  };

  return { newProduct, setNewProduct, showNewProductForm, setShowNewProductForm, addNewProduct };
};
