import CartItemType from '@/types/type.cartItems'

export const initialCart = {}

// @ts-ignore
export const CartReducer = (cart: CartItemType, action) => {
   const id = action.payload?.id

   const item = cart[id]

   switch (action.type) {
      case 'initLocalStorage':
         return action.value

      case 'ADD_TO_CART':
         return {
            ...cart,
            [id]: action.payload,
         }

      case 'REMOVE_FROM_CART':
         return (() => {
            const { [item.id]: _, ...updatedCart } = cart
            return updatedCart
         })()

      case 'RESET':
         return {}

      default:
         return cart
   }
}
