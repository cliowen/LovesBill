export interface Bill {
  id: number;
  category: string;
  amount: number;
  description: string;
  date: string;
  paidBy: 'partner1' | 'partner2'; // 添加支付人属性
}

class BillService {
  private readonly STORAGE_KEY = 'doraemon_bills';

  // 获取所有账单
  getAllBills(): Bill[] {
    const bills = localStorage.getItem(this.STORAGE_KEY);
    return bills ? JSON.parse(bills) : [];
  }

  // 获取指定分类的账单
  getBillsByCategory(category: string): Bill[] {
    const bills = this.getAllBills();
    return bills.filter(bill => bill.category === category);
  }

  // 添加新账单
  addBill(bill: Omit<Bill, 'id'>): Bill {
    const bills = this.getAllBills();
    const newBill = {
      ...bill,
      id: Date.now(), // 使用时间戳作为临时ID
    };
    bills.push(newBill);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bills));
    return newBill;
  }

  // 删除账单
  deleteBill(id: number): void {
    const bills = this.getAllBills();
    const updatedBills = bills.filter(bill => bill.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBills));
  }

  // 更新账单
  updateBill(id: number, updatedBill: Partial<Bill>): Bill | null {
    const bills = this.getAllBills();
    const index = bills.findIndex(bill => bill.id === id);
    if (index === -1) return null;

    const updated = { ...bills[index], ...updatedBill };
    bills[index] = updated;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bills));
    return updated;
  }

  // 获取指定分类的总支出
  getCategoryTotal(category: string): number {
    const bills = this.getBillsByCategory(category);
    return bills.reduce((sum, bill) => sum + bill.amount, 0);
  }

  // 获取所有分类的总支出
  getTotalExpense(): number {
    const bills = this.getAllBills();
    return bills.reduce((sum, bill) => sum + bill.amount, 0);
  }

  // 获取指定时间范围内的账单
  getBillsByDateRange(startDate: string, endDate: string): Bill[] {
    const bills = this.getAllBills();
    return bills.filter(bill => {
      const billDate = new Date(bill.date);
      return billDate >= new Date(startDate) && billDate <= new Date(endDate);
    });
  }
}

export const billService = new BillService(); 