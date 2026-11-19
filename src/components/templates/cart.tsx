import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type CartState = { cart: string[]; setCart: Dispatch<SetStateAction<string[]>> };
const CartContext = createContext<CartState | null>(null);
export function TemplateCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
}
export function useTemplateCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Template cart provider is missing");
  return context;
}
