export interface Bill {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: BillCategory;
  paidBy: 'partner1' | 'partner2';
}

export type BillCategory = 
  | '餐饮'
  | '购物'
  | '交通'
  | '娱乐'
  | '住宿'
  | '其他';

export interface BillSummary {
  total: number;
  partner1Total: number;
  partner2Total: number;
  balance: number;
} 