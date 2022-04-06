import { useState } from 'react'
import { useQuery } from 'react-query';
// Components
import Item from './Item';
import Cart from './Cart';

import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// Styles
import { Wrapper, StyledButton } from './App.styles';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

// get function to fetch products form fake https://fakestoreapi.com/products
const getProducts = async (): Promise<CartItemType[]> => {
  const resp = await fetch('https://fakestoreapi.com/products');
  const data = await resp.json();
  return data;
  // one-liner for whole fetch product function
  // await (await fetch('https://fakestoreapi.com/products')).json();
}

function App() {
  // set is cart open
  const [isCartOpen, setIsCartOpen] = useState(false);
  // set cart items
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  // useQuery hook to fetch products data
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  // function getTotalItems
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  // function Add Items To Cart
  const addToCart = (clickedItem: CartItemType) => {
    // check if item already in cart
    const isItemInCart = cartItems.find(item => item.id === clickedItem.id);
    // if item in cart
    if (isItemInCart) {
      // increase amount
      setCartItems(prevItems => {
        return prevItems.map(item => {
          if (item.id === clickedItem.id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
      });
    } else {
      // if item not in cart
      setCartItems(prevItems => [...prevItems, { ...clickedItem, amount: 1 }]);
    }
  }

  // function Remove Items From Cart and below code is from course
  const remFromCart = (id: number) => {
    const newCartItems = [...cartItems];
    const itemIndex = newCartItems.findIndex(
      (cartItem) => cartItem.id === id
    );
    if (itemIndex !== -1) {
      newCartItems[itemIndex].amount -= 1;
      if (newCartItems[itemIndex].amount === 0) {
        newCartItems.splice(itemIndex, 1);
      }
    }
    setCartItems(newCartItems);
  }
  // const remFromCart = (id: number) => {
  //   setCartItems((prevItem) =>
  //     prevItem.reduce((acc, item) => {
  //       if (item.id === id) {
  //         if (item.amount === 1) return acc;
  //         return [...acc, { ...item, amount: item.amount - 1 }];
  //       } else {
  //         return [...acc, item];
  //       }
  //     }, [] as CartItemType[])
  //   );
  // };
  // console.log(data);
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Error! Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer
        anchor='right'
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={addToCart}
          delFromCart={remFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
