// src/types.ts

export interface HotelData {
  imageUrl: string;
  name: string;
  vicinity: string;
  rating: number;
}

export const ItemType = {
  DUMMY_ITEM: 'DUMMY_ITEM',
};

export interface DragItem {
  id: number;
  content?: string;
  fromBucket: boolean;
  index?: number;
  columnId?: number;
}