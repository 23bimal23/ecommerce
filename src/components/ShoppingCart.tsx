import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
// import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import useFetch from "../hooks/useFetch";


type ShoppingCartProps = {
  isOpen: Boolean;
};
function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { data, isPending, error } = useFetch(
    "https://fakestoreapi.com/products"
  );
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end" >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="me-auto fw-bold fs-5">
            Total&nbsp;&nbsp;
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = data?.find(i=> i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
