import Button from '@material-ui/core/Button';
// Styles
import { Wrapper } from './CartItem.styles';
// Types
import { CartItemType } from '../App';

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  delFromCart: (id: number) => void;
};

export const CartItem: React.FC<Props> = ({ item, addToCart, delFromCart }) => {
  return (
    <Wrapper>
      <div>

        <h3>{item.title}</h3>
        <div className='information'>
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className='buttons'>
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => delFromCart(item.id)}>
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => addToCart(item)}>
            +
          </Button>
        </div>
      </div>
      {/* <p>{item.description}</p> */}
      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
};
