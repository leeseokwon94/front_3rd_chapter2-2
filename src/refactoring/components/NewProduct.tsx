import { useNewProduct } from '../hooks/useNewProduct.ts';
import { Product } from '../../types.ts';
import { NewProductForm } from './NewProductForm.tsx';

interface Props {
  onProductAdd: (newProduct: Product) => void;
}

export const NewProduct = ({ onProductAdd }: Props) => {
  const { newProduct, setNewProduct, showNewProductForm, setShowNewProductForm, addNewProduct } = useNewProduct();

  return (
    <>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {showNewProductForm && (
        <NewProductForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          addNewProduct={addNewProduct}
          onProductAdd={onProductAdd}
        />
      )}
    </>
  );
};
