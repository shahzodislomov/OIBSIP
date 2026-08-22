import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // unique ID per item variant
  pizzaId?: string;
  name: string;
  size: 'small' | 'medium' | 'large';
  crust?: string;
  sauce?: string;
  cheese?: string;
  extraToppings?: string[];
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (newItem) => {
        const id = `${newItem.pizzaId || 'custom'}-${newItem.size}-${newItem.crust || 'default'}-${(newItem.extraToppings || []).sort().join('-')}`;
        
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === id);
          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += newItem.quantity || 1;
            return { items: updatedItems, isCartOpen: true };
          }
          return {
            items: [...state.items, { ...newItem, id, quantity: newItem.quantity || 1 }],
            isCartOpen: true,
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, delta) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[];

          return { items: updatedItems };
        });
      },

      clearCart: () => set({ items: [] }),

      setCartOpen: (open) => set({ isCartOpen: open }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'pizza-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
