"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

// Types
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState }

interface CartContextType {
  state: CartState
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  let newState: CartState

  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        newState = {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        newState = {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
      }
      break
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.id !== action.payload)
      newState = {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
      break
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)

      newState = {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
      break
    }

    case "CLEAR_CART":
      newState = { items: [], total: 0 }
      break

    case "LOAD_CART":
      return action.payload

    default:
      return state
  }

  // Persist to localStorage
  localStorage.setItem("cart", JSON.stringify(newState))
  return newState
}

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) })
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      localStorage.removeItem("cart")
    }
  }, [])

  // Convenience functions for cart operations
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider 
      value={{ 
        state, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
