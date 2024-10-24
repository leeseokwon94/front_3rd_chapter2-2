import { useState } from 'react';
import { Discount, Product } from '../../types.ts';

export const useEditingProduct = () => {
  // State
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  // Action
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }

      return newSet;
    });
  };

  const updateEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const updateEditProductInput = (name: string, productId: string, value: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = updateEditingProductField(editingProduct, name, value);
      setEditingProduct(updatedProduct);
    }
  };

  const addEditProductDiscount = (
    products: Product[],
    productId: string,
    onProductUpdate: (updatedProduct: Product) => void,
  ) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const removeEditProductDiscount = (
    products: Product[],
    productId: string,
    index: number,
    onProductUpdate: (updatedProduct: Product) => void,
  ) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const completeEditProduct = (onProductUpdate: (updatedProduct: Product) => void) => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  // calculate
  const updateEditingProductField = (editingProduct: Product, name: string, value: string): Product => {
    return { ...editingProduct, [name]: value };
  };

  return {
    openProductIds,
    editingProduct,
    newDiscount,
    setNewDiscount,
    toggleProductAccordion,
    updateEditProduct,
    updateEditProductInput,
    addEditProductDiscount,
    removeEditProductDiscount,
    completeEditProduct,
    updateEditingProductField,
  };
};
