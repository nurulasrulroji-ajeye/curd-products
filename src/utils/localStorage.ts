
export interface IProduct {
    id: number;
    image: string;
    name: string;
    quantity: number;
    sellingPrice: number;
    buyingPrice: number;
}

const initialData: IProduct[] = [
    { id: 1, image: '/images/dunk-panda.jpg', buyingPrice: 2500000, sellingPrice: 200000, name: "Nike Dunk Panda", quantity: 4 },
    { id: 2, image: '/images/air-jordan-1.jpg', buyingPrice: 3500000, sellingPrice: 300000, name: "Air Jordan 1 High Stealth", quantity: 2 },
    { id: 3, image: '/images/dunk-low-sb.jpg', buyingPrice: 2800000, sellingPrice: 220000, name: "Dunk Low SB HUF New York City", quantity: 3 },
    { id: 4, image: '/images/jordan-low.jpg', buyingPrice: 2900000, sellingPrice: 250000, name: "Air Jordan 1 Low Aluminum", quantity: 1 },
    { id: 5, image: '/images/samba.jpg', buyingPrice: 2400000, sellingPrice: 180000, name: "Adidas Samba OG", quantity: 4 },
    { id: 6, image: '/images/nb-530.jpg', buyingPrice: 2450000, sellingPrice: 190000, name: "New Balance 530 Beige Angora", quantity: 8 },
]

export const initializeLocalStorage = (): void => {
    const storedData = localStorage.getItem('product');

    if (!storedData) {
        localStorage.setItem('product', JSON.stringify(initialData));
    }
}

export const saveDataToLocalStorage = (key: string, data: IProduct[]): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export const getDataFromLocalStorage = (key: string): IProduct[] | null => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    return null;
};

export const updateDataInLocalStorage = (key: string, updatedData: Partial<IProduct>): void => {
    if (typeof window !== 'undefined') {
        const storedData = getDataFromLocalStorage(key);
        if (storedData) {
            const updatedProduct = { ...storedData, ...updatedData };
            const updatedProducts = storedData.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            localStorage.setItem(key, JSON.stringify(updatedProducts));
        }
    }
};

export const deleteDataFromLocalStorage = (key: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};