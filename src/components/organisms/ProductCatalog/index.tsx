import { Button } from '@/components/atoms';
import { Card, FormProduct, Modal } from '@/components/molecules';
import {
  IProduct,
  deleteDataFromLocalStorage,
  getDataFromLocalStorage,
  initializeLocalStorage,
  saveDataToLocalStorage,
} from '@/utils/localStorage';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

type ProductCatalogProps = {
  itemsPerPage: number;
};

const MAX_IMAGE_SIZE = 100 * 1024; // 100KB

export const ProductCatalog = (props: ProductCatalogProps) => {
  const { itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalConfirmDelete, setopenModalConfirmDelete] =
    useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const [searchText, setSearchText] = useState<string>('');

  const [product, setProduct] = useState<IProduct>({
    id: Date.now(),
    image: '',
    name: '',
    quantity: 0,
    sellingPrice: 0,
    buyingPrice: 0,
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    console.log(currentItems);
  }, [currentItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (acceptedFiles[0].size <= MAX_IMAGE_SIZE) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result as string,
        }));
      } else {
        toast.error('Ukuran gambar melebihi batas maksimal (100KB)');
      }
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingProducts = getDataFromLocalStorage('product') || [];
    const updatedProducts = [...existingProducts, product];
    const isNameExists = updatedProducts.some(
      (p) => p.id !== product.id && p.name === product.name
    );
    if (isNameExists) {
      toast.error('Nama barang sudah ada dalam daftar produk!');
      return;
    }
    saveDataToLocalStorage('product', updatedProducts);
    handleProductAdded(product);
    setOpenModalCreate(false);
    resetForm();
    toast.success('Yeeey!, Berhasil Menambahkan Data');
  };

  const resetForm = () => {
    setProduct({
      id: Date.now(),
      image: '',
      name: '',
      quantity: 0,
      sellingPrice: 0,
      buyingPrice: 0,
    });
  };

  const getDataById = (id: number): any | null => {
    const data = localStorage.getItem('product');
    if (data) {
      const parsedData = JSON.parse(data);
      const foundData: IProduct = parsedData.find(
        (item: IProduct) => item.id === id
      );
      if (foundData) {
        setProduct({
          image: foundData.image,
          name: foundData.name,
          quantity: foundData.quantity,
          buyingPrice: foundData.buyingPrice,
          id: foundData.id,
          sellingPrice: foundData.sellingPrice,
        });
      }
    }
    return null;
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    deleteDataFromLocalStorage('product');
    saveDataToLocalStorage('product', updatedProducts);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingData = localStorage.getItem('product');

    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = parsedData.map((item: IProduct) => {
        if (item.id === product.id) {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            quantity: product.quantity,
            buyingPrice: product.buyingPrice,
            sellingPrice: product.sellingPrice,
          };
        }
        return item;
      });
      saveDataToLocalStorage('product', updatedData);
      setProducts(updatedData);
    }
    toast.success('Yeeey!, Berhasil Merubah Data');
    resetForm();
    setOpenModalEdit(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleProductAdded = (newProduct: IProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  useEffect(() => {
    initializeLocalStorage();
    const storedData = getDataFromLocalStorage('product');
    if (storedData) {
      setProducts(storedData);
    }
  }, []);

  const disabledBtn =
    product.image !== '' &&
    product.name !== '' &&
    product.quantity > 0 &&
    product.buyingPrice > 0 &&
    product.sellingPrice > 0;

  return (
    <div className="w-full px-4 pb-10">
      <div className="w-full flex flex-col pb-5 gap-4">
        <div>
          <Button
            onClick={() => setOpenModalCreate(true)}
            className="bg-green-600 text-white"
          >
            Create Product
          </Button>
        </div>
        <div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Product..."
            className="w-full border border-slate-700 p-3 rounded-md focus:outline-none bg-transparent"
          />
        </div>
      </div>
      {currentItems.length > 0 ? (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 w-full">
          {currentItems.map((product) => (
            <div key={product.id}>
              <Card
                key={product.id}
                name={product.name}
                img={product.image}
                buy={product.buyingPrice}
                sell={product.sellingPrice}
                qty={product.quantity}
                onDelete={() => {
                  // handleDelete(product.id);
                  getDataById(product.id);
                  setopenModalConfirmDelete(true);
                }}
                onEdit={() => {
                  getDataById(product.id);
                  setOpenModalEdit(true);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-[500px] flex justify-center items-center text-5xl font-bold text-center">
          Data Kosong
        </div>
      )}
      <div className="mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`${
              currentPage === index + 1
                ? 'bg-green-700 text-white'
                : 'text-black'
            } w-10 h-10 rounded-full font-bold`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Modal
        show={openModalCreate}
        onClose={() => {
          setOpenModalCreate(false);
          resetForm();
        }}
        size="sm"
        backdropStatic
      >
        <div className="w-full bg-white rounded-lg shadow-md border border-slate-900 p-4 flex flex-col gap-5">
          <FormProduct
            valueImg={product.image}
            valueName={product.name}
            valueQty={product.quantity}
            valueBuy={product.buyingPrice}
            valueSell={product.sellingPrice}
            onchange={handleChange}
            onSumbit={handleSubmit}
            onImgDrop={handleImageDrop}
            disableBtn={disabledBtn}
          />
          <div className="w-full flex justify-end">
            <Button
              onClick={() => {
                setOpenModalCreate(false);
                resetForm();
              }}
              className="bg-slate-900 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={openModalEdit}
        onClose={() => {
          setOpenModalEdit(false);
          resetForm();
        }}
        size="sm"
        backdropStatic
      >
        <div className="w-full bg-white rounded-lg shadow-md border border-slate-900 p-4 flex flex-col gap-5">
          <div>Edit Product</div>
          <FormProduct
            valueImg={product.image}
            valueName={product.name}
            valueQty={product.quantity}
            valueBuy={product.buyingPrice}
            valueSell={product.sellingPrice}
            onchange={handleChange}
            onSumbit={handleEdit}
            onImgDrop={handleImageDrop}
            disableBtn={disabledBtn}
          />
          <div className="w-full flex justify-end">
            <Button
              onClick={() => {
                setOpenModalEdit(false);
                resetForm();
              }}
              className="bg-slate-900 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={openModalConfirmDelete}
        onClose={() => {
          setopenModalConfirmDelete(false);
          resetForm();
        }}
        size="sm"
      >
        <div className="w-full bg-white p-4 flex flex-col gap-5 rounded-3xl shadow-md">
          <h3 className="text-2xl font-bold">Delete Product</h3>
          <p>
            Yakin Ingin Menghapus,{' '}
            <span className="font-bold">{product.name}</span>?
          </p>
          <div className="w-full flex justify-end gap-3">
            <Button
              className="bg-slate-500 text-white"
              onClick={() => {
                setopenModalConfirmDelete(false);
                resetForm();
              }}
            >
              Batal
            </Button>
            <Button
              className="bg-red-600 text-white"
              onClick={() => {
                handleDelete(product.id);
                setopenModalConfirmDelete(false);
                resetForm();
              }}
            >
              Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
