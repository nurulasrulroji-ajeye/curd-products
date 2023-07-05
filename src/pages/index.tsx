import { ProductCatalog } from '@/components/organisms';

export default function Home() {
  return (
    <div className="w-full bg-slate-200 h-full">
      <h1 className="text-center text-5xl font-bold">Catalog</h1>
      <div className="py-8 pl-4 text-2xl font-semibold">Product List</div>
      <ProductCatalog itemsPerPage={4} />
    </div>
  );
}
