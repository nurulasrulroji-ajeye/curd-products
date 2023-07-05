import { dunkPanda } from '@/assets';
import { Button } from '@/components/atoms';
import Image from 'next/image';
import React from 'react';

type CardProps = {
  key: number;
  img: string;
  name: string;
  buy: number;
  sell: number;
  qty: number;
  onDelete: () => void;
  onEdit?: () => void;
};

export const Card = (props: CardProps) => {
  return (
    <div
      key={props.key}
      className="p-4 rounded-[24px] shadow-md flex flex-col gap-5 bg-slate-50"
    >
      <div className="w-full h-[200px] bg-blue-300 rounded-xl relative overflow-hidden">
        <Image src={props.img} alt="shooes" fill className="object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold max-w-[90%] truncate">
          {props.name}
        </h3>
        <h5 className="font-semibold pt-4 text-lg">Price</h5>
        <div className="w-full grid grid-cols-2">
          <div>
            <p>Buy</p>
            <span className="text-sm font-semibold">{props.buy}</span>
          </div>
          <div>
            <p>Sell</p>
            <span className="text-sm font-semibold">{props.sell}</span>
          </div>
        </div>
        <div className="flex gap-5 pt-3 items-center">
          <p>Qty</p>
          <span className="text-sm font-semibold">{props.qty}</span>
        </div>
      </div>
      <div className="w-full flex justify-end gap-4">
        <Button className="bg-slate-500 text-white" onClick={props.onEdit}>
          Edit
        </Button>
        <Button className="bg-red-500 text-white" onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
