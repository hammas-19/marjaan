import { defineStore } from 'pinia'

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
  category: string;
}

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),
  getters: {
    totalItems: state => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: state =>
      state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  },
  actions: {
    addToCart(product: any, size: string, color: string, quantity = 1) {
      const existingItem = this.items.find(
        item => item.id === product.id && item.size === size && item.color === color
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          size,
          color,
          quantity,
          image: product.image
        })
      }
    },
    updateQuantity(productId: number, size: string, color: string, quantity: number) {
      const item = this.items.find(
        item => item.id === productId && item.size === size && item.color === color
      )

      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (item && quantity <= 0) {
        this.removeFromCart(productId, size, color)
      }
    },
    removeFromCart(productId: number, size: string, color: string) {
      this.items = this.items.filter(
        item => !(item.id === productId && item.size === size && item.color === color)
      )
    },
    clearCart() {
      this.items = []
    }
  },
  persist: true
})
