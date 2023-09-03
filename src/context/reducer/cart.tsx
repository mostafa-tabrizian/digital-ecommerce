import { ICourse } from "@/models/course"

interface ICartItem {
   [key: string]: ICourse
}

export const initialCart = {}

// @ts-ignore
export const CartReducer = (cart: ICartItem, action) => {
   const _id = action.payload?._id

   const item = cart[_id]

   switch (action.type) {
      case 'initLocalStorage':
         return action.value

      case 'ADD_TO_CART':
         return {
            ...cart,
            [_id]: action.payload,
         }

      case 'REMOVE_FROM_CART':
         return (() => {
            const { [item._id]: _, ...updatedCart } = cart
            return updatedCart
         })()

      case 'RESET':
         return {}

      default:
         return cart
   }
}
