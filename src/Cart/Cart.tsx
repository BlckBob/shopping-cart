import CartItem from '../CartItem';
// Styles
import { Wrapper } from './Cart.styles';
// Types
import { CartItemType } from '../App';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  delFromCart: (id: number) => void;
};

export const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  delFromCart
}) => {
  // function to calculate total price of all items in cart
  const totalPrice = cartItems.reduce(
    (acc, item): number => acc + item.price * item.amount, 0);
  // below is from course, above is from my own code(github copilot)
  // const totalPrice = (items: CartItemType[]) =>
  //   items.reduce((acc: number, item) => acc + item.price * item.amount, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          delFromCart={delFromCart}
        />
      ))}
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
    </Wrapper>
  );
};
