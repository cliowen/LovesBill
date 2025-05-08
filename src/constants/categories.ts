export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'food', name: '餐饮', icon: '🍜' },
  { id: 'shopping', name: '购物', icon: '🛍️' },
  { id: 'entertainment', name: '娱乐', icon: '🎮' },
  { id: 'transport', name: '交通', icon: '🚗' },
  { id: 'housing', name: '住房', icon: '🏠' },
  { id: 'other', name: '其他', icon: '📦' },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return categories.find(cat => cat.name === name);
}; 