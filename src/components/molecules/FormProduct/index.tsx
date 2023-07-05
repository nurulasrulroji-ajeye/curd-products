import { Button } from '@/components/atoms';
import {
  IProduct,
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  updateDataInLocalStorage,
} from '@/utils/localStorage';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';

type FromProductProps = {
  valueImg: string;
  valueName: string;
  valueQty: number;
  valueBuy: number;
  valueSell: number;
  onImgDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSumbit: (e: React.FormEvent) => void;
  disableBtn: boolean;
};

export const FormProduct = (props: FromProductProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onImgDrop,
  });

  return (
    <form onSubmit={props.onSumbit} className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className="p-2 border border-slate-700 rounded-md flex justify-center items-center"
      >
        <input {...getInputProps({ accept: 'image/*' })} />
        {props.valueImg ? (
          <Image
            src={props.valueImg}
            alt={props.valueName}
            width={100}
            height={100}
          />
        ) : (
          <p>Drag n drop an image here, or click to select an image</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name">Nama Produk</label>
        <input
          type="text"
          id="name"
          name="name"
          value={props.valueName}
          onChange={props.onchange}
          className="p-2 border border-slate-600 focus:outline-none rounded-md shadow-md"
          placeholder="Nama Produk"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="qty">Stok</label>
        <input
          type="number"
          id="qty"
          name="quantity"
          value={props.valueQty}
          min={0}
          onChange={props.onchange}
          className="p-2 border border-slate-600 focus:outline-none rounded-md shadow-md"
          placeholder="Quantity"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="sellingPrice">Harga Jual</label>
        <input
          type="number"
          id="sellingPrice"
          name="sellingPrice"
          min={0}
          value={props.valueSell}
          onChange={props.onchange}
          className="p-2 border border-slate-600 focus:outline-none rounded-md shadow-md"
          placeholder="Harga Jual"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="buyingPrice">Harga Beli</label>
        <input
          type="number"
          id="buyingPrice"
          name="buyingPrice"
          min={0}
          value={props.valueBuy}
          onChange={props.onchange}
          className="p-2 border border-slate-600 focus:outline-none rounded-md shadow-md"
          placeholder="Harga Beli"
        />
      </div>
      <Button
        type="submit"
        className={`${
          !props.disableBtn ? 'bg-blue-950' : 'bg-blue-700'
        } text-white`}
        disabled={!props.disableBtn}
      >
        Simpan
      </Button>
    </form>
  );
};
